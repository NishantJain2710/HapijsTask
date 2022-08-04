//controller 
const CreateProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/CreateProductsController');
const AssignProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/AssignProductsController');

//Validator

const SuperAdminProductRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/s_a/create/product',
            options:{
                auth: 'jwt',
                handler: CreateProductsController
            }
        },
        {
            method: 'post',
            path: '/v1/api/s_a/assign/product',
            options:{
                auth: 'jwt',
                handler: AssignProductsController
            }
        },
    ]
}

module.exports = SuperAdminProductRoutes;