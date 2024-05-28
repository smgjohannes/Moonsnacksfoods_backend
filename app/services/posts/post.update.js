const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Ensure the path is correct
const imageUploadService = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const post = await db.Post.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'path'],
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await post.update(data);

    if (req.files && req.files.length > 0) {
      // Delete existing images
      if (post.Images && post.Images.length > 0) {
        for (let img of post.Images) {
          await imageService.destroy(img.id);
        }
      }

      // Upload new images
      await imageUploadService.upload(req, 'Post', post.id, req.files);
    }

    return post;
  } catch (error) {
    handleDatabaseError(error);
    throw error;
  }
}

module.exports = {
  update,
};
