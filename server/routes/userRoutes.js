import express from 'express';
import {submitUserData, getUserData, getMyAppointments} from '../controllers/userController.js'

const router = express.Router();

router.post('/submit', submitUserData);

router.get('/pxData', getUserData)

router.get('/getMyAppointments', getMyAppointments)
export default router;