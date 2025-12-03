import express from 'express';
import { getServices } from '../controllers/clinicController.js'

const router = express.Router();

router.get('/getServices', getServices);

export default router;