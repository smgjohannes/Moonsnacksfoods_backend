const asyncMiddleware = require('../middleware/asyncMiddleware');
const eventService = require('../../services/events/event.update');
module.exports = function eventController(app) {
  /**
   * @api {get} /api/v1/posts
   * @apiName get
   * @apiGroup post
   *
   */
  async function get(req, res) {
    const response = await app.events.get(req.query);
    res.json(response);
  }

  /**
   * @api {event} /api/v1/events
   * @apiName create
   * @apiGroup event
   */
  async function create(req, res) {
    const createdEvent = await app.events.create(req.body, req, req.files);
    res.status(201).json(createdEvent);
  }

  /**
   * @api {event} /api/v1/events/:id
   * @apiName update
   * @apiGroup event
   */
  async function update(req, res) {
    const updatedEvent = await eventService.update(
      req.params.id,
      req.body,
      req
    );
    res.json(updatedEvent);
  }

  /**
   * @api {get} /api/v1/events/:id
   * @apiName getById
   * @apiGroup event
   */
  async function getById(req, res) {
    const response = await app.events.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {get} /api/v1/events/:slug
   * @apiName getBySlug
   * @apiGroup event
   */
  async function getBySlug(req, res) {
    const response = await app.events.getBySlug(req.params.slug);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/events/:id
   * @apiName destroy
   * @apiGroup event
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedEvent = await app.events.destroy(id);
    res.status(200).json(deletedEvent);
  }

  /**
   * @api {post} /api/v1/events/:id/publish
   * @apiName publish
   * @apiGroup event
   */
  async function publish(req, res) {
    const { id } = req.params;

    const publishedEvent = await app.events.publish(id);
    res.json(publishedEvent);
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
