const Store = require('../../../models/store');
const Product = require('../../../models/products');
const { isSuperAdmin } = require('../../../middleware/roleBasedAuthorization');

const GetAllTheProductOfManager = async (request, h) => {
    try{    
        const res = isSuperAdmin(request, h);
        if(res){
            return res
        }
        
        const { id } = request.params; //Manager Id

        const isStoreExist = await Store.query()
            .select('id')
            .first()
            .where('managerId', '=', id)
        
        if(!isStoreExist){
            const responsData = {
                errorType:'Store Not Found',
                location:"GetAllTheProductOfManager",
                message:'Product does not exist.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const isProductExist = await Product.query()
            .select('*')
            .where('storeId', '=', isStoreExist.id)

        if(!isProductExist.length){
            const responsData = {
                errorType:'Products Not Found',
                location:"GetAllTheProductOfManager",
                message:'Product does not exist.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }
            
        //sending success response
        const responsData = {
            data:isProductExist,
            message: 'Product fetched successfully.'
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
            location:   "GetAllTheProductOfManager",
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
module.exports = GetAllTheProductOfManager;