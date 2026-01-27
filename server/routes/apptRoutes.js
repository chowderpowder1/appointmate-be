import express from 'express';
import { getBookedDates, bookAppointment, getApptOverview, getAllApptData, updateApptStatus, getPatientsList, getApptDetails, patientUpdateApptStatus, getTherapistAppointments,patchRescheduleMyAppt } from '../controllers/apptController.js'

const router = express.Router();

router.get('/getBookedDates', getBookedDates);

router.post('/bookAppointment', bookAppointment)

router.get('/getApptOverview', getApptOverview)

router.get('/getAllApptData', getAllApptData)

router.get('/getApptDetails', getApptDetails)

router.put('/updateApptStatus', updateApptStatus)

router.get('/getPatientsList', getPatientsList)

router.get('/getTherapistAppointments', getTherapistAppointments)

router.patch('/patientUpdateApptStatus', patientUpdateApptStatus)

router.patch('/patchRescheduleMyAppt', patchRescheduleMyAppt)

export default router;