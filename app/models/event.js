'use strict';
const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { sanitize } = require('../utils/sanitize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'event',
        },
      });
    }
  }

  Event.init(
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
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
      tableName: 'events',
      modelName: 'Event',
    }
  );
  SequelizeSlugify.slugifyModel(Event, {
    source: ['title'],
    suffixSource: ['year'],
  });
  SequelizeSlugify.slugifyModel(Event, {
    source: ['title'],
    suffixSource: ['year'],
  });

  Event.beforeCreate(async (event, options) => {
    const cleanContent = sanitize(event.description);
    event.description = cleanContent;
  });

  Event.afterUpdate(async (event, options) => {
    const cleanContent = sanitize(event.description);
    event.description = cleanContent;
  });

  Event.afterSave(async (event, options) => {
    const cleanContent = sanitize(event.description);
    event.description = cleanContent;
  });

  return Event;
};
