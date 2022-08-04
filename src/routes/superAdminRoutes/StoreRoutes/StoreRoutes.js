//Controller
const PostCreateStore = require('../../../controllers/SuperAdminControllers/StoreControllers/CreateStoreController');
const AssignManagerController = require('../../../controllers/SuperAdminControllers/StoreControllers/AssignManagerController');

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
    ]
}

module.exports = SuperAdminStoreRoutes;