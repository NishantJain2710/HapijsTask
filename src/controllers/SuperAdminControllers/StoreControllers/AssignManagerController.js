const Admin = require('../../../models/admins');
const Store = require('../../../models/store');

const { isSuperAdmin } = require('../../../middleware/roleBasedAuthorization');

const AssignManagerController = async (request, h) => {
    try{    
        const res = isSuperAdmin(request, h);
        if(res){
            return res
        }
        
        const {
            managerId,
            storeId
        } = request.payload;

        const isManagerExist = await Admin.query()
            .select('*')
            .where('id', '=', managerId)
            .where('isSuperAdmin', '=', false)
        
        if(!isManagerExist.length){
            const responsData = {
                errorType:'Manager Not Found',
                location:"AssignManagerController api",
                message:'Manager does not exist'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        const isStoreExist = await Store.query()
            .select()
            .where('id', '=', storeId);

        if(!isStoreExist.length){
            const responsData = {
                errorType:'Store Not Found',
                location:"AssignManagerController api",
                message:'Store does not exist'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        await Store.query()
            .findById(storeId)
            .patch({
                managerId: managerId
            });

        //sending success response
        const responsData = {
            data:null,
            message: 'Manager successfully assigned to the store.'
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
            location:   "AssignManagerController controller",
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

module.exports = AssignManagerController;