const mongoose = require("mongoose")

const { Schema } = mongoose

const CidadeSchema = new Schema({
    _id: String,
    nome: String,
    estado: String
}, {
    timestamp: true
})

const CidadeModel = mongoose.model('Cidade', CidadeSchema)

module.exports=CidadeModel