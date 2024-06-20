const fs = require('fs');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const member = await db.Member.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type', 'directory', 'name'],
      },
    });

    if (!member) {
      throw new Error('Member not found');
    }

    await member.update(data);

    if (req.files && req.files.length > 0) {
      // Delete existing images
      if (member.Images && member.Images.length > 0) {
        for (let img of member.Images) {
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
      await upload(req, 'Member', member.id, req.files);
    }

    return member;
  } catch (error) {
    console.error(error);
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
