const db = require('../../models');

async function create(payload, req, files) {
  let createdTestimonial = await db.Testimonial.create(payload);
  await this.image.upload(req, 'Testimonial', createdTestimonial.id, files);
  return createdTestimonial;
}

module.exports = { create };
