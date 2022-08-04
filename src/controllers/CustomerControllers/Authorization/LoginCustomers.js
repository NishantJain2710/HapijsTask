const Customer = require('../../../models/customer');

const argon2 = require('argon2');
const jwt = require ('jsonwebtoken');

const CustomerLoginController = async (request, h) => {
    try{
        const { 
            email, 
            password
        } = request.payload;
        
        //Find Customer
        const isCustomerExist = await Customer.query()
            .select('id', 'fullname', 'email', 'password')
            .where('email', '=', email)

        //If No Customer Found
        if(!isCustomerExist.length){
            const responsData = {
                errorType:'Customer Not Found',
                location:"CustomerLoginController",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        //Verify Customer Password
        const verifyPassword = await argon2.verify(isCustomerExist[0].password, password);
        
        if(!verifyPassword){
            const responsData = {
                errorType:'Incorrect Password',
                location:"CustomerLoginController",
                message:'Oops! Incorrect password try again!'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        const payload = {
            id:     isCustomerExist[0].id,
            isCustomer:   true
        }

        const token = await jwt.sign(
            payload, process.env.JWT_TOKEN, {
              expiresIn: 60*60*24*7
            }
        );

        const responsData = {
            data:{
                authToken: token
            },
            message: 'Customer Successfully Logged In'
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(200)
        return response

    }catch(error){
        const responsData = {
            errorType:'TryCatch',
            location:"CustomerLoginController",
            message:error.message
        }
        const response = h
            .response(responsData)
            .type('application/json')
            .header('content-type', 'application/json')
            .code(500)
        return response
    }
}

module.exports = CustomerLoginController;