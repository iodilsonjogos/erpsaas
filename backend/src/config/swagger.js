const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SaaS de ERP",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.resolve(__dirname, "../routes/*.js")], // src/routes/*.js
};

module.exports = swaggerJSDoc(options);
