// uuid and isUuidfunction import - used to create an uuid and to check if the uuid passed is valid
const { uuid, isUuid } = require("uuidv4")


class Cliente {
    constructor(props, id) {
        // Assing props passed as parameters to the object
        Object.assign(this, props)

        // Check if an id was passed and if is a valid uuid or else it creates a new uuid
        this._id = !id || !isUuid(id) ? uuid() : id
    }
}

module.exports = Cliente