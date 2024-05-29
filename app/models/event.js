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
