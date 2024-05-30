const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.archiveCreateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required().valid('draft', 'published'),
    tags: Joi.array().empty(),
  });
  validateRequest(req, next, schema);
};

exports.archiveUpdateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    location: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional().valid('draft', 'published'),
  });

  validateRequest(req, next, schema);
};
