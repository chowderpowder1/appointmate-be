import express from 'express';
import multer from 'multer';
import { updateSession, getPatientSessions, getPatientSessionsIds,getSessionData, updateApptSession } from '../controllers/sessionController.js'
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post('/updateSession', upload.single('file'), updateSession);
router.get('/getSessionData/:sessionId', getSessionData);
router.get('/getPatientSessionsIds', getPatientSessionsIds);
// router.get('/getSessionData/:sessionId', getSessionData);
router.get('/getPatientSessions/:patientId', getPatientSessions);
router.patch('/updateApptSession', updateApptSession);

export default router