const Cidade = require("../database/models/Cidades")

const MongoService = require("./MongoService")

class CidadeService extends MongoService {

    constructor() {
        super(Cidade)
    }
}

module.exports = new CidadeService