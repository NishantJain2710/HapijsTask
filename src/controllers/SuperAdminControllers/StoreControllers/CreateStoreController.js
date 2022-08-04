const Store = require('../../../models/store');

const PostCreateStore = async (request, h) => {
    try{
        const { 
            name, 
            address, 
            city,
            pincode,
            state,
            countary
        } = request.payload;

        //Check if the store with same name exist

        const isStoreExist = await Store.query()
            .select('name')
            .where('name', '=', name)
        
        if(isStoreExist.length){
            const responsData = {
                errorType:'Store Already Exist',
                location:"PostCreateStore controller",
                message:'Try Another Name'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const store = await Store.query().insert({
            name, address, city, pincode, state, countary
        })

        //sending success response
        const responsData = {
            data: store,
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
            location:   "PostCreateStore controller",
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

module.exports = PostCreateStore;