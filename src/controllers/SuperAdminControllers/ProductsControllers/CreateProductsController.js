const Products = require('../../../models/products');

const CreateProductsController = async (request, h) => {
    try{
        const { 
            name, 
            quantity, 
            price,
            discount,
            storeId
        } = request.payload;

        const isProductExist = await Products.query()
            .select('name')
            .where('name', '=', name)

        if(isProductExist.length){
            const responsData = {
                errorType:'Product Already Exist',
                location:"CreateProductsController",
                message:'Try Another Name'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const product = await Products.query().insert({
            name, quantity, price, discount, storeId
        })

        //sending success response
        const responsData = {
            data: product,
            message: 'Store added successfully'
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
            location:   "CreateProductsController",
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

module.exports = CreateProductsController;