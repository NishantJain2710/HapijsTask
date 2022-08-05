const Joi = require('joi');

const AssignProductToStore = Joi.object({
    productId:Joi.number().required(),
    storeId:Joi.number().required()
})

module.exports = AssignProductToStore;