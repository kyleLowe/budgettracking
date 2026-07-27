import * as curcode from 'curcode';
export const getCurrencyByISOCode = ( _currencyCode: string) => {
    const currency = curcode.code(_currencyCode);
    return currency;
};

export const getCurrencyByCountry = ( _currencyCountry: string) => {
    const currency = curcode.country(_currencyCountry);
    return currency;
};


export const getAllCurrenciesByCountry = async () => {
    const currencies = curcode.countries();
    return currencies;
};

export const getAllCurrenciesISOCode = async () => {
    const currencies = curcode.codes();
    return currencies;
};  