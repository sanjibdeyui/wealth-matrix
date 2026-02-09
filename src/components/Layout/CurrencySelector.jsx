import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { Globe } from 'lucide-react';

const CurrencySelector = () => {
    const { currency, changeCurrency, CURRENCIES } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-white rounded-full border border-slate-200 transition-all text-sm font-bold"
            >
                <Globe size={16} />
                <span>{currency.code}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-fade-in-up">
                        {Object.values(CURRENCIES).map((curr) => (
                            <button
                                key={curr.code}
                                onClick={() => {
                                    changeCurrency(curr.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 flex justify-between items-center ${currency.code === curr.code ? 'text-blue-600 bg-blue-50' : 'text-slate-700'}`}
                            >
                                <span>{curr.code}</span>
                                <span className="text-slate-400">{curr.symbol}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CurrencySelector;
