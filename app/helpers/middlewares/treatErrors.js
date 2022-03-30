const AppError = require("../../errors/AppError")
const logger = require("../../../logs/logger")

module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        logger.error(err.message)

        return res.status(err.statusCode).json(err.message)
    }

    logger.error({
        status: "Error",
        message: `Internal server error: ${err.stack}`,
    })
    return res.status(500).json({
        status: "Error",
        message: `Internal server error: ${err.stack}`,
    })
}