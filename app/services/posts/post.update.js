const fs = require('fs');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const post = await db.Post.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type', 'directory', 'name'],
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
          // Construct the file path
          const filePath = `${__basedir}/uploads/${img.directory}/${img.name}`;

          // Delete the file from the file system
          if (fs.existsSync(filePath)) {
            fs.promises.unlink(filePath);
          }

          // Delete the image from the database
          await db.Image.destroy({ where: { id: img.id } });
        }
      }

      // Upload new images
      await upload(req, 'Post', post.id, req.files);
    }

    return post;
  } catch (error) {
    console.error(error);
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
