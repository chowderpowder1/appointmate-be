import express from 'express';
import cors from 'cors'; // Cross origin resource sharing
import {signup, login, session, logout, createOtp, receiveOtp} from '../controllers/auth.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login)

router.post('/logout', logout)

router.get('/session', session)

router.post('/otp', createOtp)

router.post('/receiveOtp', receiveOtp)
export default router;