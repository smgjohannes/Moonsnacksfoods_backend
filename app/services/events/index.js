const { create } = require('./event.create');
const { get } = require('./event.get');
const { getById } = require('./event.getById');
const { getBySlug } = require('./event.getBySlug');
const { update } = require('./event.update');
const { destroy } = require('./event.destroy');
const { publish } = require('./event.publish');

class Event {
  constructor(image) {
    this.image = image;
  }
}

Event.prototype.get = get;
Event.prototype.getById = getById;
Event.prototype.create = create;
Event.prototype.update = update;
Event.prototype.getBySlug = getBySlug;
Event.prototype.destroy = destroy;
Event.prototype.publish = publish;

module.exports = Event;
