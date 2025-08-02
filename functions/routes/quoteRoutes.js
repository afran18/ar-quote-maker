import express from 'express';
import { addQuote, } from '../controllers/quoteController.js';

const router = express.Router();

router.post('/addQuote', addQuote);

export default router;
