const fastify = require('fastify')();
require('dotenv').config();
const swagger = require('@fastify/swagger');



//Files imported
const { connect } = require('./config/dbConfig');


// fastify.register(swagger, {
//     routePrefix: '/documentation',
//     swagger: {
//       info: {
//         title: 'Fastify API',
//         description: 'Documentation for Fastify API',
//         version: '1.0.0',
//       },
//       externalDocs: {
//         url: 'https://swagger.io',
//         description: 'Find more info here',
//       },
//       host: 'localhost:8080',
//       schemes: ['http'],
//       consumes: ['application/json'],
//       produces: ['application/json'],
//     },
//     exposeRoute: true,
//   });
  

fastify.register(async (fastify, options) => {
    await connect();
  });


// To register the routes
fastify.register(require('./src/routes/userRoute'))



fastify.get('/', async (request, reply) => {
  return { message: 'Hello, world!' };
});

const start = async () => {
    try {
      const port = process.env.PORT || 8080;
      await fastify.listen(port);
      console.log(`Server started on port ${port}`);
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  };
  

start();
