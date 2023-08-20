const express = require('express');
const router = express.Router();
const DoctorController = require('../../controllers/doctorController');

router.get('/', DoctorController.getAllDoctors); // works
router.post('/create', DoctorController.createDoctor); // circular reference
router.get('/:doctorID', DoctorController.getDoctorByID); // works
router.post('/update/:doctorID', DoctorController.updateDoctor); // works
router.post('/delete/:doctorID', DoctorController.deleteDoctor); // works

module.exports = router;
