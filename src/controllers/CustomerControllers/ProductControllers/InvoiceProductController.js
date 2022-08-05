const Products = require('../../../models/products');
const Customer = require('../../../models/customer');
const Invoice = require('../../../models/invoice');

const MailNodemailer  = require('../../../utils/SendMail');

const {isManager} = require('../../../middleware/roleBasedAuthorization');

const InvoiceProductsController = async (request, h) => {
    try{
        const res = isManager(request, h);
        if(res){
            return res
        }
        
        const { id } = request.params; //Product Id

        const { amountPaid, mode } = request.payload;

        const isCustomerExist = await Customer.query()
            .select('id', 'email')
            .first()
            .where('id', '=', request.auth.credentials.id)

        if(!isCustomerExist){
            const responsData = {
                errorType:'Customer Not Exist',
                location:"InvoiceProductsController",
                message:'Customer Not Found'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const isProductExist = await Products.query()
            .select('id', 'price', 'discount', 'quantity')
            .first()
            .where('id', '=', id)

        if(!isProductExist){
            const responsData = {
                errorType:'Product Not Exist',
                location:"InvoiceProductsController",
                message:'Product Not Found'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const referenceId = 'ref_' + Math.random().toString(36).slice(2) 
        const totalBill = isProductExist.price - isProductExist.discount
        const date = new Date().toISOString().split('T')

        const invoice = await Invoice.query()
        .insert({
            referenceId,
            totalBill,
            amountPaid,
            mode,
            date: date[0] + " " + date[1].split('Z')[0],
            customerId: isCustomerExist.id,
            productId: isProductExist.id
        })

        await Products.query()
            .findById(id)
            .patch({
                quantity: isProductExist.quantity - 1
            })

        const SendInvoice  = new MailNodemailer()
        await SendInvoice.sendEmail({
            to: 'nishantjainyo@gmail.com',
            from:`Nishant Jain <${process.env.MAILID}>`,
            cc:"",
            subject:"Product Invoice",
            text:`reference Id : ${invoice.referenceId} `,
            html: `<div> <h1> Invoice <h1> <p>Reference Id: ${invoice.referenceId} <p> <div>`
        })

        const responsData = {
            data: invoice,
            message: 'Invoice Created Successfully'
        }

        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(200)
        return response
    }catch(error){
        const responsData = {
            errorType:  'TryCatch',
            location:   "InvoiceProductsController",
            message:    error.message
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(500)
        return response
    }
}

module.exports = InvoiceProductsController