const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a  Archive by id
 * @name app. archives.getById
 * @param {string} id - The id of the Archive.
 * @returns {Promise} Promise.
 * @example
 * await app.archives.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const archive = await db.Archive.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (archive === null) {
    throw new NotFoundError(` Archive not found`);
  }

  return archive;
}

module.exports = {
  getById,
};
