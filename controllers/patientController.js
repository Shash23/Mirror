const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function createPatient(newPatient) {
    
    await client.connect();

    const result = await client.db("Users").collection("Patients").insertOne(newPatient);
    console.log(`New Patient Added with following id: ${result.insertedId}`);

    await client.close();
}

async function getAllPatients(req, res) {
    await client.connect();

    const patients = await client.db("Users").collection("Patients").find({}).toArray();
    res.json(patients);

    await client.close();
}

async function getPatientByID(req, res) {
    await client.connect();

    const patientID = parseInt(req.params.patientID);
    const patient = await client.db("Users").collection("Patients").findOne({ patientID });

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` });
    }

    await client.close();
}

async function updatePatient(req, res) {
    await client.connect();

    const patientID = parseInt(req.params.patientID);
    const updatedPatient = req.body;

    const result = await client.db("Users").collection("Patients").updateOne(
        { patientID },
        { $set: updatedPatient }
    );

    if (result.matchedCount > 0) {
        res.json({ msg: `${result.modifiedCount} patient(s) updated` });
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` });
    }

    await client.close();
}

async function deletePatient(req, res) {
    await client.connect();

    const patientID = parseInt(req.params.patientID);

    const result = await client.db("Users").collection("Patients").deleteOne({ patientID });

    if (result.deletedCount > 0) {
        res.json({ msg: `${result.deletedCount} patient(s) deleted` });
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` });
    }

    await client.close();
}

module.exports = {createPatient, getAllPatients, getPatientByID, updatePatient, deletePatient};
