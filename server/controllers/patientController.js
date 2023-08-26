const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function createPatient(req, res) {
    
    await client.connect()
    console.log(req.body)

    const result = await client.db("Users").collection("Patients").insertOne(req.body)
    console.log(`New Patient Added with following id: ${result.insertedId}`)
    res.json(result)
    
    await client.close()
}

async function getAllPatients(req, res) {

    await client.connect()

    const patients = await client.db("Users").collection("Patients").find({}).toArray()
    res.json(patients)

    await client.close()
}

async function getPatientByID(req, res) {

    await client.connect()

    const patientID = parseInt(req.params.patientID)
    const patient = await client.db("Users").collection("Patients").findOne({ patientID })

    if (patient) {
        res.json(patient)
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` })
    }

    await client.close()
}

/*
async function getPatientByID(req, res) {
    try {
        await client.connect();

        const patientID = parseInt(req.params.patientID);
        const patient = await client.db("Users").collection("Patients").findOne({ patientID });

        if (patient) {
            
            const doctors = await Promise.all(patient.doctors.map(async doctorID => {
                const doctor = await client.db("Users").collection("Doctors").findOne({ doctorID });
                return `${doctor.firstName} ${doctor.lastName}`; 
            }));
            patient.doctors = doctors;

            res.json(patient);
        } else {
            res.status(404).json({ msg: `Patient with ID ${patientID} not found` });
        }
    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` });
    } finally {
        await client.close();
    }
}
*/


async function updatePatient(req, res) {

    await client.connect()

    const patientID = parseInt(req.params.patientID)
    const updatedPatient = req.body

    const result = await client.db("Users").collection("Patients").updateOne(
        { patientID },
        { $set: updatedPatient }
    )

    if (result.matchedCount > 0) {
        res.json({ msg: `${result.modifiedCount} patient(s) updated` })
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` })
    }

    await client.close()
}

async function deletePatient(req, res) {

    await client.connect()

    const patientID = parseInt(req.params.patientID)

    const result = await client.db("Users").collection("Patients").deleteOne({ patientID })

    if (result.deletedCount > 0) {
        res.json({ msg: `${result.deletedCount} patient(s) deleted` })
    } else {
        res.status(404).json({ msg: `Patient with ID ${patientID} not found` })
    }

    await client.close()
}

async function addPost(req, res) {
    try {
        await client.connect();

        const patientID = parseInt(req.params.patientID);
        const newPost = req.body;

        newPost.timestamp = new Date();
        newPost.postID = generateUniqueID(); // Generate a unique post ID

        const result = await client.db("Users").collection("Patients").updateOne(
            { patientID },
            { $push: { posts: newPost } }
        );

        if (result.matchedCount > 0) {
            res.json({ msg: `New post added to patient ${patientID}`, newPost });
        } else {
            res.status(404).json({ msg: `Patient ${patientID} not found` });
        }
    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` });
    } finally {
        await client.close();
    }
}



function generateUniqueID() {
    // Generate a unique ID here, you can use libraries like 'uuid' or 'shortid'
    // Example using 'uuid':
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
}


async function deletePost(req, res) {
    try {
        await client.connect();

        const patientID = parseInt(req.params.patientID);
        const postIndex = parseInt(req.params.postIndex);

        const result = await client.db("Users").collection("Patients").updateOne(
            { patientID },
            { $pull: { posts: { timestamp: patient.posts[postIndex].timestamp } } }
        );

        if (result.matchedCount > 0) {
            res.json({ msg: `Post deleted from patient ${patientID}` });
        } else {
            res.status(404).json({ msg: `Patient ${patientID} not found` });
        }
    } catch (error) {
        res.status(500).json({ msg: `Error: ${error.message}` });
    } finally {
        await client.close();
    }
}


module.exports = { createPatient, getAllPatients, getPatientByID, updatePatient, deletePatient, addPost };



/*

{
    "firstName": "UpdatedShashwat",
    "lastName": "UpdatedGhevde",
    "email": "updated.shashgk23@gmail.com",
    "password": "newpassword456",
    "profilePic": "updated3000.jpg",
    "doctors": [1000, 1002], // Updated doctors array
    "posts": [
        {
            "text": "Feeling even better now!",
            "mood": 3 
        },
        {
            "text": "Excited about progress!",
            "mood": 4 
        }
    ],
    "doctorsNotes": [
        {
            "text": "Impressive improvements!"
        }
    ]
}



*/