const express = require('express');
const router = express.Router();
const PatientController = require('../../controllers/patientController');

router.get('/', PatientController.getAllPatients); // works
router.post('/create', PatientController.createPatient); // works
router.get('/:patientID', PatientController.getPatientByID); // works
router.post('/update/:patientID', PatientController.updatePatient); // works
router.post('/delete/:patientID', PatientController.deletePatient); // works
router.post('/addPost/:patientID', PatientController.addPost);


module.exports = router;
