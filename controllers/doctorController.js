const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://shashgk23:1rr15FYFFhEQkc7t@cluster0.jusxwrs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function createDoctor(req, res) {
    
    await client.connect();
    console.log(req.body)
    
    /*req = {
        "firstName": "s",
        "lastName": "g"
    }*/

    const result = await client.db("Users").collection("Doctors").insertOne(req.body);
    console.log(`New Doctor Added with following id: ${result.insertedId}`);
    res.json(result)
    

    await client.close();
}

async function getAllDoctors(req, res) {

    await client.connect();

    const Doctors = await client.db("Users").collection("Doctors").find({}).toArray();
    res.json(Doctors);

    await client.close();
}

async function getDoctorByID(req, res) {

    await client.connect();

    const DoctorID = parseInt(req.params.DoctorID);
    const Doctor = await client.db("Users").collection("Doctors").findOne({ DoctorID });

    if (Doctor) {
        res.json(Doctor);
    } else {
        res.status(404).json({ msg: `Doctor with ID ${DoctorID} not found` });
    }

    await client.close();
}

async function updateDoctor(req, res) {

    await client.connect();

    const DoctorID = parseInt(req.params.DoctorID);
    const updatedDoctor = req.body;

    const result = await client.db("Users").collection("Doctors").updateOne(
        { DoctorID },
        { $set: updatedDoctor }
    );

    if (result.matchedCount > 0) {
        res.json({ msg: `${result.modifiedCount} Doctor(s) updated` });
    } else {
        res.status(404).json({ msg: `Doctor with ID ${DoctorID} not found` });
    }

    await client.close();
}

async function deleteDoctor(req, res) {

    await client.connect();

    const DoctorID = parseInt(req.params.DoctorID);

    const result = await client.db("Users").collection("Doctors").deleteOne({ DoctorID });

    if (result.deletedCount > 0) {
        res.json({ msg: `${result.deletedCount} Doctor(s) deleted` });
    } else {
        res.status(404).json({ msg: `Doctor with ID ${DoctorID} not found` });
    }

    await client.close();
}

module.exports = {createDoctor, getAllDoctors, getDoctorByID, updateDoctor, deleteDoctor};


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