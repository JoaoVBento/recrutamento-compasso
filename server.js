const app = require("./app/app")

const config = require("./config/config")

const db = require("./config/db")

const logger = require("./logs/logger")

db.on("connected", () => {
    app.listen(config.server.port, config.server.hostname, () => {
        logger.info(`App listening on ${config.server.hostname} port: ${config.server.port}`)
        app.emit("appStarted")
    })
})