import express from 'express';
import * as CurrencyController from '../controllers/CurrencyController';

//Route -> Controller -> Service -> DAO -> Model
const router = express.Router();

router.get('/', CurrencyController.getAllCurrenciesISOCode);
router.get('/code/:currencyCode', CurrencyController.getCurrencyByISOCode);
router.get('/country/:currencyCountry', CurrencyController.getCurrencyByCountry);

export default router