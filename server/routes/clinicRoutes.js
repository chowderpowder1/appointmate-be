import express from 'express';
import { getServices, getTherapists, getPatients,getPatientData, getUserPersonalData } from '../controllers/clinicController.js'

const router = express.Router();

router.get('/getServices', getServices);

router.get('/getTherapists', getTherapists);

router.get('/getPatients', getPatients)

router.get(`/getPatientData`, getPatientData)

router.get(`/getUserPersonalData`, getUserPersonalData)

export default router;