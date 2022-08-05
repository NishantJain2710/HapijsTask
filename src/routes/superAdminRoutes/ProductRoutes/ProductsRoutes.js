//controller 
const CreateProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/CreateProductsController');
const AssignProductsController = require('../../../controllers/SuperAdminControllers/ProductsControllers/AssignProductsController');
const GetAllTheProductOfManager = require('../../../controllers/SuperAdminControllers/ProductsControllers/GetAllTheProductOfManager');
const GetParticularProduct = require('../../../controllers/SuperAdminControllers/ProductsControllers/GetParticularProduct');
const UpdateParticularProduct = require('../../../controllers/SuperAdminControllers/ProductsControllers/UpdateParticularProduct');


//Validator
const CreateInvoiceValidation = require('../../../validators/CustomerValidations/CreateInvoiceValidations');
const CreateProductsBySuperAdminValidation = require('../../../validators/ProductsValidations/CreateProductsBySuperAdmin');
const AssignProductToStore = require('../../../validators/ProductsValidations/AssignProductToStore');
const UpdateProductsValidation = require('../../../validators/ProductsValidations/UpdateProductsValidation');


const SuperAdminProductRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/s_a/create/product',
            options:{
                auth: 'jwt',
                handler: CreateProductsController,
                validate:{
                    payload: CreateProductsBySuperAdminValidation
                }
            }
        },
        {
            method: 'post',
            path: '/v1/api/s_a/assign/product',
            options:{
                auth: 'jwt',
                handler: AssignProductsController,
                validate:{
                    payload: AssignProductToStore
                }
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/product/manager/{id}',
            options:{
                auth: 'jwt',
                handler: GetAllTheProductOfManager,
                validate: {
                    params: CreateInvoiceValidation
                }
            }
        },
        {
            method: 'get',
            path: '/v1/api/s_a/product/{id}',
            options:{
                auth: 'jwt',
                handler: GetParticularProduct,
                validate: {
                    params: CreateInvoiceValidation
                }
            }
        },
        {
            method: 'put',
            path: '/v1/api/s_a/product/{id}',
            options:{
                auth: 'jwt',
                handler: UpdateParticularProduct,
                validate: {
                    params: CreateInvoiceValidation,
                    payload: UpdateProductsValidation
                }
            }
        },
    ]
}

module.exports = SuperAdminProductRoutes;