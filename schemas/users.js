const Joi = require("joi");
const { subscriptionList, emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  emailSchema,
};
