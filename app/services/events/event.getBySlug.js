const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Event by id
 * @name app.events.getBySlug
 * @param {string} slug - The id of the Event.
 * @returns {Promise} Promise.
 * @example
 * await app.events.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const event = await db.Event.findOne({
    where: { slug },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'image_url'],
    },
  });

  if (event === null) {
    throw new NotFoundError(`Event not found`);
  }

  return event;
}

module.exports = {
  getBySlug,
};
