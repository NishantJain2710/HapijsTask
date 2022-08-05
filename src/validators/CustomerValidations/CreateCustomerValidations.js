const Joi = require('joi');

const CreateCustomerValidation = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
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
})

module.exports = CreateCustomerValidation;