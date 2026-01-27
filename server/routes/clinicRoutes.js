import express from 'express';
import { getTherapistAssignedDocuments, getPatientDocumentSignedUrl, getApptDocuments, getApptDetailsOverview, getAllUpcomingAppts, bookAppointmentForPatient, updateDocumentStatus, getServices, getTherapists, getPatients,getPatientData, getUserPersonalData, patchInitialEval, getPatientEval, getPatientDocumentsList, getPatientsPendingAppointments, patchRescheduleAppt } from '../controllers/clinicController.js'

const router = express.Router();

router.get('/getServices', getServices);

router.get('/getTherapists', getTherapists);

router.get('/getPatients', getPatients)

router.get(`/getPatientData`, getPatientData)

router.get(`/getUserPersonalData`, getUserPersonalData)

router.patch(`/patchInitialEval/:id`, patchInitialEval)

router.get(`/getPatientEval`, getPatientEval)

router.get(`/getPatientDocumentsList`, getPatientDocumentsList)

router.get(`/getPatientsPendingAppointments/:id`, getPatientsPendingAppointments)

router.get(`/getAllUpcomingAppts`, getAllUpcomingAppts)

router.get(`/getApptDetailsOverview/:id`, getApptDetailsOverview)

router.get(`/getApptDocuments/:id`, getApptDocuments)

router.get(`/getPatientDocumentSignedUrl`, getPatientDocumentSignedUrl)

router.get(`/getTherapistAssignedDocuments`, getTherapistAssignedDocuments)

router.post(`/bookAppointmentForPatient`, bookAppointmentForPatient)

router.patch(`/updateDocumentStatus/:id`, updateDocumentStatus)

router.patch(`/patchRescheduleAppt/`, patchRescheduleAppt)

export default router;