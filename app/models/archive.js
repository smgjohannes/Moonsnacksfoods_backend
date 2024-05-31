'use strict';
const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { sanitize } = require('../utils/sanitize');

module.exports = (sequelize, DataTypes) => {
  class Archive extends Model {
    static associate(models) {
      Archive.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'archive',
        },
      });
    }
  }

  Archive.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: ['draft', 'published'],
        defaultValue: 'draft',
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'archives',
      modelName: 'Archive',
    }
  );
  SequelizeSlugify.slugifyModel(Archive, {
    source: ['title'],
    suffixSource: ['year'],
  });
  SequelizeSlugify.slugifyModel(Archive, {
    source: ['title'],
    suffixSource: ['year'],
  });

  Archive.beforeCreate(async (archive, options) => {
    const cleanContent = sanitize(archive.description);
    archive.description = cleanContent;
  });

  Archive.afterUpdate(async (archive, options) => {
    const cleanContent = sanitize(archive.description);
    archive.description = cleanContent;
  });

  Archive.afterSave(async (archive, options) => {
    const cleanContent = sanitize(archive.description);
    archive.description = cleanContent;
  });

  return Archive;
};
