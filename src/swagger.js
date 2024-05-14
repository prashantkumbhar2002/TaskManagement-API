// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Task Management API Documentation',
//       description: "API documentation for the Backend services",
//       contact: {
//         name: "Prashant Kumbhar",
//         email: "prashantkumbhar5515@gmail.com",
//       },
//       version: '1.0.0',
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },

//   },
//   apis: ['./src/routes/*.js'],
// }
// const swaggerSpec = swaggerJsdoc(options)
// function swaggerDocs(app, port) {
//   // Swagger Page
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//   // Documentation in JSON format
//   app.get('/docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(swaggerSpec)
//   })
// }

// module.exports = swaggerDocs;



const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API Documentation',
      description: "API documentation for the Backend services",
      contact: {
        name: "Prashant Kumbhar",
        email: "prashantkumbhar5515@gmail.com",
      },
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
module.exports = swaggerDocs;
