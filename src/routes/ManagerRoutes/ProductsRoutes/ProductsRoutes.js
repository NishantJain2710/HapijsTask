//Controllers
const CreateProductsController = require('../../../controllers/ManagerControllers/ProductsControllers/CreateProductController');
const UpdateProductsController = require('../../../controllers/ManagerControllers/ProductsControllers/UpdateProductController');
const GetAllProductsController = require('../../../controllers/ManagerControllers/ProductsControllers/GetAllProductsController');
const GetParticularProductController = require('../../../controllers/ManagerControllers/ProductsControllers/GetParticularProductController');


const ManagerProductRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/s_a/create/product/manager',
            options:{
                auth: 'jwt',
                handler: CreateProductsController,
            }
        },
        {
            method: 'post',
            path: '/v1/api/s_a/update/{id}/product/manager',
            options:{
                auth: 'jwt',
                handler: UpdateProductsController,
            }
        },
        {
            method: 'get',
            path: '/v1/api/manager/product',
            options:{
                auth: 'jwt',
                handler: GetAllProductsController,
            }
        },
        {
            method: 'get',
            path: '/v1/api/manager/product/{id}',
            options:{
                auth: 'jwt',
                handler: GetParticularProductController,
            }
        },
    ]
}

module.exports = ManagerProductRoutes;