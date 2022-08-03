const Admin = require('../../models/admins');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const LoginSuperAdmin = async (request, h) => {
    try{
        const { 
            email, 
            password
        } = request.payload;

        //Find Admin
        const isAdminExist = await Admin.query()
            .select('fullname', 'email', 'id', 'password', 'isSuperAdmin')
            .where('email', '=', email)
            .where('isSuperAdmin', '=' , true)

        //Throw Error If super admin not found
        if(!isAdminExist.length){
            const responsData = {
                errorType:'Super Admin Not Found',
                location:"LoginSuperAdmin api",
                message:'Email is Incorrect.'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }

        //Verify Admin Password
        const verifyPassword = await argon2.verify(isAdminExist[0].password, password);

        //Throw error is password not verified
        if(!verifyPassword){
            const responsData = {
                errorType:'Incorrect Password',
                location:"LoginSuperAdmin api",
                message:'Oops! Incorrect password try again!'
            }
            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)
            return response
        }
        
        //initializing payload
        const payload = {
            id: isAdminExist[0].id,
            isSuperAdmin: isAdminExist[0].isSuperAdmin
        }

        //encode the payload in JWT Token
        const token = await jwt.sign(
            payload, process.env.JWT_TOKEN, {
              expiresIn: 60*60*24*7
            }
        );

        //sending success response with the encoded token
        const responsData = {
            data:{
                authToken: token
            },
            message: 'Admin Successfully Logged In'
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
            location:   "LoginSuperAdmin api",
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

module.exports = LoginSuperAdmin;