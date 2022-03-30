const { format, createLogger, transports } = require("winston")
const { combine, timestamp, printf, errors, json } = format
const config = require('../config/config')

const logFormat = printf(({level, message, timestamp, stack}) => {
    return JSON.stringify({
        timestamp,
        level,
        message: stack || message
    })
})

const logger = createLogger({
    format: combine(
        timestamp(),
        errors({ stack: true }),
        logFormat,    
    ),
    level: "debug",
    transports: [
        new transports.File({ filename: `./logs/app/app-${config.env}.log` })
    ]
})

module.exports=logger