const Product = require('../../../models/products');
const { isSuperAdmin } = require('../../../middleware/roleBasedAuthorization');

const GetParticularProduct = async (request, h) => {
    try{    
        const res = isSuperAdmin(request, h);
        if(res){
            return res
        }
        
        const { id } = request.params; //product Id

        const isProductExist = await Product.query()
            .select('*')
            .first()
            .where('id', '=', id)

        if(!isProductExist){
            const responsData = {
                errorType:'Product Not Found',
                location:"GetParticularProduct",
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
            location:   "GetParticularProduct",
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
module.exports = GetParticularProduct;