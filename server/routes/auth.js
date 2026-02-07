import express from 'express';
import cors from 'cors'; // Cross origin resource sharing
import {signup, login, session, logout, createOtp, receiveOtp,forgotPassword, resetPassword, checkToken} from '../controllers/auth.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login)

router.post('/logout', logout)

router.get('/session', session)

router.post('/otp', createOtp)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

router.post('/receiveOtp', receiveOtp)

router.get('/reset-password/:token', checkToken)

export default router;