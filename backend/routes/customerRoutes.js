import express from 'express'

import { addOrGetCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/customers', addOrGetCustomer);
router.get('/customers', getAllCustomers);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;