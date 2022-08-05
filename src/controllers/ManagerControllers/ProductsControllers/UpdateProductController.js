const Products = require('../../../models/products');
const Store = require('../../../models/store');
const {isManager} = require('../../../middleware/roleBasedAuthorization');

const UpdateProductsController = async (request, h) => {

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

        const {
            id
        } = request.params;

        //Find Store
        const isStoreExist = await Store.query()
            .select('id', 'name')
            .first()
            .where('managerId', '=', request.auth.credentials.id)
            

        if(!isStoreExist){
            const responsData = {
                errorType:'Store Not Found',
                location:"UpdateProductsController by manager",
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
            .first()
            .where('id', '=', id)
            .where('storeId', '=', isStoreExist.id)

        if(!isProductExist){
            const responsData = {
                errorType:'Wrong Product Id!',
                location:"UpdateProductsController by manager",
                message:'Product Not Found'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        //Update Product

        await Products.query()
            .findById(isProductExist.id)
            .patch({
                name: name ? name : isProductExist.name,
                quantity: quantity ? quantity : isProductExist.quantity,
                price: price ? price : isProductExist.price,
                discount: discount ? discount : isProductExist.discount
            })


        //sending success response
        const responsData = {
            data: null,
            message: 'Product updated successfully'
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
            location:   "UpdateProductsController by manager",
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
module.exports = UpdateProductsController;