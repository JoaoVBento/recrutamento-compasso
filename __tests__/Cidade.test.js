process.env.NODE_ENV = "test"

const { uuid } = require("uuidv4")

const request = require("supertest")
const app = require("../app/app")

const db = require("../config/db")
const Cidades = require("../app/database/models/Cidades")

beforeAll((done) => {
    // authenticate and get token
    db.on("connected", () => {
        done()        
    })

})

afterAll((done) => {
    db.close(() => done())
})

describe("Cidades - basic positive tests", () => {

    afterAll((done) => {
        Cidades.deleteMany().then(result => done())
    })

    it("Should be able to create a cidade", async () => {
        const data = {
            nome: "São Caetano do Sul",
            estado: "São Paulo"
        }

        const response = await request(app).post("/cidades").send(data)

        expect(response.status).toBe(201)
    })

    it("Should be able to get cidade by nome", async () => {
        const response = await request(app).get("/cidades/São Caetano do Sul")

        expect(response.status).toBe(200)
        expect(response.body[0].nome).toBe("São Caetano do Sul")
    })

    it("Should be able to get cidade by estado", async () => {
        const response = await request(app).get("/cidades/estados/São Paulo")

        expect(response.status).toBe(200)
        expect(response.body[0].estado).toBe("São Paulo")
    })
})

describe("Cidades - negative tests with valid input", () => {

    afterAll((done) => {
        Cidades.deleteMany().then(result => done())
    })

    it("Shouldn't be able to create repeated cidade", async () => {

        const data = {
            nome: "São Caetano do Sul",
            estado: "São Paulo"
        }

        const response_1 = await request(app).post("/cidades").send(data)
        expect(response_1.status).toBe(201)

        const response_2 = await request(app).post("/cidades").send(data)
        expect(response_2.status).toBe(403)

    })

})