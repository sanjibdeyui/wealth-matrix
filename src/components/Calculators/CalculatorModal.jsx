import React, { useState, useEffect } from 'react';
import { X, Bot, PieChart } from 'lucide-react';
import { calculators } from '../../data/calculatorConfig';
import * as calculationUtils from '../../utils/calculations';
import { formatNumber } from '../../utils/calculations';

// Map config Logic Key to actual function
const logicMap = {
    sip: calculationUtils.calculateSIP,
    fd: calculationUtils.calculateFD,
    mf: calculationUtils.calculateLumpsum,
    retirement: calculationUtils.calculateRetirement,
    inflation: calculationUtils.calculateInflation,
    compound: calculationUtils.calculateCompound,
    networth: calculationUtils.calculateNetWorth,
    emergency: calculationUtils.calculateEmergency
};

const CalculatorModal = ({ toolKey, onClose }) => {
    const config = calculators[toolKey];
    const calculate = logicMap[config.logicKey];

    const [values, setValues] = useState(() => {
        const defaults = {};
        config.inputs.forEach(input => {
            defaults[input.id] = input.default;
        });
        return defaults;
    });

    const [result, setResult] = useState(null);
    const [aiText, setAiText] = useState("");

    const handleChange = (id, newVal) => {
        setValues(prev => ({
            ...prev,
            [id]: parseFloat(newVal) || 0
        }));
    };

    useEffect(() => {
        if (calculate) {
            const res = calculate(values);
            setResult(res);
            const text = calculationUtils.generateAIInsight(res, values, config.title);
            setAiText(text);
        }
    }, [values, calculate, config.title]);

    if (!config) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-[slideUp_0.3s_ease-out]">
                {/* Inputs Sidebar */}
                <div className="w-full md:w-7/12 p-8 md:p-10 max-h-[50vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar bg-white">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <PieChart size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{config.title}</h2>
                                <p className="text-slate-500 text-sm">Enter your details below</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="md:hidden p-2 text-slate-400 hover:text-slate-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {config.inputs.map(input => (
                            <div key={input.id} className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors focus-within:border-blue-300 focus-within:bg-blue-50/30">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{input.label}</label>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        className="w-full bg-transparent text-2xl font-bold text-slate-800 outline-none font-sans"
                                        value={values[input.id]}
                                        onChange={(e) => handleChange(input.id, e.target.value)}
                                        min={input.min}
                                        max={input.max}
                                    />
                                    <span className="text-slate-400 font-medium">{input.unit}</span>
                                </div>
                                <input
                                    type="range"
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={values[input.id]}
                                    onChange={(e) => handleChange(input.id, e.target.value)}
                                    min={input.min}
                                    max={input.max}
                                    step={input.step}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results Panel */}
                <div className="w-full md:w-5/12 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-8 md:p-10 flex flex-col justify-between shadow-inner relative">
                    <div>
                        <button
                            onClick={onClose}
                            className="hidden md:flex absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors items-center justify-center bg-white border border-slate-100 shadow-sm"
                            aria-label="Close Modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-center mb-8 relative overflow-hidden group shadow-sm mt-8 md:mt-0">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                            <span className="block text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Estimated Total</span>
                            <span className="block text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight break-all">
                                ₹{result ? formatNumber(result.total) : 0}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {result && result.breakdown && result.breakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0">
                                    <span className="text-slate-500 text-sm font-medium">{item.label}</span>
                                    <span className="text-slate-900 font-semibold">
                                        {item.label.includes("Years") || item.label.includes("Months") ? item.value : "₹" + formatNumber(item.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-blue-600 text-sm font-bold uppercase tracking-wider">
                            <Bot size={16} /> AI Analysis
                        </div>
                        <p
                            className="text-sm text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: aiText.replace(/class="highlight"/g, 'class="text-blue-600 font-bold"') }}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorModal;
