const Customer = require('../../../models/customer');
const argon2 = require('argon2');

const AddCustomersController = async (request, h) => {
    try{
        const { 
            firstName, 
            lastName, 
            email
        } = request.payload;

        // check is the Customer already exist
        const isCustomerExist = await Customer.query()
            .select('id')
            .where('email', '=', email);
        
        if(isCustomerExist.length){
            const responsData = {
                errorType:'Customer Already Exist',
                location:"AddCustomersController",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response
        }

        //Create a temp Password;
        let password = 'DoodleBlue_' + Math.random().toString(36).slice(2) 

        //Hashing PassWord
        const hashedPass = await argon2.hash(password);

        //Creating new Customer
        const customer = await Customer.query().insert({
            firstName:firstName,
            lastName:lastName,
            password:hashedPass,
            email:email,
            fullname: firstName + " " + lastName
        });

        //sending success response
        const responsData = {
            data:{
                email: customer.email,
                fullName: customer.fullname,
                temporary_password: password
            },
            message: 'Customer added successfully'
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
            location:   "AddCustomersController",
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

module.exports = AddCustomersController