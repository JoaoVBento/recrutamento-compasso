require("dotenv").config()

const express = require("express")

require("express-async-errors")

const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("../documentation/swagger_output.json")

const expressLogger = require("../logs/http_logger")

const app = express()

app.use(expressLogger.httpLogger)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require("./routes")(app)

const errorHandler = require("./helpers/middlewares/treatErrors")
app.use(errorHandler)

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app