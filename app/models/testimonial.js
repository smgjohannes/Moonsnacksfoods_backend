'use strict';
const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { sanitize } = require('../utils/sanitize');

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      Testimonial.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'testimonial',
        },
      });
    }
  }

  Testimonial.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
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
      tableName: 'testimonials',
      modelName: 'Testimonial',
    }
  );
  SequelizeSlugify.slugifyModel(Testimonial, {
    source: ['title'],
    suffixSource: ['year'],
  });
  SequelizeSlugify.slugifyModel(Testimonial, {
    source: ['title'],
    suffixSource: ['year'],
  });

  Testimonial.beforeCreate(async (testimonial, options) => {
    const cleanContent = sanitize(testimonial.description);
    testimonial.description = cleanContent;
  });

  Testimonial.afterUpdate(async (testimonial, options) => {
    const cleanContent = sanitize(testimonial.description);
    testimonial.description = cleanContent;
  });

  Testimonial.afterSave(async (testimonial, options) => {
    const cleanContent = sanitize(testimonial.description);
    testimonial.description = cleanContent;
  });

  return Testimonial;
};
