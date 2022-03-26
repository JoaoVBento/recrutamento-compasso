const app = require("./app/app")

const config = require("./config/config")

const db = require("./config/db")

db.on("connected", () => {
    app.listen(config.server.port, config.server.hostname, () => {
        console.log(`App listening on ${config.server.hostname} port: ${config.server.port}`)
        app.emit("appStarted")
    })
})