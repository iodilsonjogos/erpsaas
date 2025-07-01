const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SaaS de ERP',
      version: '1.0.0',
    },
      securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
    servers: [{ url: 'http://localhost:4000/api' }],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            email: { type: "string" },
            senha: { type: "string" }
          }
        }
      }
    }
  },
  apis: [
    './routes/*.js',
    './src/routes/*.js'
  ],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
