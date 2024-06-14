const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5150
const { serverPassword } = require("./config")

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://FreshinS:${serverPassword}@cluster0.rxv9znl.mongodb.net/?retryWrites=true&w=majority&appName=cluster0`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))       
    } catch (e) {
        console.log(e)
    }
}

start();
