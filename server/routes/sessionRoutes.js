import express from 'express';
import { getMySessions } from '../controllers/sessionController.js'

const router = express.Router();

router.get('/getMySessions', getMySessions)