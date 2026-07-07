import { NextFunction, Request, Response } from 'express';
import * as CurrencyDAO from '../daos/CurrencyDAO';
import { NotAcceptableError } from '../errors/NotAcceptable';

export const getCurrencyByISOCode = async (ISOCode: string) => {
    if (ISOCode.length !== 3) {
        throw new NotAcceptableError('Invalid ISO code. It must be a 3-letter code.');
    }
    const currency = CurrencyDAO.getCurrencyByISOCode(ISOCode.toUpperCase());
    return currency;
};

export const getCurrencyByCountry = async (country: string) => {
    if (country.length < 2 || country.length > 56) {
        throw new NotAcceptableError('Invalid country name. It must be between 2 and 56 characters.');
    }
    const currency = CurrencyDAO.getCurrencyByCountry(country);
    return currency;
}

export const getAllCurrenciesISOCode = async () => {
    const currencies = await CurrencyDAO.getAllCurrenciesISOCode();
    return currencies;
};
