import express from 'express';
import { contactRules, validate, contactController } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', contactRules, validate, contactController);

export default router;
