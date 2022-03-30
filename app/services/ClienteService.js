const Cliente = require("../database/models/Clientes")

const MongoService = require("./MongoService")

class ClienteService extends MongoService {

    constructor() {
        super(Cliente)
    }
}

module.exports = new ClienteService