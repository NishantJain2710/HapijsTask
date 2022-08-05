const Joi = require('joi');

const assignStoreValidation = Joi.object({
    managerId: Joi.number().required(),
    storeId: Joi.number().required()
})

module.exports = assignStoreValidation;