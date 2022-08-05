const Joi = require('joi');

const CreateProductsBySuperAdminValidation = Joi.object({
    name:Joi.string().required(),
    quantity:Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    storeId: Joi.number().required()
})

module.exports = CreateProductsBySuperAdminValidation;