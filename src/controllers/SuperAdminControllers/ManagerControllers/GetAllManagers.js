const Admin = require('../../../models/admins');

const GetAllManagers = async (request, h) => {
    try{
        //Get List Of Managers
        const getListOfManagers = await Admin.query()
            .select('fullname', 'id', 'email')
            .where('isSuperAdmin', '=', false);
        
        if(getListOfManagers.length === 0){
            const responsData = {
                errorType:'Mangers Does Not Exist',
                location:"GetAllManagers api",
                message:'Managers not found'
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
            data:getListOfManagers,
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
            location:   "GetAllManagers api",
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

module.exports = GetAllManagers;