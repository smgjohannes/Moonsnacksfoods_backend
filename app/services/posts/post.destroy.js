const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Adjust path as necessary

async function destroy(id, res) {
  try {
    const post = await db.Post.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    console.log(post.path);

    if (post.Images && post.Images.length > 0) {
      for (let img of post.Images) {
        await imageService.destroy(img.id);
      }
    }

    await post.destroy();
    return { message: 'Post and associated images deleted successfully.' };
  } catch (error) {
    handleDatabaseError(error, res);
    throw error;
  }
}

module.exports = {
  destroy,
};
