const Joi = require("joi");

const userSchemaGlobal = {
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  status: Joi.boolean().default(false),
  password: Joi.string().min(8).required(),
};

const validEmail = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
  }).unknown(true);
  const { error, value } = userSchema.validate(data);
  if (error) {
    throw {
      type: "VALIDATION_ERROR",
      message: error.details[0].message,
    };
  }
  return value;
};

const validateLogin = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }).unknown(true);
  const { error, value } = userSchema.validate(data);
  if (error) {
    throw {
      type: "VALIDATION_ERROR",
      message: error.details[0].message,
    };
  }
  return value;
};

const validateAddUser = (data) => {
  const userSchema = Joi.object(userSchemaGlobal).unknown(true);
  const { error, value } = userSchema.validate(data);
  if (error) {
    throw {
      type: "VALIDATION_ERROR",
      message: error.details[0].message,
    };
  }
  return value;
};

module.exports = {
  validateLogin,
  validEmail,
  validateAddUser,
};
