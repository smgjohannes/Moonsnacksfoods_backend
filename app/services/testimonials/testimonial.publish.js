const db = require('../../models');

async function publish(id) {
  const testimonial = await db.Testimonial.findByPk(id);

  if (!testimonial) {
    throw new Error('Testimonial not found');
  }

  testimonial.published = !testimonial.published;
  testimonial.status =
    testimonial.status === 'published' ? 'draft ' : 'published';

  await testimonial.save();

  return testimonial;
}

module.exports = {
  publish,
};
