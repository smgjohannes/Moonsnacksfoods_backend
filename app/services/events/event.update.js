const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Ensure the path is correct
const imageUploadService = require('../image/actions/image.upload');

async function update(id, data, req) {
  try {
    const event = await db.Event.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'path'],
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
          await imageService.destroy(img.id);
        }
      }

      // Upload new images
      await imageUploadService.upload(req, ' Event', event.id, req.files);
    }

    return event;
  } catch (error) {
    handleDatabaseError(error);
    throw error;
  }
}

module.exports = {
  update,
};
