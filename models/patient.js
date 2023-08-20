const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    doctors: {
        type: Array,
        default: [],
    },
    patientID: {
        type: Number,
        default: 0,
    },
    posts: {
        type: Array,
        default: [],
    },
    doctorsNotes: {
        type: Array,
        default: []
    }

}, {timestamps: true})

const Patient = mongoose.model("Patient", PatientSchema)

module.exports = Patient;