require("dotenv").config()

const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res, next) => {
    return res.send("hello")
})

module.exports = app