const ClienteService = require("../services/ClienteService")
const CidadeService = require("../services/CidadeService")

const AppError = require("../errors/AppError")
const Cliente = require("../database/entities/ClienteEntity")

const { clientePOST, clientePUT } = require("../helpers/validators/yupValidator")

// isUuid function import - used to deal with id validation
const { isUuid } = require("uuidv4")

class ClienteController {

    static async createCliente(req, res, next) {

        /*

        #swagger.tags = ['Clientes']
        #swagger.description = '<h3><b>Salva um cliente na base de dados.</b></h3>'

        #swagger.responses[201] = { description: "Cliente criada." }
        #swagger.responses[422] = { description: "Payload inválido." }
        #swagger.responses[403] = { description: "Cliente com nome repetido." }
        #swagger.responses[500] = { description: "Erro interno." }

        #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/definitions/clientePOST" }
                    }
                }
        }
        */

        const body = req.body

        try {
            await clientePOST.validate(body, { strict: true, abortEarly: false })
        } catch(err) {
            throw new AppError({ error: "Invalid payload", message: err.message }, 422)
        }

        const cliente = new Cliente(body)

        const cidadeExists = await CidadeService.getById(cliente.cidade)

        if(!cidadeExists) {
            throw new AppError({ error: "Operation not accepted", message: "Cidade with the specified id was not found" }, 404)
        }

        const clienteExists = await ClienteService.getAll({ nome: cliente.nome })

        if(clienteExists.length != 0) {
            throw new AppError({ error: "Invalid operation", message: "There is already a Cliente with this name in the database" }, 403)
        }

        try {
            const response = await ClienteService.create(cliente)

            return res.status(201).json(response)
        } catch(err) {
            throw new AppError({ error: "Operation not accepted", message: err.message }, 500)
        }

    }

    static async getClienteByNome(req, res, next) {

        /*
        #swagger.tags = ['Clientes']
        #swagger.description = '<h3><b>Retorna um cliente que corresponda ao nome passado.</b></h3>'

        #swagger.responses[200] = { description: "Cliente encontrado." }
        #swagger.responses[404] = { description: "Nenhum Cliente corresponde ao nome passado." }
        */

        const { nome } = req.params

        const response = await ClienteService.getAll({ nome })

        if(response.length === 0) {
            throw new AppError({ error: "Operation not accepted", message: "Cliente with the specified name was not found" }, 404)
        }

        return res.status(200).json(response)
        
    }

    static async getClienteById(req, res, next) {

        /*
        #swagger.tags = ['Clientes']
        #swagger.description = '<h3><b>Retorna um cliente que corresponda ao id passado.</b></h3>'

        #swagger.responses[200] = { description: "Cliente encontrado." }
        #swagger.responses[422] = { description: "Id passado não é um uuid válido." }
        #swagger.responses[404] = { description: "Nenhum Cliente corresponde ao id passado." }
        */

        const { id } = req.params
        if(!isUuid(id)) throw new AppError({ error: "Invalid payload", message: "ID passed as parameter is not a valid uuid" }, 422)

        const response = await ClienteService.getById(id)

        if(!response) {
            throw new AppError({ error: "Operation not accepted", message: "Cliente with the specified id was not found" }, 404)
        }

        return res.status(200).json(response)

    }

    static async updateClienteName(req, res, next) {

        /*
        #swagger.tags = ['Clientes']
        #swagger.description = '<h3><b>Atualiza o nome de um cliente que corresponda ao id passado.</b></h3>'

        #swagger.responses[200] = { description: "Cliente atualizado." }
        #swagger.responses[422] = { description: "id e/ou payload inválido." }
        #swagger.responses[404] = { description: "Nenhum cliente corresponde ao id passado." }

        #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/definitions/clientePUT" }
                    }
                }
        }
        */

        const { id } = req.params
        if(!isUuid(id)) throw new AppError({ error: "Invalid payload", message: "ID passed as parameter is not a valid uuid" }, 422)

        const body = req.body

        try {
            await clientePUT.validate(body, { strict: true, abortEarly: false })
        } catch(err) {
            throw new AppError({ error: "Invalid payload", message: err.message }, 422)
        }

        const exists = await ClienteService.getAll({ nome: body.nome })

        if(exists.length != 0) {
            throw new AppError({ error: "Invalid operation", message: "There is already a Cliente with this name in the database" }, 403)
        }

        const clienteItself = await ClienteService.getById(id)

        if(!clienteItself) {
            throw new AppError({ error: "Operation not accepted", message: "Cliente with the specified id was not found" }, 404)  
        }

        const cliente = new Cliente(body, clienteItself._id)

        const updatedCliente = await ClienteService.updateById(cliente, id)

        return res.status(200).json(updatedCliente)

    }

    static async removeCliente(req, res, next) {

        /*
        #swagger.tags = ['Clientes']
        #swagger.description = '<h3><b>Deleta um cliente da base de dados.</b></h3>'

        #swagger.responses[204] = { description: "Cliente deletada." }
        #swagger.responses[422] = { description: "id passado não é um uuid válido." }
        #swagger.responses[404] = { description: "Nenhum cliente corresponde ao id passado." }
        */

        const { id } = req.params
        if(!isUuid(id)) throw new AppError({ error: "Invalid payload", message: "ID passed as parameter is not a valid uuid" }, 422)

        const deletedCliente = await ClienteService.deleteById(id)

        if(!deletedCliente) {
            throw new AppError({ error: "Operation not accepted", message: "Cliente with the specified id was not found" }, 404)
        }

        return res.status(204).end()

    }
}

module.exports = ClienteController