const Admin = require('../../../models/admins');

const GetParticularManagers = async (request, h) => {
    try{
        const { id } = request.params;

        //Get Manager
        const isManagerExist = await Admin.query()
            .select('fullname', 'id', 'email')
            .first()
            .where('id', '=', id)
            .where('isSuperAdmin', '=', false);
        
        if(!isManagerExist){
            const responsData = {
                errorType:'Manger Does Not Exist',
                location:"GetParticularManagers api",
                message:'Manager not found'
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
            data:isManagerExist,
            message: 'Manager Fetched successfully'
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
            location:   "GetParticularManagers api",
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
module.exports = GetParticularManagers;