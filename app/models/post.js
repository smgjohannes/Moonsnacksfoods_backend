const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { sanitize } = require('../utils/sanitize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'post',
        },
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overlay_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['draft', 'published'],
        defaultValue: 'draft',
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  );

  SequelizeSlugify.slugifyModel(sequelize.models.Post, {
    source: ['title'],
    suffixSource: ['year'],
  });

  Post.beforeCreate(async (post, options) => {
    const cleanContent = sanitize(post.body);
    post.body = cleanContent;
  });

  Post.afterUpdate(async (post, options) => {
    const cleanContent = sanitize(post.body);
    post.body = cleanContent;
  });

  Post.afterSave(async (post, options) => {
    const cleanContent = sanitize(post.details);
    post.details = cleanContent;
  });

  return Post;
};
