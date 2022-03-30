const winston = require("winston")
const expressWinston = require("express-winston")
const config = require("../config/config")

const httpLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: `./logs/http/http-${config.env}.log` })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    expressFormat: true
})

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: `./logs/http/http-${config.env}.log` })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    expressFormat: true
})

module.exports = {
    httpLogger,
    errorLogger
}