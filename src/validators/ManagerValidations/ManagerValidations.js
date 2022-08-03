const Joi = require('joi');

const ManagerValidations = Joi.object({
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
    }).required()
})

module.exports = ManagerValidations;