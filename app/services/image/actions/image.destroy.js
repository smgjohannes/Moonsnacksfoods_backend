const fs = require('fs');
const path = require('path');
const db = require('../../../models');
const { NotFoundError } = require('../../../utils/coreErrors');

async function destroy(id) {
  const image = await db.Image.findByPk(id);

  if (image === null) {
    throw new NotFoundError('Image not found');
  }

  let deleted = false;

  try {
    // Construct file path
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',

      'uploads',
      image.url
    );

    // Check if file exists before attempting deletion
    if (fs.existsSync(filePath)) {
      // Delete image file
      fs.unlinkSync(filePath);
      deleted = true;
    }

    // Delete model from database
    await image.destroy();
  } catch (e) {
    console.log(e);
  }

  return deleted;
}

module.exports = {
  destroy,
};
