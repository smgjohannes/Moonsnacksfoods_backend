const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    short_description: Joi.string().required(),
    description: Joi.string().required(),
    overlay_text: Joi.string().required(),
    status: Joi.string().required().valid('draft', 'published'),
    tags: Joi.array().empty(),
  });
  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    short_description: Joi.string().optional(),
    description: Joi.string().optional(),
    overlay_text: Joi.string().optional(),
    status: Joi.string().optional().valid('draft', 'published'),
  });

  validateRequest(req, next, schema);
};
