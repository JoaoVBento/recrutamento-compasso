const clienteRoutes = require("./clienteRoutes")
const cidadeRoutes = require("./cidadeRoutes")

module.exports = app => {
    app.use(
        cidadeRoutes,
        clienteRoutes
    )
}