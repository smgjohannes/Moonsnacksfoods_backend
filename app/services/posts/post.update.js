const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');

async function update(id, data, req) {
  try {
    const post = await db.Post.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
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
          await this.image.destroy(img.id);
        }
      }

      // Upload new images
      await this.image.upload(req, 'Post', post.id, req.files);
    }

    return post;
  } catch (error) {
    throw new Error400(error);
  }
}

module.exports = {
  update,
};
