//Controller
const PostCreateStore = require('../../../controllers/SuperAdminControllers/StoreControllers/CreateStoreController');
const AssignManagerController = require('../../../controllers/SuperAdminControllers/StoreControllers/AssignManagerController');
const getAllStoresController = require('../../../controllers/SuperAdminControllers/StoreControllers/getAllStoresController');
const getParticularStoreController = require('../../../controllers/SuperAdminControllers/StoreControllers/getParticularStoreController');

//Validator


const SuperAdminStoreRoutes = () => {
    return[
        {
            method: 'post',
            path: '/v1/api/s_a/create/store',
            options:{
                auth: 'jwt',
                handler: PostCreateStore
            }
        },
        {
            method: 'post',
            path: '/v1/api/s_a/assign/store',
            options:{
                auth: 'jwt',
                handler: AssignManagerController
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/store',
            options:{
                auth: 'jwt',
                handler: getAllStoresController
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/store/{id}',
            options:{
                auth: 'jwt',
                handler: getParticularStoreController
            }
        },
    ]
}

module.exports = SuperAdminStoreRoutes;