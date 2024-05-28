const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    status: Joi.string().required().valid('draft', 'published'),
    tags: Joi.array().empty(),
  });
  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional(),
    status: Joi.string().optional().valid('draft', 'published'),
  });

  validateRequest(req, next, schema);
};
