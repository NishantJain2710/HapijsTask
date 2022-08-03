const Joi = require('joi');

const LoginValidation = Joi.object({
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

module.exports = LoginValidation;