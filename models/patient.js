const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        min: 5,
        max: 15
    },
    lastName: {
        type: String,
        required: true,
        min: 5,
        max: 15
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    profilePic: {
        type: String,
        default: "",
    },
    doctors: {
        type: Array,
        default: [],
    }

}, {timestamps: true})

const Patient = mongoose.model("Patient", PatientSchema)

module.exports = Patient;