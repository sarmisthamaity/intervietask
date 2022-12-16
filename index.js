const express = require('express');
const app = express();
require('dotenv').config();
require('./database/connect')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes')

app.use(express.json());

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Node API for JSONPlaceholder',
      version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/swagger.routes.js'],
};

const swaggerDocument = swaggerJSDoc(options);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`port number is ${process.env.PORT}`);
});

