const Joi = require('joi');

const CreateInvoiceValidation = Joi.object({
    id:Joi.number().required()
})

module.exports = CreateInvoiceValidation;