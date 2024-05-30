const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return an Testimonial by id
 * @name app.testimonials.getBySlug
 * @param {string} slug - The id of the Testimonial.
 * @returns {Promise} Promise.
 * @example
 * await app.testimonials.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const testimonial = await db.Testimonial.findOne({
    where: { slug },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (testimonial === null) {
    throw new NotFoundError(`Testimonial not found`);
  }

  return testimonial;
}

module.exports = {
  getBySlug,
};
