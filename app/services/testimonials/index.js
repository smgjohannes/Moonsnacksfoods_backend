const { create } = require('./testimonial.create');
const { get } = require('./testimonial.get');
const { getById } = require('./testimonial.getById');
const { getBySlug } = require('./testimonial.getBySlug');
const { update } = require('./testimonial.update');
const { destroy } = require('./testimonial.destroy');
const { publish } = require('./testimonial.publish');

class Testimonial {
  constructor(image) {
    this.image = image;
  }
}
Testimonial.prototype.get = get;
Testimonial.prototype.getById = getById;
Testimonial.prototype.create = create;
Testimonial.prototype.update = update;
Testimonial.prototype.getBySlug = getBySlug;
Testimonial.prototype.destroy = destroy;
Testimonial.prototype.publish = publish;

module.exports = Testimonial;
