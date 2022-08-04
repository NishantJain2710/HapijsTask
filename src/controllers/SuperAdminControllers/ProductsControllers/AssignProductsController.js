const Products = require('../../../models/products');

const AssignProductsController = async (request, h) => {
    try{
        const {
            productId,
            storeId
        } = request.payload;

        const isProductExist = await Products.query()
            .select('name')
            .where('id', '=', productId)
        
        if(!isProductExist.length){
            const responsData = {
                errorType:'Product Not Found',
                location:"AssignProductsController",
                message:'Product does not exist.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        await Products.query()
            .findById(productId)
            .patch({
                storeId: storeId
            });

        //sending success response
        const responsData = {
            data:null,
            message: 'Product successfully assigned to the store.'
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
            location:   "AssignProductsController",
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

module.exports = AssignProductsController;