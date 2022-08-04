const Admin = require('../../../models/admins');

const argon2 = require('argon2');

const PostCreateManager = async (request, h) => {
    try{
        const { 
            firstName, 
            lastName, 
            email
        } = request.payload;

        // check is the Manager already exist
        const isManagerExist = await Admin.query()
            .select('id')
            .where('email', '=', email);

        if(isManagerExist.length){
            const responsData = {
                errorType:'Manager Already Exist',
                location:"PostCreateManager api",
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

        //Creating new Manager Admin
        const admin = await Admin.query().insert({
            firstName:firstName,
            lastName:lastName,
            password:hashedPass,
            email:email,
            isSuperAdmin : false,
            fullname: firstName + " " + lastName
        });


        //sending success response
        const responsData = {
            data:{
                email: admin.email,
                fullName: admin.fullname,
                temporary_password: password
            },
            message: 'Manager added successfully'
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
            location:   "PostCreateManager api",
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
module.exports = PostCreateManager;