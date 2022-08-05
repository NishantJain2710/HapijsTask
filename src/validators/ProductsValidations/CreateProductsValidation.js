const Joi = require('joi');

const CreateProductsValidation = Joi.object({
    name:Joi.string().required(),
    quantity:Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required()
})

module.exports = CreateProductsValidation;