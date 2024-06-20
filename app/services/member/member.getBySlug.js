const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Member by id
 * @name app.members.getBySlug
 * @param {string} slug - The id of the Member.
 * @returns {Promise} Promise.
 * @example
 * await app.members.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const member = await db.Member.findOne({
    where: { slug },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'image_url'],
    },
  });

  if (member === null) {
    throw new NotFoundError(`Member not found`);
  }

  return member;
}

module.exports = {
  getBySlug,
};
