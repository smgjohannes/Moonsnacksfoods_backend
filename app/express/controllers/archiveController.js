const asyncMiddleware = require('../middleware/asyncMiddleware');
const archiveService = require('../../services/archives/archive.update');

module.exports = function archiveController(app) {
  /**
   * @api {event} /api/v1/events
   * @apiName create
   * @apiGroup event
   */
  async function get(req, res) {
    const response = await app.archives.get(req.query);
    res.json(response);
  }

  /**
   * @api {archive} /api/v1/archives
   * @apiName create
   * @apiGroup archive
   */
  async function create(req, res) {
    const createdArchive = await app.archives.create(req.body, req, req.files);
    res.status(201).json(createdArchive);
  }

  /**
   * @api {archive} /api/v1/archives/:id
   * @apiName update
   * @apiGroup archive
   */
  async function update(req, res) {
    const updatedArchive = await archiveService.update(
      req.params.id,
      req.body,
      req
    );
    res.json(updatedArchive);
  }

  /**
   * @api {get} /api/v1/archives/:id
   * @apiName getById
   * @apiGroup archive
   */
  async function getById(req, res) {
    const response = await app.archives.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {get} /api/v1/archives/:slug
   * @apiName getBySlug
   * @apiGroup archive
   */
  async function getBySlug(req, res) {
    const response = await app.archives.getBySlug(req.params.slug);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/archives/:id
   * @apiName destroy
   * @apiGroup archive
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedArchive = await app.archives.destroy(id);
    res.status(200).json(deletedArchive);
  }

  /**
   * @api {post} /api/v1/archives/:id/publish
   * @apiName publish
   * @apiGroup archive
   */
  async function publish(req, res) {
    const { id } = req.params;

    const publishedArchive = await app.archives.publish(id);
    res.json(publishedArchive);
  }

  return Object.freeze({
    getAll: asyncMiddleware(get),
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    getBySlug: asyncMiddleware(getBySlug),
    destroy: asyncMiddleware(destroy),
    publish: asyncMiddleware(publish),
  });
};
