//controller 
const PostCreateManager = require('../../../controllers/SuperAdminControllers/ManagerControllers/PostCreateManagers');
const GetAllManagers = require('../../../controllers/SuperAdminControllers/ManagerControllers/GetAllManagers');
const GetParticularManagers = require('../../../controllers/SuperAdminControllers/ManagerControllers/GetParticularManager');
const GetStoreDetailsOfManager = require('../../../controllers/SuperAdminControllers/ManagerControllers/GetStoreDetailsController');


//Validator
const ManagerValidations = require('../../../validators/ManagerValidations/ManagerValidations');
const CreateInvoiceValidation = require('../../../validators/CustomerValidations/CreateInvoiceValidations');


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
        {
            method: 'get',
            path: '/v1/api/s_a/manager',
            options:{
                auth: 'jwt',
                handler: GetAllManagers
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/{id}/manager',
            options:{
                auth: 'jwt',
                handler: GetParticularManagers,
                validate: {
                    params: CreateInvoiceValidation
                }
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/store/{id}/manager',
            options:{
                auth: 'jwt',
                handler: GetStoreDetailsOfManager,
                validate: {
                    params: CreateInvoiceValidation
                }
            }
        },
    ]
}

module.exports = SuperAdminManagerRoutes;