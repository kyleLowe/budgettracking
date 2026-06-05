import { NextFunction, Request, Response } from 'express';
import * as CurrencyDAO from '../daos/CurrencyDAO';

export const getCurrencyByISOCode = async (ISOCode: string) => {
    const currency = CurrencyDAO.getCurrencyByISOCode(ISOCode);
    return currency;
};

export const getCurrencyByCountry = async (country: string) => {
    const currency = CurrencyDAO.getCurrencyByCountry(country);
    return currency;
}

export const getAllCurrenciesISOCode = async () => {
    const currencies = await CurrencyDAO.getAllCurrenciesISOCode();
    return currencies;
};
