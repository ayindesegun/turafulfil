//VALIDATION
const Joi = require('joi')

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().max(4).min(4).required(),
    contact: Joi.string().min(11).max(11).required(),
    email: Joi.string().min(6).max(255).required().email(),
    businessName: Joi.string().min(4).max(1024).required(),
  })
  return schema.validate(data)
}
const loginValidation = (data) => {
  const schema = Joi.object({
    contact: Joi.string().min(11).max(11).required(),
    password: Joi.string().max(4).min(4).required(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
