const mongoose = require("mongoose")

const { Schema } = mongoose

const CidadeSchema = new Schema({
    _id: String,
    nome: String,
    estado: String
}, {
    timestamps: true
})

const CidadeModel = mongoose.model('Cidade', CidadeSchema)

module.exports=CidadeModel