//controller 
const CreateProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/CreateProductsController');
const AssignProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/AssignProductsController');
const GetAllTheProductOfManager = require('../../../controllers/SuperAdminControllers/ProductsControllers/GetAllTheProductOfManager');
const GetParticularProduct = require('../../../controllers/SuperAdminControllers/ProductsControllers/GetParticularProduct');
const UpdateParticularProduct = require('../../../controllers/SuperAdminControllers/ProductsControllers/UpdateParticularProduct');


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
        {
            method: 'get',
            path: '/v1/api/s_a/product/manager/{id}',
            options:{
                auth: 'jwt',
                handler: GetAllTheProductOfManager
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/product/{id}',
            options:{
                auth: 'jwt',
                handler: GetParticularProduct
            }
        },
        {
            method: 'put',
            path: '/v1/api/s_a/product/{id}',
            options:{
                auth: 'jwt',
                handler: UpdateParticularProduct
            }
        },
    ]
}

module.exports = SuperAdminProductRoutes;