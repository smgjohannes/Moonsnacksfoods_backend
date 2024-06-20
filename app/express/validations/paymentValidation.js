const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    memberId: Joi.string().uuid().required(),
    type: Joi.string().valid('pastoralFunds', 'membershipCard').required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
  });

  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    memberId: Joi.string().uuid().optional(),
    type: Joi.string().valid('pastoralFunds', 'membershipCard').optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.date().iso().optional(),
  }).min(1); // At least one field is required for update

  validateRequest(req, next, schema);
};
