const express = require('express');
const router = express.Router();
const DoctorController = require('../../controllers/doctorController');

router.get('/', DoctorController.getAllDoctors);
router.get('/:doctorID', DoctorController.getDoctorByID);
router.post('/create', DoctorController.createDoctor);
router.post('/update/:doctorID', DoctorController.updateDoctor);
router.post('/delete/:doctorID', DoctorController.deleteDoctor);
router.get('/:doctorID/patients', DoctorController.getPatientsByDoctorID); 

module.exports = router;
