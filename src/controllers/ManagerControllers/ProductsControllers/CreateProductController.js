const Products = require('../../../models/products');
const Store = require('../../../models/store');

const {isManager} = require('../../../middleware/roleBasedAuthorization');

const CreateProductsController = async (request, h) => {
    try{
        const res = isManager(request, h);
        if(res){
            return res
        }
        
        const { 
            name, 
            quantity, 
            price,
            discount
        } = request.payload;

        //Check if manager has a store
        const isStoreExist = await Store.query()
            .select('id', 'name')
            .first()
            .where('managerId', '=', request.auth.credentials.id)
            

        if(!isStoreExist){
            const responsData = {
                errorType:'Store Not Found',
                location:"CreateProductsController by manager",
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
            .select('id')
            .first()
            .where('name', '=', name)
            .where('storeId', '=', isStoreExist.id)

        if(isProductExist){
            const responsData = {
                errorType:'Product Already Exist',
                location:"CreateProductsController by manager",
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
            name, quantity, price, discount, storeId:isStoreExist.id
        })

        //sending success response
        const responsData = {
            data: product,
            message: 'Product added successfully'
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
            location:   "CreateProductsController by manager",
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