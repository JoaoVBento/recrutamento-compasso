const router = require("express").Router()

const CidadeController = require("../controllers/CidadeController")

router.get("/cidades/:nome", CidadeController.getCidadeByNome)
router.get("/cidades/estados/:estado", CidadeController.getCidadeByEstado)
router.post("/cidades", CidadeController.createCidade)

module.exports = router