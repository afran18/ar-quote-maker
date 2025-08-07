import express from 'express';
import { addQuote, fetchQuotesPaginate, getQuoteById, getQuotesByCustomerIdPaginate, updateQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.post('/addQuote', addQuote);
router.get('/fetchQuotes', fetchQuotesPaginate);
router.get('/fetchQuotes/:quoteId', getQuoteById);
router.get('/customer/:customerId', getQuotesByCustomerIdPaginate);
router.put('/:quoteId', updateQuote);
// router.get('/', getQuoteById);

export default router;
