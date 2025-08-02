import express from 'express'

import { addOrGetCustomer, deleteCustomer,  getAllCustomersPaginate, updateCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/', addOrGetCustomer);
// router.get('/', getAllCustomers);
router.get('/', getAllCustomersPaginate)
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;