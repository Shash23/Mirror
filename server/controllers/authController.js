const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function register(req, res) {
    try {
        await client.connect()

        const { firstName, lastName, email, password } = req.body

        
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await client.db("Users").collection("Patients").insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword, 
            doctors: [],
            patientID: 0,
            posts: [],
            doctorsNotes: []
        })

        res.status(201).json({ msg: 'reg successful' })
    } catch (error) {
        res.status(500).json({ msg: `error: ${error.message}` })
    } finally {
        await client.close()
    }
}

async function login(req, res) {
    try {
        await client.connect()

        const { email, password } = req.body

        const patient = await client.db("Users").collection("Patients").findOne({ email })

        if (!patient) {
            return res.status(404).json({ msg: 'patient not found' })
        }

        const passwordMatch = await bcrypt.compare(password, patient.password)

        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' })
        }
        
        const token = jwt.sign({ email: patient.email }, 'secret_key')
        res.json({ token })

    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` })
    } finally {
        await client.close()
    }
}

module.exports = { register, login }
