import express from 'express';
import * as TransactionController from '../controllers/TransactionController';

//Route -> Controller -> Service -> DAO -> Model
const router = express.Router();

router.get('/id/:transactionId', TransactionController.getTransaction);
router.get('/date', TransactionController.getTransactionsByDate);
router.post('/create', TransactionController.createTransaction);
router.put('/id/:transactionId', TransactionController.updateTransaction);
router.delete('/id/:transactionId', TransactionController.deleteTransaction);



export default router