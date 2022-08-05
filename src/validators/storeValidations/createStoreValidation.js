const Joi = require('joi');

const CreateStoreValidation = Joi.object({
    name:Joi.string().required(),
    address:Joi.string(),
    city: Joi.string(),
    pincode: Joi.string(),
    state: Joi.string(),
    countary: Joi.string()
})

module.exports = CreateStoreValidation;