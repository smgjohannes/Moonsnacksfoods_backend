const { destroy } = require('./actions/image.destroy');
const { upload } = require('./actions/image.upload');
const { update } = require('./actions/image.update');

class Image {
  constructor() {}
}
Image.prototype.upload = upload;
Image.prototype.destroy = destroy;
Image.prototype.update = update;
module.exports = Image;
