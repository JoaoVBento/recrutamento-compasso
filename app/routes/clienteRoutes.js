const router = require("express").Router()

const ClienteController = require("../controllers/ClienteController")

router.get("/clientes/nome/:nome", ClienteController.getClienteByNome)
router.get("/clientes/:id", ClienteController.getClienteById)
router.post("/clientes", ClienteController.createCliente)
router.put("/clientes/:id", ClienteController.updateClienteName)
router.delete("/clientes/:id", ClienteController.removeCliente)

module.exports = router