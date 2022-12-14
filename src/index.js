const Hapi = require('@hapi/hapi');
require('dotenv').config();

const { validate } = require('./utils/auth.js');

//Routes
const adminAuthRoutes = require('./routes/adminAuthRoutes/adminAuthRoutes');
const SuperAdminManagerRoutes = require('./routes/superAdminRoutes/ManagerRoutes/ManagerRoutes');
const SuperAdminStoreRoutes = require('./routes/superAdminRoutes/StoreRoutes/StoreRoutes');
const SuperAdminProductRoutes = require('./routes/superAdminRoutes/ProductRoutes/ProductsRoutes');

const ManagerProductRoutes = require('./routes/ManagerRoutes/ProductsRoutes/ProductsRoutes');

const customerAuthRoutes = require('./routes/customerRoutes/CustomerRoutes');

//Database setup
const db = require('./knex/knex');

const init = async() => {
    try{
        //stablish connection with database
        await db();
        console.log("Database Connected Successfully...")

        // creating a server instance
        const server = new Hapi.Server({
            port:process.env.PORT,
            host:process.env.HOST,
            routes: { cors: { origin: ['*'] } }
        })

        await server.register([require('hapi-auth-jwt2')]);
        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_TOKEN,
            validate,
            verifyOptions: {
                algorithms: ['HS256'],
            }
        })
        server.auth.default('jwt');

        server.route(adminAuthRoutes())
        server.route(SuperAdminManagerRoutes())
        server.route(SuperAdminStoreRoutes())
        server.route(SuperAdminProductRoutes())
        server.route(ManagerProductRoutes())
        server.route(customerAuthRoutes())

        
        await server.start();
        console.log('info', 'server running at: ' + server.info.uri);

    }catch(error){
        console.log(error)
    }
};

init();