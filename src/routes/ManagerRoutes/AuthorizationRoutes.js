//Controllers
const ManagerLoginController = require('../../controllers/ManagerControllers/Authorization/LoginController');

//Validations
const LoginManagerValidation = require('../../validators/ManagerValidations/LoginValidations');

const ManagerAuthRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/manager/login',
            options:{
                auth: false,
                handler: ManagerLoginController,
                
            }
        }
    ]
}

module.exports = ManagerAuthRoutes;