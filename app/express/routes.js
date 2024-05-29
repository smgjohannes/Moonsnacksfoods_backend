const express = require('express');

const UserController = require('./controllers/userController');
const PostController = require('./controllers/postController');
const EventController = require('./controllers/eventController');
const ImageController = require('./controllers/imageController');
// validators
const userValidation = require('./validations/userValidation');
const postValidation = require('./validations/postValidation');
const commonValidation = require('./validations/commonValidation');

// Middleware with dependence
const AuthMiddleware = require('./middleware/authMiddleware');
const CorsMiddleware = require('./middleware/corsMiddleware');

// Simple middleware
const adminMiddleware = require('./middleware/adminMiddleware');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');

const upload = require('../utils/multer');

/**
 * @description Return object of routes.
 * @param {Object} app - app object.
 * @returns {Object} Return object of routes.
 * @example
 * getRoutes(app);
 */
function getRoutes(app) {
  const userController = UserController(app);
  const postController = PostController(app);
  const eventController = EventController(app);
  const imageController = ImageController(app);
  const router = express.Router();

  // enable cross origin requests
  router.use(CorsMiddleware);

  const authMiddleware = AuthMiddleware('post:write', app);

  // AUTH
  router.post(
    '/login',
    rateLimitMiddleware,
    userValidation.loginSchema,
    userController.login
  );

  router.get('/posts/getBySlug/:slug', postController.getBySlug);
  router
    .route('/posts')
    .get(postController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      postValidation.createSchema,
      postController.create
    );

  router
    .route('/posts/:id')
    .get(postController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      postValidation.updateSchema,
      postController.update
    )
    .delete(authMiddleware, postController.destroy);

  //EVENT ROUTERS

  router.get('/events/getBySlug/:slug', eventController.getBySlug);
  router
    .route('/events')
    .get(eventController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      commonValidation.eventCreateSchema,
      eventController.create
    );

  router
    .route('/events/:id')
    .get(eventController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      commonValidation.eventUpdateSchema,
      eventController.update
    )
    .delete(authMiddleware, eventController.destroy);
  // IMAGE ROUTES
  router.post(
    '/images/:entity_id',
    authMiddleware,
    upload.manyFiles(),
    imageController.upload
  );

  router.delete('/images/:id', authMiddleware, imageController.destroy);
  // USER
  router.get('/users', authMiddleware, adminMiddleware, userController.get);
  router
    .route('/users/:id')
    .get(authMiddleware, adminMiddleware, userController.getById)
    .patch(
      authMiddleware,
      adminMiddleware,
      userValidation.updateUserSchema,
      userController.update
    );

  // CURRENT USER
  router.post(
    '/me/update-password',
    authMiddleware,
    userValidation.updatePasswordSchema,
    userController.updatePassword
  );

  router
    .route('/me')
    .get(authMiddleware, userController.getMe)
    .patch(
      authMiddleware,
      userValidation.updateUserSchema,
      userController.updateMe
    );

  return router;
}

module.exports = getRoutes;
