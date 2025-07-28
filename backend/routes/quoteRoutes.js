import express from 'express';
import { addQuote, } from '../controllers/quoteController.js';

const router = express.Router();

router.post('/add', addQuote);

export default router;
