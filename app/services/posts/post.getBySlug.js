const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a Post by id
 * @name app.posts.getBySlug
 * @param {string} slug - The id of the Post.
 * @returns {Promise} Promise.
 * @example
 * await app.posts.getBySlug('about-us');
 *
 */
async function getBySlug(slug) {
  const post = await db.Post.findOne({
    where: { slug },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'image_url'],
    },
  });

  if (post === null) {
    throw new NotFoundError(`Post not found`);
  }

  return post;
}

module.exports = {
  getBySlug,
};
