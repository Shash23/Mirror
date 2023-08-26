

const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)


async function createDoctor(req, res) {
    
    await client.connect()
    console.log(req.body)
    
    /*req = {
        "firstName": "s",
        "lastName": "g"
    }*/

    const result = await client.db("Users").collection("Doctors").insertOne(req.body)
    console.log(`New Doctor Added with following id: ${result.insertedId}`)
    res.json(result)
    

    await client.close()
}

async function getAllDoctors(req, res) {

    await client.connect()

    const Doctors = await client.db("Users").collection("Doctors").find({}).toArray()
    res.json(Doctors)

    await client.close()
}

async function getDoctorByID(req, res) {

    await client.connect()

    const doctorID = parseInt(req.params.doctorID)
    const doctor = await client.db("Users").collection("Doctors").findOne({ doctorID })

    if (doctor) {
        res.json(doctor)
    } else {
        res.status(404).json({ msg: `Doctor with ID ${doctorID} not found` })
    }

    await client.close()
}


async function updateDoctor(req, res) {

    await client.connect()

    const DoctorID = parseInt(req.params.DoctorID)
    const updatedDoctor = req.body

    const result = await client.db("Users").collection("Doctors").updateOne(
        { DoctorID },
        { $set: updatedDoctor }
    )

    if (result.matchedCount > 0) {
        res.json({ msg: `${result.modifiedCount} Doctor(s) updated` })
    } else {
        res.status(404).json({ msg: `Doctor with ID ${DoctorID} not found` })
    }

    await client.close()
}

async function deleteDoctor(req, res) {

    await client.connect()

    const DoctorID = parseInt(req.params.doctorID)
    console.log(DoctorID)

    const result = await client.db("Users").collection("Doctors").deleteOne({ DoctorID })

    if (result.deletedCount > 0) {
        res.json({ msg: `${result.deletedCount} Doctor(s) deleted` })
    } else {
        res.status(404).json({ msg: `Doctor with ID ${DoctorID} not found` })
    }

    await client.close()
}

async function getPatientPosts(req, res) {
    try {
        await client.connect()
        
        const doctorID = parseInt(req.params.doctorID)
        const patientID = parseInt(req.params.patientID)

        // You should add logic here to check if the doctor is allowed to access the patient's posts
        // For example, check if the patient is assigned to the doctor

        const patient = await client.db("Users").collection("Patients").findOne({ patientID })

        if (!patient) {
            res.status(404).json({ msg: `Patient with ID ${patientID} not found` })
            return
        }

        res.json(patient.posts || [])
    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` })
    } finally {
        await client.close()
    }
}

async function getPatientsByDoctorID(req, res) {
    try {
        await client.connect()

        const doctorID = parseInt(req.params.doctorID)

        const doctor = await client.db("Users").collection("Doctors").findOne({ doctorID })

        if (!doctor) {
            res.status(404).json({ msg: `Doctor with ID ${doctorID} not found` })
            return
        }

        const patientIDs = doctor.patientIDs.map(patientID => parseInt(patientID))

        const patients = await client.db("Users").collection("Patients").find({ patientID: { $in: patientIDs } }).toArray()

        res.json(patients)
    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` })
    } finally {
        await client.close()
    }
}



module.exports = {createDoctor, getAllDoctors, getDoctorByID, updateDoctor, deleteDoctor, getPatientPosts, getPatientsByDoctorID}

