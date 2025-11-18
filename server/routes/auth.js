import express from 'express';
import cors from 'cors'; // Cross origin resource sharing
import {signup, login, session, logout} from '../controllers/auth.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login)

router.post('/logout', logout)

router.get('/session', session)

export default router;