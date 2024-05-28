const db = require('../../models');

async function create(payload, req, files) {
  let createdPost = await db.Post.create(payload);
  await this.image.upload(req, 'Post', createdPost.id, files);
  return createdPost;
}

module.exports = { create };
