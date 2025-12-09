import express from 'express';
import {submitUserData, getUserData, getMyAppointments, updateUserData} from '../controllers/userController.js'

const router = express.Router();

router.post('/submit', submitUserData);

router.get('/pxData', getUserData)

router.get('/getMyAppointments', getMyAppointments)

router.patch('/updateUserData', updateUserData)

export default router;