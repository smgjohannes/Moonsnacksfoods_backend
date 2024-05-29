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
 * const destroy = await app.image.upload({}, 'Post', '375223b3-71c6-4b61-a346-0a9d5baf12b4', [{}]);
 */
async function upload(req, entityModel, entityId, files) {
  // Ensure at least one image is provided
  if (files.length === 0) {
    throw new BadParameters(`No files provided.`);
  }

  const entity = await db[entityModel].findByPk(entityId, {
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url', 'type', 'directory'],
      },
    ],
  });

  if (entity === null) {
    throw new NotFoundError(`${entityModel} not found.`);
  }

  try {
    for (let file of files) {
      // folder name
      const folder = entity.slug ? entity.slug : 'images';

      // create the directory
      const directory = fse.mkdirsSync(`${__basedir}/uploads/${folder}`);
      // save image
      const image = await entity.createImage({
        type: file.mimetype,
        name: file.originalname,
        directory: folder,
      });

      // read image content
      let content = fs.readFileSync(`${__basedir}/uploads/${file.filename}`);
      // convert image data to base64
      let base64 = content.toString('base64');

      // buffer the converted image data
      let data = Buffer.from(base64, 'base64');

      // in case the folder already exist
      if (directory) {
        fs.writeFileSync(`${directory}/${image.name}`, data);
      } else {
        // when the folder does not exist
        fs.writeFileSync(`${__basedir}/uploads/${folder}/${image.name}`, data);
      }

      // create image url
      const imageUrl = `${req.protocol}://${req.get(
        'host'
      )}/uploads/${folder}/${file.originalname}`;

      // update image url
      image.url = imageUrl;
      // save
      await image.save();

      // delete file from the system after saving
      fs.unlinkSync(`${__basedir}/uploads/${file.filename}`);
    }

    return entity.reload();
  } catch (e) {
    console.log(e);
    throw new Error400('Error we could not upload images.');
  }
}

module.exports = { upload };
