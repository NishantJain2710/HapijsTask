//Controller
const AddCustomersController = require('../../controllers/CustomerControllers/Customers/AddCustomersController');
const CustomerLoginController = require('../../controllers/CustomerControllers/Authorization/LoginCustomers');
const GetAllCustomersController = require('../../controllers/CustomerControllers/Customers/GetAllCustomerController');
const getAllProductsController = require('../../controllers/CustomerControllers/ProductControllers/getAllProductsController');
const InvoiceProductsController = require('../../controllers/CustomerControllers/ProductControllers/InvoiceProductController');

//validations

const customerAuthRoutes = () => {
    return [
        {
            method: 'post',
            path: '/v1/api/create/customer',
            options:{
                auth: 'jwt',
                handler: AddCustomersController
            }
        },
        {
            method: 'post',
            path: '/v1/api/login/customer',
            options:{
                auth: false,
                handler: CustomerLoginController
            }
        },
        {
            method: 'get',
            path: '/v1/api/customer',
            options:{
                auth: 'jwt',
                handler: GetAllCustomersController
            }
        },
        {
            method: 'get',
            path: '/v1/api/all/products',
            options:{
                auth: 'jwt',
                handler: getAllProductsController
            }
        },
        {
            method: 'post',
            path: '/v1/api/invoice/{id}/products',
            options:{
                auth: 'jwt',
                handler: InvoiceProductsController
            }
        }
    ]
}

module.exports = customerAuthRoutes;