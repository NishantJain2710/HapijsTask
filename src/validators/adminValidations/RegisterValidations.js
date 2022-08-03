const Joi = require('joi');

const RegisterValidation = Joi.object({
    firstName: Joi.string().min(1).max(126).required(),
    lastName: Joi.string().min(1).max(126).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds:{
            allow: [
                'com',
                'net',
                'in'
            ]
        }
    }).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

module.exports = RegisterValidation;