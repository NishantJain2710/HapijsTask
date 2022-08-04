const Products = require('../../../models/products');
const Store = require('../../../models/store');

const GetAllProductsController = async (request, h) => {
    try{
        
        //Check if manager has a store
        const isStoreExist = await Store.query()
            .select('id', 'name')
            .first()
            .where('managerId', '=', request.auth.credentials.id)

        if(!isStoreExist){
            const responsData = {
                errorType:'Store Not Found',
                location:"GetAllProductsController by manager",
                message:'Stores are not assigned to you.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        //Check if product already exist
        const isProductExist = await Products.query()
            .select('id', 'name', 'quantity', 'price', 'discount')
            .where('storeId', '=', isStoreExist.id)

        if(!isProductExist.length){
            const responsData = {
                errorType:'Products Not Exist',
                location:"GetAllProductsController by manager",
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
            location:   "GetAllProductsController by manager",
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
module.exports = GetAllProductsController;