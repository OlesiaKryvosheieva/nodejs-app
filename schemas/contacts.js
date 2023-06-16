const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactAddSchema, contactUpdateSchema };
