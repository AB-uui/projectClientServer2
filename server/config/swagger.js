const fs = require('fs');
const path = require('path');
const PORT = require('../server');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the server',
    },
    servers: [
      {
        url: `http://localhost:5000`,
        description: 'Development server',
      },
    ],
  },
  apis: ['../server.js','./routes/*.js','./controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        urls: [
          {
            url: '/swagger.json',
            name: 'Swagger.json'
          }
        ]
      }
  }  ));
  // Endpoint to get the raw Swagger JSON
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

// Write the Swagger JSON to a file
// fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf-8');
// console.log('Swagger JSON file generated successfully!');

module.exports = setupSwagger;
// const path = require('path');
// const expressJSDocSwagger = require('express-jsdoc-swagger');
// //לייבא את ה PORT של השרת
// const PORT = require('../server'); // Update the path to your server.js file

// const setupSwagger = (app) => {
//   const options = {
//     info: {
//       version: '1.0.0',
//       title: 'API Documentation',
//       description: 'API documentation for the server',
//     },
//     servers: [
//       {
//         url: `http://localhost:${PORT}`, // Use the PORT variable from server.js
//         description: 'Development server',
//       },
//     ],
//     baseDir: path.join(__dirname, '..'), // Base directory for scanning files
//     filesPattern: './**/*.js', // Automatically scan route files
//     swaggerUIPath: '/api-docs', // Path to Swagger UI
//     exposeSwaggerUI: true, // Expose Swagger UI
//     exposeApiDocs: true, // Expose raw Swagger JSON
//     apiDocsPath: '/swagger.json', // Path to raw Swagger JSON
//   };
//   expressJSDocSwagger(app)(options);
//   console.log(path.join(options.baseDir, options.filesPattern))
// };

// module.exports = setupSwagger;