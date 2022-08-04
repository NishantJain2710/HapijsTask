const Customer = require('../../../models/customer');

const GetAllCustomersController = async (request, h) => {
    try{

        // check is the Customer already exist
        const isCustomerExist = await Customer.query()
            .select('id', 'email', 'fullname')
        
        if(!isCustomerExist.length){
            const responsData = {
                errorType:'Customer Does Not Exist',
                location:"GetAllCustomersController",
                message:'No Customers Found'
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
            data:isCustomerExist,
            message: 'Customer fetched successfully'
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
            location:   "GetAllCustomersController",
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

module.exports = GetAllCustomersController