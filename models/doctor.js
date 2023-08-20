import mongoose from "mongoose"

const DoctorSchema = new mongoose.Schema({

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
    }

}, {timestamps: true})

const Doctor = mongoose.model("Doctor", DoctorSchema)
export default Doctor