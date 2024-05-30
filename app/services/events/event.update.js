const fs = require('fs');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const event = await db.Event.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type', 'directory', 'name'],
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    await event.update(data);

    if (req.files && req.files.length > 0) {
      // Delete existing images
      if (event.Images && event.Images.length > 0) {
        for (let img of event.Images) {
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
      await upload(req, 'Event', event.id, req.files);
    }

    return event;
  } catch (error) {
    console.error(error);
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
