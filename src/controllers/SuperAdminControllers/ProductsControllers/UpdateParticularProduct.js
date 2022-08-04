const Product = require('../../../models/products');

const UpdateParticularProduct = async (request, h) => {
    try{    
        const { id } = request.params; //product Id
        const {
            name, 
            quantity, 
            price,
            discount
        } = request.payload;

        const isProductExist = await Product.query()
            .select('*')
            .first()
            .where('id', '=', id)

        if(!isProductExist){
            const responsData = {
                errorType:'Product Not Found',
                location:"UpdateParticularProduct",
                message:'Product does not exist.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        await Product.query()
            .findById(id)
            .patch({
                name: name ? name : isProductExist.name,
                quantity: quantity ? quantity : isProductExist.quantity,
                price: price ? price : isProductExist.price,
                discount: discount ? discount : isProductExist.discount
            })
            
        //sending success response
        const responsData = {
            data:null,
            message: 'Product successfully Updated.'
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
            location:   "UpdateParticularProduct",
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
module.exports = UpdateParticularProduct;