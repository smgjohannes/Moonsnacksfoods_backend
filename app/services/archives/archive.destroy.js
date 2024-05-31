const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');

async function destroy(id, res) {
  try {
    const archive = await db.Archive.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!archive) {
      throw new Error('archive not found');
    }

    console.log(archive.path);

    if (archive.Images && archive.Images.length > 0) {
      for (let img of archive.Images) {
        await this.image.destroy(img.id);
      }
    }

    await archive.destroy();
    return { message: 'Archive and associated images deleted successfully.' };
  } catch (error) {
    throw new Error400(error.message);
  }
}

module.exports = {
  destroy,
};
