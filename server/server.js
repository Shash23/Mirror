const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const app = express()

const PORT = 8000

app.use(cors());
app.use(morgan('dev')) // debug messages, need to learn how to use
app.use(bodyParser.json()) // incoming info is always json

const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

const patientsRoutes = require("./routes/api/patientRoutes")
const doctorRoutes = require("./routes/api/doctorRoutes")
const authRoutes = require("./routes/api/authRoutes")

app.use('/api/patients', patientsRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/auth', authRoutes)


app.listen(PORT, async () => {
    try {
        await client.connect()
        console.log(`connected to mongo`)
    } catch (error) {
        console.error(`error: ${error}`)
    }
    console.log(`server on port: ${PORT}`)
})

