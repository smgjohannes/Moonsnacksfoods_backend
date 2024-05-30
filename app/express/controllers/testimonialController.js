const asyncMiddleware = require('../middleware/asyncMiddleware');
const testimonialService = require('../../services/testimonials/testimonial.update');
module.exports = function testimonialController(app) {
  /**
   * @api {get} /api/v1/posts
   * @apiName get
   * @apiGroup post
   *
   */
  async function get(req, res) {
    const response = await app.testimonials.get(req.query);
    res.json(response);
  }

  /**
   * @api {testimonial} /api/v1/testimonials
   * @apiName create
   * @apiGroup testimonial
   */
  async function create(req, res) {
    const createdTestimonial = await app.testimonials.create(
      req.body,
      req,
      req.files
    );
    res.status(201).json(createdTestimonial);
  }

  /**
   * @api {testimonial} /api/v1/testimonials/:id
   * @apiName update
   * @apiGroup testimonial
   */
  async function update(req, res) {
    const updatedTestimonial = await testimonialService.update(
      req.params.id,
      req.body,
      req
    );
    res.json(updatedTestimonial);
  }

  /**
   * @api {get} /api/v1/testimonials/:id
   * @apiName getById
   * @apiGroup testimonial
   */
  async function getById(req, res) {
    const response = await app.testimonials.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {get} /api/v1/testimonials/:slug
   * @apiName getBySlug
   * @apiGroup testimonial
   */
  async function getBySlug(req, res) {
    const response = await app.testimonials.getBySlug(req.params.slug);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/testimonials/:id
   * @apiName destroy
   * @apiGroup testimonial
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedTestimonial = await app.testimonials.destroy(id);
    res.status(200).json(deletedTestimonial);
  }

  /**
   * @api {post} /api/v1/testimonials/:id/publish
   * @apiName publish
   * @apiGroup testimonial
   */
  async function publish(req, res) {
    const { id } = req.params;

    const publishedTestimonial = await app.testimonials.publish(id);
    res.json(publishedTestimonial);
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
