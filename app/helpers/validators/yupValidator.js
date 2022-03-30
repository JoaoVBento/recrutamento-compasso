const yup = require("yup")

module.exports = {
    clientePOST: yup.object().shape({
        nome: yup.string().required("O Nome completo deve ser passado no corpo da requisição.").max(50).test(
            "validateNomeCompleto",
            "Specify full name",
            function(fullName) {
                if(fullName.indexOf(" ") !== -1) return true

                return false
            }
        ),
        sexo: yup.string().required("O sexo deve ser passado no corpo da requisição.").oneOf(["masculino", "feminino"]),
        dataNascimento: yup.string().required("A data de nascimento deve ser passada no corpo da requisição."),
        idade: yup.number().required("A idade deve ser passada no corpo da requisição."),
        cidade: yup.string().required("A cidade deve ser passada no corpo da requisição.").uuid("O campo cidade deve ser um uuid.")
    }),

    clientePUT: yup.object().shape({
        nome: yup.string().required("O Nome completo deve ser passado no corpo da requisição.").max(50).test(
            "validateNomeCompleto",
            "Specify full name",
            function(fullName) {
                if(fullName.indexOf(" ") !== -1) return true

                return false
            }
        )
    }),

    cidadePOST: yup.object().shape({
        nome: yup.string().required("O nome da cidade deve ser passado no corpo da requisição.").max(30),
        estado: yup.string().required("O estado deve ser passado no corpo da requisição").max(30)
    })
}