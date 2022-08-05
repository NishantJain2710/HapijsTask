const Joi = require('joi');

const UpdateProductsValidation = Joi.object({
    name:Joi.string(),
    quantity:Joi.number(),
    price: Joi.number(),
    discount: Joi.number()
})

module.exports = UpdateProductsValidation;