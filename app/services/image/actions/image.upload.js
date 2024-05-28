const fs = require('fs');
const fse = require('fs-extra');
const db = require('../../../models');
const { BadParameters, NotFoundError } = require('../../../utils/coreErrors');
const { Error400 } = require('../../../utils/httpErrors');

/**
 * @description Upload images
 * @param {Array} id - image id.
 * @returns {Promise} Return the created images.
 * @example
 * const destroy = await central.image.upload({}, 'Post', '375223b3-71c6-4b61-a346-0a9d5baf12b4', [{}]);
 */
async function upload(req, entityModel, entityId, files) {
  // Ensure at least one image is provided
  if (files.length === 0) {
    throw new BadParameters('No files provided.');
  }

  const entity = await db[entityModel].findByPk(entityId, {
    attributes: ['id'],
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url', 'path'],
      },
    ],
  });

  if (entity === null) {
    throw new NotFoundError(`${entityModel} not found.`);
  }

  try {
    for (let file of files) {
      // Ensure entity and entityModel are defined
      if (!entity || !entity.id || !entityModel) {
        throw new Error('Entity or entityModel is not defined');
      }

      // Create the image with required attributes
      let image = await entity.createImage({
        imageable_id: entity.id,
        imageable_type: entityModel.toLowerCase(),
        type: file.mimetype,
        name: file.originalname,
      });

      // Construct the file path
      const filePath = `${req.protocol}://${req.get('host')}/../../../uploads/${
        file.filename
      }`;

      // Update image URL and path
      image.url = filePath;
      image.path = `/../../../uploads/${file.filename}`;

      // Save the image
      await image.save();
    }

    return entity;
  } catch (e) {
    console.log('Error:', e.message);
    if (e instanceof TypeError) {
      throw new Error400(
        'TypeError: There was an issue with the data types while uploading images.'
      );
    } else if (e instanceof Sequelize.ValidationError) {
      throw new Error400(
        'ValidationError: Image data did not pass validation.'
      );
    } else {
      throw new Error400('Error: We could not upload images.');
    }
  }
}

module.exports = { upload };
