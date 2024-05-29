const db = require('../../models');
const { Error404, Error400 } = require('../../utils/httpErrors');

async function update(id, data, req) {
  try {
    const event = await db.Event.findByPk(id, {
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!event) {
      throw new Error404('Event not found');
    }

    await event.update(data);

    if (req.files && req.files.length > 0) {
      // Delete existing images
      if (event.Images && event.Images.length > 0) {
        for (let img of event.Images) {
          await this.image.destroy(img.id);
        }
      }

      // Upload new images
      await this.image.upload(req, ' Event', event.id, req.files);
    }

    return event;
  } catch (error) {
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
