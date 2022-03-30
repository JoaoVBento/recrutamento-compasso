// config
const config = require('../config/config');

const swaggerAutogen = require('swagger-autogen')({ language: "pt-BR", openapi: "3.0.0" })

const outputFile = './documentation/swagger_output.json'
const endpointsFiles = [
    './app/routes/cidadeRoutes.js',
    './app/routes/clienteRoutes.js'
]

const doc = {
    info: {
        version: "1.0.0",
        title: "CompassAPI",
        description: "Documentação de rotas e requisições para a API do CompassAPI."
    },
    host: config.env == "production" ? `${config.server.url}` : `${config.server.hostname}:${config.server.port}`,
    basePath: "/",
    sorter: "method",
    operationsSorter : "method", 
    schemes: config.env == "production" ? ['https'] : ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        clientePOST: {
            "nome": "string",
            "sexo": "string",
            "dataNascimento": "date",
            "idade": "int",
            "cidade": "uuid"
        },

        clientePUT: {
            "nome": "string"
        },

        cidadePOST: {
            "nome": "string",
            "estado": "string"
        }

    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js")
})
