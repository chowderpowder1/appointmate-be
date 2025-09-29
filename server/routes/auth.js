import express from 'express';
import cors from 'cors'; // Cross origin resource sharing
import {signup, login, again} from '../controllers/auth.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login)

router.get('/again', again)
export default router;