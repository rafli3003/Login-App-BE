const Joi = require("joi")

const paginationValidation = {
  search: Joi.string().trim().empty(''),
  page: Joi.number().integer().empty(''),
  limit: Joi.number().integer().empty(''),
  sort_by: Joi.string().trim().empty(''),
  sort_order: Joi.string().trim().uppercase().valid('ASC', 'DESC').empty(''),
};

const validationOptions = {
  abortEarly: false,
};

module.exports = {
  paginationValidation,
  validationOptions
}