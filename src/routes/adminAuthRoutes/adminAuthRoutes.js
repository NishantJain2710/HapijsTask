//Controllers
const RegisterSuperAdmin = require('../../controllers/adminAuthorizationControllers/RegisterSuperAdmin');
const LoginSuperAdmin = require('../../controllers/adminAuthorizationControllers/LoginSuperAdmin');

//Validators
const RegisterValidation = require('../../validators/adminValidations/RegisterValidations');
const LoginValidation = require('../../validators/adminValidations/LoginValidations');

const adminAuthRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/s_a/register',
            options:{
                auth: false,
                handler: RegisterSuperAdmin,
                validate:{
                    payload: RegisterValidation
                }
            }
        },
        {
            method: 'post',
            path: '/v1/api/s_a/login',
            options:{
                auth: false,
                handler: LoginSuperAdmin,
                validate:{
                    payload: LoginValidation
                }
            }
        }
    ]
}

module.exports = adminAuthRoutes;