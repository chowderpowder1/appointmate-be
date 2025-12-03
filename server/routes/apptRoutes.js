import express from 'express';
import { getBookedDates, bookAppointment, getApptOverview, getAllApptData, updateApptStatus, getPatientsList } from '../controllers/apptController.js'

const router = express.Router();

router.get('/getBookedDates', getBookedDates);

router.post('/bookAppointment', bookAppointment)

router.get('/getApptOverview', getApptOverview)

router.get('/getAllApptData', getAllApptData)

router.put('/updateApptStatus', updateApptStatus)

router.get('/getPatientsList', getPatientsList)

export default router;