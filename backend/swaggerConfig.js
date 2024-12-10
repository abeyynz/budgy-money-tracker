const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Money Tracker API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk aplikasi budgy',
    },
    servers: [
      {
        url: 'https://be-62882737625.asia-southeast2.run.app', // Ganti dengan base URL API Anda di production
      },
    ],components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  apis: ['./routes/*.js'], // Sesuaikan dengan lokasi file rute API Anda
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
