const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SaaS de ERP',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:4000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            email: { type: "string" },
            senha: { type: "string" }
          }
        },
        Profissional: {
          type: "object",
          properties: {
            id: { type: "integer" },
            empresa_id: { type: "integer" },
            nome: { type: "string" },
            email: { type: "string" },
            telefone: { type: "string" },
            especialidade: { type: "string" },
            ativo: { type: "integer" },
            created_at: { type: "string", format: "date-time" }
          }
        }
        // Adicione aqui outros schemas, como Cliente, Produto, etc, se precisar.
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [
    './routes/*.js',
    './src/routes/*.js'
  ],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
