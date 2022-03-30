process.env.NODE_ENV = "test"

const { uuid } = require("uuidv4")

const request = require("supertest")
const app = require("../app/app")

const db = require("../config/db")
const Clientes = require("../app/database/models/Clientes")
const Cidades = require("../app/database/models/Cidades")
const Cidade = require("../app/database/entities/CidadeEntity")

beforeAll((done) => {
    // authenticate and get token
    db.on("connected", () => {
        done()        
    })

})

afterAll((done) => {
    db.close(() => done())
})


describe("Clientes - basic positive tests", () => {
    let cidadeNome, clienteId, clienteNome

    beforeAll((done) => {

        request(app).post("/cidades").send({
            nome: "São Caetano do Sul",
            estado: "São Paulo"
        }).then(result => {
            cidadeNome = result.body.nome

            done()  
        })
 
    })

    afterAll((done) => {
        Cidades.deleteMany().then(result => {

            Clientes.deleteMany().then(result => done())
        })
    })

    it("Should be able to create a cliente", async () => {
        const cidade = await request(app).get(`/cidades/${cidadeNome}`)

        const cidadeId = cidade.body[0]._id

        const data = {
            "nome": "João Silva",
            "sexo": "masculino",
            "dataNascimento": "10-17-2003",
            "idade": 18,
            "cidade": cidadeId
        }

        const response = await request(app).post("/clientes").send(data)

        expect(response.status).toBe(201)
        expect(response.body.cidade).toBe(cidadeId)

        clienteId = response.body._id
        clienteNome = response.body.nome
    })

    it("Should be able to get cliente by name", async () => {
        const response = await request(app).get(`/clientes/nome/${clienteNome}`)

        expect(response.status).toBe(200)
        expect(response.body[0].nome).toBe(clienteNome)
    })

    it("Should be able to get cliente by id", async () => {
        const response = await request(app).get(`/clientes/${clienteId}`)

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(clienteId)
    })

    it("Should be able to update cliente's name", async () => {

        const data = {
            nome: "Miguel Carrero Fantini"
        }

        const response = await request(app).put(`/clientes/${clienteId}`).send(data)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe(data.nome)

    })

    it("Should be able to delete a cliente", async () => {

        const response = await request(app).delete(`/clientes/${clienteId}`)

        expect(response.status).toBe(204)

    })
})

describe("Clientes - negative tests with valid input", () => {
    let cidadeNome, clienteId, clienteNome

    beforeAll((done) => {

        request(app).post("/cidades").send({
            nome: "São Caetano do Sul",
            estado: "São Paulo"
        }).then(result => {
            cidadeNome = result.body.nome

            done()  
        })
 
    })

    afterAll((done) => {
        Cidades.deleteMany().then(result => {

            Clientes.deleteMany().then(result => done())
        })
    })

    it("Should not be able to create cliente with repeated name", async () => {

        const cidade = await request(app).get(`/cidades/${cidadeNome}`)

        const cidadeId = cidade.body[0]._id
        
        const data = {
            "nome": "João Silva",
            "sexo": "masculino",
            "dataNascimento": "10-17-2003",
            "idade": 18,
            "cidade": cidadeId
        }

        const response_1 = await request(app).post("/clientes").send(data)

        expect(response_1.status).toBe(201)

        const response_2 = await request(app).post("/clientes").send(data)

        expect(response_2.status).toBe(403)
    })
})