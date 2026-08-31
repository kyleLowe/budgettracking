import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import * as CurrencyServices from "../services/CurrencyServices";

export const getAllCurrenciesInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currencies: object = await CurrencyServices.getAllCurrenciesInfo();
    if (!currencies) {
      throw new NotFoundError("No currencies were found in our system");
    }
    res.status(200).json({ currencies });
  } catch (error) {
    next(error);
  }
};

export const getCurrencyByISOCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _currencyCode = req.params.currencyCode as string;
    if (!_currencyCode) {
      throw new NotFoundError("Currency code is required");
    }

    const currency = await CurrencyServices.getCurrencyByISOCode(_currencyCode);
    if (!currency) {
      throw new NotFoundError(`Currency code ${_currencyCode} not found`);
    }
    res.status(200).json({ currency });
  } catch (error) {
    next(error);
  }
};

export const getCurrencyByCountry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _currencyCountry: string = req.params.currencyCountry as string;
    if (!_currencyCountry) {
      throw new NotFoundError("Currency country is required");
    }
    const currency =
      await CurrencyServices.getCurrencyByCountry(_currencyCountry);
    if (!currency) {
      throw new NotFoundError(`Country ${_currencyCountry} not found`);
    }
    res.status(200).json({ currency });
  } catch (error) {
    next(error);
  }
};
