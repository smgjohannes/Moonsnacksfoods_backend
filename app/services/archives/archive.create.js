const db = require('../../models');

async function create(payload, req, files) {
  let createdArchive = await db.Archive.create(payload);
  await this.image.upload(req, 'Archive', createdArchive.id, files);
  return createdArchive;
}

module.exports = { create };
