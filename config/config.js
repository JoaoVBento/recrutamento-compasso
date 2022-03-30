const env = process.env.NODE_ENV || "development"

const config = {
    development: {
        env: "development",
        server: {
            port: process.env.SERVER_PORT || 3030,
            hostname: process.env.SERVER_HOSTNAME || 'localhost',
        },
        database: {
            url: "@cluster0.usz5l.mongodb.net/recrutamento-compasso?retryWrites=true&w=majority"
        }
    },

    test: {
        env: "development",
        server: {
            port: process.env.SERVER_PORT || 3030,
            hostname: process.env.SERVER_HOSTNAME || 'localhost',
        },
        database: {
            url: "@cluster0.usz5l.mongodb.net/recrutamento-compasso-teste?retryWrites=true&w=majority"
        }
    }
}

module.exports=config[env]