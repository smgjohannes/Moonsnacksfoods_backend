const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Testimonial by id
 * @name app. testimonials.getById
 * @param {string} id - The id of the Testimonial.
 * @returns {Promise} Promise.
 * @example
 * await app.testimonials.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const testimonial = await db.Testimonial.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (testimonial === null) {
    throw new NotFoundError(` Testimonial not found`);
  }

  return testimonial;
}

module.exports = {
  getById,
};
