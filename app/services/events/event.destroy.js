const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');

async function destroy(id, res) {
  try {
    const event = await db.Event.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    console.log(event.path);

    if (event.Images && event.Images.length > 0) {
      for (let img of event.Images) {
        await this.image.destroy(img.id);
      }
    }

    await event.destroy();
    return { message: 'event and associated images deleted successfully.' };
  } catch (error) {
    throw new Error400(error.message);
  }
}

module.exports = {
  destroy,
};
