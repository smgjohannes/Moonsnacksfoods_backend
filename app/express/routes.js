const express = require('express');

const UserController = require('./controllers/userController');
const MemberController = require('./controllers/memberController');
const PaymentController = require('./controllers/paymentController');

const ImageController = require('./controllers/imageController');

// validators
const userValidation = require('./validations/userValidation');
const memberValidation = require('./validations/memberValidation');
const paymentValidation = require('./validations/paymentValidation');
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
  const memberController = MemberController(app);
  const paymentController = PaymentController(app);

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

  router.get('/members/getBySlug/:slug', memberController.getBySlug);
  router
    .route('/members')
    .get(memberController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.createSchema,
      memberController.create
    );

  router
    .route('/members/:id')
    .get(memberController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      memberValidation.updateSchema,
      memberController.update
    )
    .delete(authMiddleware, memberController.destroy);

  // IMAGE ROUTES
  router.post(
    '/images/:entity_id',
    authMiddleware,
    upload.manyFiles(),
    imageController.upload
  );

  router.delete('/images/:id', authMiddleware, imageController.destroy);

  // payments ROUTES
  router.get('/payments/getBySlug/:slug', paymentController.getBySlug);
  router
    .route('/payments')
    .get(paymentController.get)
    .post(
      authMiddleware,
      upload.manyFiles(),
      paymentValidation.createSchema,
      paymentController.create
    );

  router
    .route('/payments/:id')
    .get(paymentController.getById)
    .patch(
      authMiddleware,
      upload.manyFiles(),
      paymentValidation.updateSchema,
      paymentController.update
    )
    .delete(authMiddleware, paymentController.destroy);
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
