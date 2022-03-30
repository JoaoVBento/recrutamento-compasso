const Mongoose = require("mongoose")

const config = require("./config") 

const logger = require("../logs/logger")

// Use native ES6 promises
Mongoose.promise = global.Promise
Mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}${config.database.url}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

const db = Mongoose.connection

db.on('error', () => {
    logger.info(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`)
    process.exit()
})
  
db.once('open', () => {
    logger.info('MongoDB connection with database succeeded.')
})

process.on('SIGINT', () => {
    db.close(() => {
        logger.info('MongoDB connection disconnected through app termination.')
        process.exit()
    })
})
  
module.exports = db