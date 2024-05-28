const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.eventCreateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    tags: Joi.array().empty(),
  });
  validateRequest(req, next, schema);
};

exports.eventUpdateSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    location: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('draft', 'published'),
    start_date: Joi.string().optional(),
    end_date: Joi.string().optional(),
  });

  validateRequest(req, next, schema);
};
