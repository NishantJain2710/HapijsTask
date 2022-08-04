const Admin = require('../../../models/admins');

const argon2 = require('argon2');
const jwt = require ('jsonwebtoken');

const ManagerLoginController = async (request, h) => {
    try{
        const { 
            email, 
            password
        } = request.payload;
        
        //Find Manager
        const isManagerExist = await Admin.query()
            .select('id', 'fullname', 'email', 'password')
            .where('email', '=', email)
            .where('isSuperAdmin', '=', false)

        //If No Manager Found
        if(!isManagerExist.length){
            const responsData = {
                errorType:'Manager Not Found',
                location:"ManagerLoginController",
                message:'Try Another Email Address'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        //Verify Manager Password
        const verifyPassword = await argon2.verify(isManagerExist[0].password, password);
        
        if(!verifyPassword){
            const responsData = {
                errorType:'Incorrect Password',
                location:"ManagerLoginController",
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
            id:     isManagerExist[0].id,
            isSuperAdmin:   isManagerExist[0].isSuperAdmin
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
            message: 'Manager Successfully Logged In'
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
            location:"ManagerLoginController",
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

module.exports = ManagerLoginController;