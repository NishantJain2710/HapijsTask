const Admin = require('../../models/admins');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const RegisterSuperAdmin = async (request, h) => { 
    try{
        //destructuring Data from payload
        const { 
            firstName, 
            lastName, 
            email, 
            password 
        } = request.payload;

        // check is the admin already exist
        const isAdminExist = await Admin.query()
            .select('id')
            .where('email', '=', email);
        
        if(isAdminExist.length){

            const responsData = {
                errorType:'Admin Already Exist',
                location:"RegisterSuperAdmin api",
                message:'Try Another Email Address'
            }

            const response = h
                .response(responsData)
                .type('application/json')
                .header('content-type', 'application/json')
                .code(400)

            return response

        }

        //Hashing PassWord
        const hashedPass = await argon2.hash(password);

        //Creating new super Admin
        const admin = await Admin.query().insert({
            firstName:firstName,
            lastName:lastName,
            password:hashedPass,
            email:email,
            isSuperAdmin : true,
            fullname: firstName + " " + lastName
        });

        //initializing payload
        const payload = {
            id: admin.id,
            userType:'super_admin'
        }

        //encode the payload in JWT Token
        const token = await jwt.sign(
            payload, process.env.JWT_TOKEN,{
                expiresIn: 60*60*24*7
            }
        );
        
        //sending success response with the encoded token
        const responsData = {
            data:{
                authToken: token
            },
            message: 'Super Admin Successfully Registered'
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
            location:"RegisterSuperAdmin api",
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

module.exports = RegisterSuperAdmin;