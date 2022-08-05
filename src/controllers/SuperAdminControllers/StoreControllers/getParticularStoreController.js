const Store = require('../../../models/store');
const { isSuperAdmin } = require('../../../middleware/roleBasedAuthorization');

const getParticularStoreController = async (request, h) => {
    try{
        const res = isSuperAdmin(request, h);
        if(res){
            return res
        }
        
        const { id } = request.params; //store id

        const isStoreExist = await Store.query()
            .select('*')
            .first()
            .where('id', '=', id)
        
        if(!isStoreExist){
            const responsData = {
                errorType:'Store Does Not Exist',
                location:"getParticularStoreController",
                message:'Store Not Found'
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
            data: isStoreExist,
            message: 'Store fetched successfully'
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
            location:   "getParticularStoreController",
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
module.exports = getParticularStoreController;