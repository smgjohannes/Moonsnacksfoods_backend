const db = require('../../models');

async function create(payload, req, files) {
  let createdMember = await db.Member.create(payload);
  await this.image.upload(req, 'Member', createdMember.id, files);
  return createdMember;
}

module.exports = { create };
