const db = require('../../../models');
const { NotFoundError } = require('../../../utils/coreErrors');
const fs = require('fs').promises;
const path = require('path');

async function update(id, req, files) {
  try {
    const image = await db.Image.findByPk(id);

    if (image === null) {
      throw new NotFoundError('Image not found.');
    }

    // Retrieve the new image file from files
    const newImageFile = files && files.image;

    // If there's a new image file to update
    if (newImageFile) {
      // Delete existing image file if any
      if (image.url) {
        const existingFilePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'uploads',
          image.url
        );
        await fs.unlinkSync(existingFilePath).catch((err) => {
          if (err.code !== 'ENOENT') throw err; // Ignore error if file does not exist
        });
      }

      // Save the new image file
      const newFilename = `${Date.now()}-${newImageFile.name}`;
      const newImagePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'uploads',

        newFilename
      );

      // Use fs.writeFile to save the file
      await fs.writeFile(newImagePath, newImageFile.data);

      // Update image URL in the database
      await image.update({
        url: `/../../../../uploads/${newFilename}`,
      });
    }

    return image;
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
}

module.exports = { update };
