const asyncMiddleware = require('../middleware/asyncMiddleware');
const postService = require('../../services/posts/post.update');

module.exports = function postController(app) {
  /**
   * @api {get} /api/v1/posts
   * @apiName get
   * @apiGroup post
   *
   */
  async function get(req, res) {
    const response = await app.posts.get(req.query);
    res.json(response);
  }

  /**
   * @api {post} /api/v1/posts
   * @apiName create
   * @apiGroup post
   *
   */
  async function create(req, res) {
    const createdPost = await app.posts.create(req.body, req, req.files);
    res.json(createdPost).status(201);
  }

  /**
   * @api {post} /api/v1/posts/:id
   * @apiName update
   * @apiGroup post
   *
   */
  async function update(req, res) {
    const updatedPost = await postService.update(req.params.id, req.body, req);
    res.status(200).json(updatedPost);
  }

  /**
   * @api {get} /api/v1/posts/:id
   * @apiName getById
   * @apiGroup post
   *
   */
  async function getById(req, res) {
    const response = await app.posts.getById(req.params.id);
    res.json(response);
  }

  /** @api {get} /api/v1/posts/:slug
   * @apiName getById
   * @apiGroup post
   *
   */
  async function getBySlug(req, res) {
    const response = await app.posts.getBySlug(req.params.slug);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/posts/:id
   * @apiName destroy
   * @apiGroup Result
   *
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedPost = await app.posts.destroy(id, res);
    res.status(200).json({ post: deletedPost });
  }

  return Object.freeze({
    getAll: asyncMiddleware(get),
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    getBySlug: asyncMiddleware(getBySlug),
    destroy: asyncMiddleware(destroy),
  });
};
