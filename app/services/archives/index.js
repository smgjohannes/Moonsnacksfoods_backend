const { create } = require('./archive.create');
const { get } = require('./archive.get');
const { getById } = require('./archive.getById');
const { getBySlug } = require('./archive.getBySlug');
const { update } = require('./archive.update');
const { destroy } = require('./archive.destroy');
const { publish } = require('./archive.publish');

class Archive {
  constructor(image) {
    this.image = image;
  }
}
Archive.prototype.get = get;
Archive.prototype.getById = getById;
Archive.prototype.create = create;
Archive.prototype.update = update;
Archive.prototype.getBySlug = getBySlug;
Archive.prototype.destroy = destroy;
Archive.prototype.publish = publish;

module.exports = Archive;
