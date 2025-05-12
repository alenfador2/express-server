const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30),
  lastName: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeatPassword: Joi.ref('password'),
});

module.exports = { userSchema };
