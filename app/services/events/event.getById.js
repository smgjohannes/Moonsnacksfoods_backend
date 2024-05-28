const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Event by id
 * @name app.events.getById
 * @param {string} id - The id of the Event.
 * @returns {Promise} Promise.
 * @example
 * await app.events.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const event = await db.Event.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (event === null) {
    throw new NotFoundError(`Event not found`);
  }

  return event;
}

module.exports = {
  getById,
};
