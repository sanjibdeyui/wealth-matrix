import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const CURRENCIES = {
    INR: { code: 'INR', symbol: '₹', rate: 1, locale: 'en-IN' },
    USD: { code: 'USD', symbol: '$', rate: 0.012, locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.011, locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.0095, locale: 'en-GB' }
};

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(CURRENCIES.INR);

    useEffect(() => {
        const saved = localStorage.getItem('finai_currency');
        if (saved && CURRENCIES[saved]) {
            setCurrency(CURRENCIES[saved]);
        }
    }, []);

    const changeCurrency = (code) => {
        if (CURRENCIES[code]) {
            setCurrency(CURRENCIES[code]);
            localStorage.setItem('finai_currency', code);
        }
    };

    const convert = (amountInINR) => {
        return amountInINR * currency.rate;
    };

    const formatPrice = (amountInINR, compact = false) => {
        const converted = convert(amountInINR);
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: currency.code,
            maximumFractionDigits: compact ? 0 : 0,
            notation: compact ? 'compact' : 'standard'
        }).format(converted);
    };

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, convert, CURRENCIES }}>
            {children}
        </CurrencyContext.Provider>
    );
};
