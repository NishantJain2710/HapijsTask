//Controller
const PostCreateStore = require('../../../controllers/SuperAdminControllers/StoreControllers/CreateStoreController');

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
    ]
}

module.exports = SuperAdminStoreRoutes;