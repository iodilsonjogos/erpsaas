const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SaaS de ERP',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:4000/api' }],
  },
 apis: [
  './routes/*.js',
  './src/routes/*.js'
],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
