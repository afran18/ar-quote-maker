import express from 'express';
import { addQuote, fetchQuotesPaginate, getQuotesByCustomerIdPaginate, } from '../controllers/quoteController.js';

const router = express.Router();

router.post('/addQuote', addQuote);
router.get('/fetchQuotes', fetchQuotesPaginate);
router.get('/customer/:customerId', getQuotesByCustomerIdPaginate);

export default router;
