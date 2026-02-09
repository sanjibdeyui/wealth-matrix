import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PieChart, Bot, ChevronRight, BarChart3, TrendingUp, Lock, Zap } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { calculators } from '../../data/calculatorConfig';
import * as calculationUtils from '../../utils/calculations';
import { formatNumber } from '../../utils/calculations';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext'; // Import Currency

// Register ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// Logic Mapping
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

const CalculatorPage = () => {
    const { id } = useParams();
    const config = calculators[id];
    const calculate = logicMap[config?.logicKey];
    const { saveCalculation, deductCredit, userData, user } = useAuth();
    const { formatPrice, currency } = useCurrency(); // Use Currency

    // State
    const [values, setValues] = useState({});
    const [result, setResult] = useState(null);
    const [isCalculated, setIsCalculated] = useState(false); // New state to control visibility
    const [aiText, setAiText] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Initialize defaults when config loads
    useEffect(() => {
        if (config) {
            const defaults = {};
            config.inputs.forEach(input => {
                defaults[input.id] = input.default;
            });
            setValues(defaults);
            setIsCalculated(false); // Reset on tool change
            setResult(null);
            setErrorMsg("");
        }
    }, [config]);

    // Handle Manual Calculation Trigger
    const handleCalculate = () => {
        if (!user) {
            setErrorMsg("Please login to use the calculator.");
            return;
        }

        if (userData.credits <= 0) {
            setErrorMsg("Out of credits! Please upgrade to continue.");
            return;
        }

        if (deductCredit()) {
            // Deduct success -> Calculate
            if (calculate) {
                const res = calculate(values);
                setResult(res);
                const text = calculationUtils.generateAIInsight(res, values, config.title);
                setAiText(text);
                setIsCalculated(true);
                setErrorMsg("");

                // Save to history automatically
                let summary = "";
                if (res.total !== undefined) {
                    if (config.title.includes("Retirement")) {
                        summary = `${formatPrice(res.monthly_needed)}/mo needed`;
                    } else {
                        summary = `${formatPrice(res.total)}`;
                    }
                } else {
                    summary = "Analysis Saved";
                }
                saveCalculation(config.title, summary);
            }
        } else {
            setErrorMsg("Transaction failed. Try again.");
        }
    };

    const handleChange = (inputID, val) => {
        setValues(prev => ({
            ...prev,
            [inputID]: parseFloat(val) || 0
        }));
        // Optional: Reset calculation if they change inputs? 
        // For now, let's keep the old result until they click Calculate again (costing another credit? or free re-calc? Requirement implies 1 credit per use)
        // If we want re-calc to be free after unlock, we'd need session state. 
        // Assuming strict "1 credit per use" logic as requested: "Deduct 1 credit on every use".
        // So we won't reset setIsCalculated(false) immediately, but values update doesn't trigger recalc.
    };

    if (!config) return <div className="p-20 text-center">Tool not found</div>;

    // Chart Data Preparation
    const chartData = {
        labels: result?.breakdown?.map(item => item.label) || [],
        datasets: [
            {
                data: result?.breakdown?.map(item => item.value) || [],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // Blue
                    'rgba(249, 115, 22, 0.8)', // Orange
                    'rgba(16, 185, 129, 0.8)', // Emerald
                    'rgba(139, 92, 246, 0.8)', // Violet
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(139, 92, 246, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-4 transition-colors">
                            <ArrowLeft size={16} className="mr-2" /> Back to Tools
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                                <BarChart3 size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{config.title}</h1>
                                <p className="text-slate-500">{config.description}</p>
                            </div>
                        </div>
                    </div>
                    {user && (
                        <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                            <Zap size={16} className="text-orange-500 fill-orange-500" />
                            <span className="font-bold text-slate-900">{userData.credits}</span>
                            <span className="text-xs text-slate-500 uppercase font-bold">Credits</span>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* INPUT SECTION */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Configuration</h3>
                            <div className="space-y-6">
                                {config.inputs.map(input => (
                                    <div key={input.id}>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-semibold text-slate-700">{input.label}</label>
                                            <span className="text-sm font-bold text-blue-600">{values[input.id]} {input.unit === '₹' ? currency.symbol : input.unit}</span>
                                        </div>
                                        <input
                                            type="range"
                                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                                            min={input.min}
                                            max={input.max}
                                            step={input.step}
                                            value={values[input.id] || 0}
                                            onChange={(e) => handleChange(input.id, e.target.value)}
                                        />
                                        <div className="mt-2 flex items-center justify-between">
                                            <input
                                                type="number"
                                                className="w-24 px-3 py-1 bg-slate-50 border border-slate-200 rounded text-sm font-medium focus:outline-none focus:border-blue-400"
                                                min={input.min}
                                                max={input.max}
                                                value={values[input.id] || 0}
                                                onChange={(e) => handleChange(input.id, e.target.value)}
                                            />
                                            <span className="text-xs text-slate-400">Min: {input.min}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {errorMsg && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2">
                                <Lock size={16} /> {errorMsg}
                            </div>
                        )}

                        {/* Calculate Button (Primary Interaction) */}
                        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-900/10">
                            {!isCalculated ? (
                                <>
                                    <div className="mb-4 text-center">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-400">
                                            <Zap size={24} />
                                        </div>
                                        <h3 className="font-bold text-lg">Ready to Calculate?</h3>
                                        <p className="text-slate-400 text-sm">Unlock AI insights & detailed outcome.</p>
                                    </div>
                                    <button
                                        onClick={handleCalculate}
                                        className="w-full btn-primary"
                                    >
                                        Calculate Now <span className="px-2 py-0.5 bg-white/20 rounded text-xs">1 Credit</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text-slate-400 text-sm font-medium uppercase tracking-wider block mb-2">Estimated Value</span>
                                    <div className="text-4xl font-bold mb-4">
                                        {result ? formatPrice(result.total) : formatPrice(0)}
                                    </div>
                                    <button
                                        onClick={handleCalculate}
                                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-700"
                                    >
                                        Recalculate <span className="px-2 py-0.5 bg-slate-900 rounded text-xs opacity-50">1 Credit</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ANALYSIS SECTION (Locked/Unlocked) */}
                    <div className="lg:col-span-8">
                        {isCalculated && result ? (
                            <div className="space-y-6 animate-fade-in-up">
                                {/* Charts & Breakdown Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Chart Card */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                        <h3 className="text-sm font-bold text-slate-900 mb-4 w-full text-left">Visual Breakdown</h3>
                                        <div className="w-64 h-64">
                                            <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                        </div>
                                    </div>

                                    {/* Data Breakdown Card */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <h3 className="text-sm font-bold text-slate-900 mb-6">Detailed Metrics</h3>
                                        <div className="space-y-4">
                                            {result.breakdown.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                                    <span className="text-slate-600 font-medium">{item.label}</span>
                                                    <span className="text-slate-900 font-bold">
                                                        {item.label.includes("Years") ? item.value : formatPrice(item.value)}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                                                <span className="text-lg font-bold text-slate-900">Total</span>
                                                <span className="text-xl font-bold text-blue-600">{formatPrice(result.total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Insight Card */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Bot size={100} className="text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2 mb-4">
                                        <Bot size={20} /> AI Strategy Insight
                                    </h3>
                                    <p
                                        className="text-slate-700 leading-relaxed text-lg"
                                        dangerouslySetInnerHTML={{ __html: aiText.replace(/class="highlight"/g, 'class="font-bold text-blue-600"') }}
                                    ></p>
                                </div>
                            </div>
                        ) : (
                            // Locked State
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed relative overflow-hidden">
                                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px]"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                        <Lock size={32} className="text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Results Locked</h3>
                                    <p className="text-slate-500 max-w-md text-center mb-8">
                                        Configure your values and click "Calculate Now" to unlock the detailed breakdown and AI analysis.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorPage;
