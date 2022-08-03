const Hapi = require('@hapi/hapi');
require('dotenv').config();

const { validate } = require('./utils/auth.js');


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



        await server.start();
        console.log('info', 'server running at: ' + server.info.uri);

    }catch(error){
        console.log(error)
    }
};

init();