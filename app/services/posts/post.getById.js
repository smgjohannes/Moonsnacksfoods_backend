const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Post by id
 * @name app.posts.getById
 * @param {string} id - The id of the Post.
 * @returns {Promise} Promise.
 * @example
 * await app.posts.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const post = await db.Post.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (post === null) {
    throw new NotFoundError(`Post not found`);
  }

  return post;
}

module.exports = {
  getById,
};
