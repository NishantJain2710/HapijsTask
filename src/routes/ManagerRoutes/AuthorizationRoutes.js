//Controllers
const ManagerLoginController = require('../../controllers/ManagerControllers/Authorization/LoginController');

//Validations
const LoginValidation = require('../../validators/adminValidations/LoginValidations');

const ManagerAuthRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/manager/login',
            options:{
                auth: false,
                handler: ManagerLoginController,
                validate:{
                    payload: LoginValidation
                }
            }
        }
    ]
}

module.exports = ManagerAuthRoutes;