import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/adminController.js'

const router = express.Router();

router.post('/createEmployee', createEmployee)

router.get('/getAllEmployees', getAllEmployees)

export default router;