//controller 
const PostCreateManager = require('../../../controllers/SuperAdminControllers/PostCreateManagers');

//Validator
const ManagerValidations = require('../../../validators/ManagerValidations/ManagerValidations');

const SuperAdminManagerRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/s_a/create/manager',
            options:{
                auth: 'jwt',
                handler: PostCreateManager,
                validate:{
                    payload: ManagerValidations
                }
            }
        },
    ]
}

module.exports = SuperAdminManagerRoutes;