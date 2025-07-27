import express from 'express';
import { getAllQuotes, addQuote, deleteQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.get('/', getAllQuotes);

router.post('/', addQuote);

router.delete('/:id', deleteQuote);

export default router;
