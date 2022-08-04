const Products = require('../../../models/products');

const getAllProductsController = async (request, h) => {
    try{

        //Check if product already exist
        const isProductExist = await Products.query()
            .select('id', 'name', 'quantity', 'price', 'discount')

        if(!isProductExist.length){
            const responsData = {
                errorType:'Products Not Exist',
                location:"GetAllProductsController by Customer",
                message:'No Products Founds'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const responsData = {
            data: isProductExist,
            message: 'Product fetched successfully'
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
            location:   "GetAllProductsController by customer",
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

module.exports = getAllProductsController;