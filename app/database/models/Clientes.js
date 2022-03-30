const mongoose = require("mongoose")
const DateOnly = require("mongoose-dateonly")(mongoose)

const { Schema } = mongoose

const ClienteSchema = new Schema({
    _id: String,
    nome: String,
    sexo: String,
    dataNascimento: DateOnly,
    idade: Number,
    cidade: {
        type: String,
        ref: "Cidade"
    }
}, {
    timestamps: true
})

const ClienteModel = mongoose.model('Cliente', ClienteSchema)

module.exports=ClienteModel