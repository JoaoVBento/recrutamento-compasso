const CidadeService = require("../services/CidadeService")
const AppError = require("../errors/AppError")
const Cidade = require("../database/entities/CidadeEntity")

const { cidadePOST } = require("../helpers/validators/yupValidator")


class CidadeController {

    static async createCidade(req, res, next) {

        /*
        #swagger.tags = ['Cidades']
        #swagger.description = '<h3><b>Salva uma cidade na base de dados.</b></h3>'

        #swagger.responses[201] = { description: "Cidade criada." }
        #swagger.responses[422] = { description: "Payload inválido." }
        #swagger.responses[403] = { description: "Cidade com nome e estado repetidos." }
        #swagger.responses[500] = { description: "Erro interno." }

        #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/definitions/cidadePOST" }
                    }
                }
        }
        */

        const body = req.body

        try {
            await cidadePOST.validate(body, { strict: true, abortEarly: false })
        } catch(err) {
            throw new AppError({ error: "Invalid payload", message: err.message }, 422)
        }

        const cidade = new Cidade(body)

        const exists = await CidadeService.getAll({ nome: cidade.nome, estado: cidade.estado })

        if(exists.length != 0) {
            throw new AppError({ error: "Invalid operation", message: "There is already a Cidade with the same nome and estado in the database" }, 403)
        }

        try {
            const response = await CidadeService.create(cidade)

            return res.status(201).json(response)
        } catch(err) {
            throw new AppError({ error: "Operation not accepted", message: err.message }, 500)
        }
    }

    static async getCidadeByNome(req, res, next) {

        /*
        #swagger.tags = ['Cidades']
        #swagger.description = '<h3><b>Retorna as cidades que correspondam ao nome passado.</b></h3>'

        #swagger.responses[200] = { description: "Cidade encontrada." }
        #swagger.responses[404] = { description: "Nenhuma cidade corresponde ao nome passado." }
        */

        const { nome } = req.params

        const response = await CidadeService.getAll({ nome })

        if(response.length === 0) {
            throw new AppError({ error: "Operation not accepted", message: "Cidade with the specified name was not found" }, 404)
        }

        return res.status(200).json(response)

    }

    static async getCidadeByEstado(req, res, next) {
        /*
        #swagger.tags = ['Cidades']
        #swagger.description = '<h3><b>Retorna as cidades que correspondam ao estado passado.</b></h3>'

        #swagger.responses[200] = { description: "Cidade encontrada." }
        #swagger.responses[404] = { description: "Nenhuma cidade corresponde ao estado passado." }
        */

        const { estado } = req.params

        const response = await CidadeService.getAll({ estado })

        if(response.length === 0) {
            throw new AppError({ error: "Operation not accepted", message: "Cidade with the specified estado was not found" }, 404)
        }

        return res.status(200).json(response)
    }

}

module.exports = CidadeController