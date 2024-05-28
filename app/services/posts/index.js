const { create } = require('./post.create');
const { get } = require('./post.get');
const { getById } = require('./post.getById');
const { getBySlug } = require('./post.getBySlug');
const { update } = require('./post.update');
const { destroy } = require('./post.destroy');

class Post {
  constructor(image) {
    this.image = image;
  }
}

Post.prototype.get = get;
Post.prototype.getById = getById;
Post.prototype.create = create;
Post.prototype.update = update;
Post.prototype.getBySlug = getBySlug;
Post.prototype.destroy = destroy;

module.exports = Post;
