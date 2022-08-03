//Controllers
const RegisterSuperAdmin = require('../../controllers/adminAuthorizationControllers/RegisterSuperAdmin');


//Validators
const RegisterValidation = require('../../validators/adminValidations/RegisterValidations');

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
        }
    ]
}

module.exports = adminAuthRoutes;