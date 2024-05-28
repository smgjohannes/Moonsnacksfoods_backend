const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Adjust path as necessary

async function destroy(id, res) {
  try {
    const event = await db.Event.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'path'],
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    console.log(event.path);

    if (event.Images && event.Images.length > 0) {
      for (let img of event.Images) {
        await imageService.destroy(img.id);
      }
    }

    await event.destroy();
    return { message: 'event and associated images deleted successfully.' };
  } catch (error) {
    handleDatabaseError(error, res);
    throw error;
  }
}

module.exports = {
  destroy,
};
