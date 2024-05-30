const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return an Archive by id
 * @name app.archives.getBySlug
 * @param {string} slug - The id of the Archive.
 * @returns {Promise} Promise.
 * @example
 * await app.archives.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const archive = await db.Archive.findOne({
    where: { slug },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (archive === null) {
    throw new NotFoundError(`Archive not found`);
  }

  return archive;
}

module.exports = {
  getBySlug,
};
