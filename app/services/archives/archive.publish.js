const db = require('../../models');

async function publish(id) {
  const archive = await db.Archive.findByPk(id);

  if (!archive) {
    throw new Error('Archive not found');
  }

  archive.published = !archive.published;
  archive.status = archive.status === 'published' ? 'draft ' : 'published';

  await archive.save();

  return archive;
}

module.exports = {
  publish,
};
