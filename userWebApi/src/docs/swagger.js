const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Management API',
            version: '1.0.0',
            description: 'CRUD API for managing employees',
        },
        servers: [{ url: "http://localhost:5000"}],
    },
    apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsDoc(swaggerOptions);
