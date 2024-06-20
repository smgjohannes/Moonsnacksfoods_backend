const db = require('../../models');
const handleDatabaseError = require('../../utils/errorHandlers');
const imageService = require('../image/actions/image.destroy'); // Adjust path as necessary

async function destroy(id, res) {
  try {
    const member = await db.Member.findOne({
      where: { id },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type'],
      },
    });

    if (!member) {
      throw new Error('Member not found');
    }

    console.log(member.path);

    if (member.Images && member.Images.length > 0) {
      for (let img of member.Images) {
        await this.image.destroy(img.id);
      }
    }

    await member.destroy();
    return { message: 'Member and associated images deleted successfully.' };
  } catch (error) {
    handleDatabaseError(error, res);
    throw error;
  }
}

module.exports = {
  destroy,
};
