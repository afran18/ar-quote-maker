import express from 'express'

import { addOrGetCustomer, deleteCustomer,  getAllCustomersPaginate, getCustomerById, getCustomerByPhone, updateCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/', addOrGetCustomer);
// router.get('/', getAllCustomers);
router.get('/search', getCustomerByPhone);
router.get('/', getAllCustomersPaginate);
router.get("/:id", getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;