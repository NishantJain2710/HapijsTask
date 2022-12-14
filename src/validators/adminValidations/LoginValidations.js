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
    password: Joi.string().required()
})

module.exports = LoginValidation;