import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, PieChart, Bot, ChevronRight, BarChart3, TrendingUp, Lock, Zap, LogIn, AlertCircle, Volume2, StopCircle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import VoiceDropdown from '../../components/Calculators/VoiceDropdown';
import { calculators } from '../../data/calculatorConfig';
import * as calculationUtils from '../../utils/calculations';
import { formatNumber } from '../../utils/calculations';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

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
    const location = useLocation();
    const config = calculators[id];
    const calculate = logicMap[config?.logicKey];
    const { saveCalculation, deductCredit, userData, user, loading } = useAuth();
    const { formatPrice, currency } = useCurrency();

    // State
    const [values, setValues] = useState({});
    const [result, setResult] = useState(null);
    const [isCalculated, setIsCalculated] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [aiText, setAiText] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    // Initialize defaults when config loads
    useEffect(() => {
        if (config) {
            const defaults = {};
            config.inputs.forEach(input => {
                defaults[input.id] = input.default;
            });
            setValues(defaults);
            setIsCalculated(false);
            setResult(null);
            setErrorMsg("");
            setIsLocked(false);
        }
    }, [config]);

    // Check for pending calculation after login
    useEffect(() => {
        const pendingCalc = localStorage.getItem(`pending_calc_${id}`);
        if (pendingCalc && user && !loading) {
            const parsed = JSON.parse(pendingCalc);
            setValues(parsed.values);
            setResult(parsed.result);
            setAiText(parsed.aiText);
            setIsCalculated(true);

            // Try to deduct credit and unlock
            if (userData.credits > 0) {
                deductCredit().then(success => {
                    if (success) {
                        setIsLocked(false);
                        setErrorMsg(""); // Clear any previous errors
                        localStorage.removeItem(`pending_calc_${id}`);

                        // Save history
                        let summary = "";
                        if (parsed.result.total !== undefined) {
                            if (config.title.includes("Retirement")) {
                                summary = `${formatPrice(parsed.result.monthly_needed)}/mo needed`;
                            } else {
                                summary = `${formatPrice(parsed.result.total)}`;
                            }
                        } else {
                            summary = "Analysis Saved";
                        }
                        saveCalculation(config.title, summary);
                    } else {
                        setErrorMsg("Failed to deduct credit. Results remain locked.");
                        setIsLocked(true);
                    }
                });
            } else {
                // Only show error if we are sure (though initially 0). 
                // We rely on the re-render when credits load to clear this if successful.
                setErrorMsg("Insufficient credits to unlock results.");
                setIsLocked(true);
            }
        } else if (pendingCalc && !user) {
            // Restore locked state for guest
            const parsed = JSON.parse(pendingCalc);
            setValues(parsed.values);
            setResult(parsed.result);
            setAiText(parsed.aiText);
            setIsCalculated(true);
            setIsLocked(true);
        }
    }, [user, loading, id, userData.credits]);

    // Cleanup speech on unmount and load voices
    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            // Default to first English voice
            if (!selectedVoice) {
                const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
                setSelectedVoice(defaultVoice);
            }
        };

        updateVoices();

        // Chrome loads voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }

        return () => {
            window.speechSynthesis.cancel();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                // 1. Clean HTML tags
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = aiText;
                let cleanText = tempDiv.textContent || tempDiv.innerText || "";

                // 2. Remove Emojis (Range for most emojis)
                // This regex covers standard emojis, supplementary symbols, etc.
                cleanText = cleanText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

                // 3. Remove specific icons text if any artifact remains (optional)
                cleanText = cleanText.trim();

                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);

                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }

                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        } else {
            alert("Text-to-Speech not supported in this browser.");
        }
    };

    // Handle Calculation
    const handleCalculate = () => {
        // GUEST MODE
        if (!user) {
            if (calculate) {
                const res = calculate(values);
                setResult(res);
                const text = calculationUtils.generateAIInsight(res, values, config.title);
                setAiText(text);
                setIsCalculated(true);
                setIsLocked(true);
                setErrorMsg("");

                // Save pending state
                localStorage.setItem(`pending_calc_${id}`, JSON.stringify({
                    values,
                    result: res,
                    aiText: text
                }));
            }
            return;
        }

        // LOGGED IN MODE
        if (userData.credits <= 0) {
            setErrorMsg("Out of credits! Please upgrade to continue.");
            return;
        }

        if (deductCredit()) {
            if (calculate) {
                const res = calculate(values);
                setResult(res);
                const text = calculationUtils.generateAIInsight(res, values, config.title);
                setAiText(text);
                setIsCalculated(true);
                setIsLocked(false);
                setErrorMsg("");

                // Save to history
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
    };

    if (!config) return <div className="p-20 text-center">Tool not found</div>;

    // Chart Data Preparation
    const chartData = {
        labels: result?.breakdown?.map(item => item.label) || [],
        datasets: [
            {
                data: result?.breakdown?.map(item => item.value) || [],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
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
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                    <div className="w-full md:w-auto">
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
                        <div className="hidden md:flex bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm items-center gap-2">
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
                                <AlertCircle size={16} /> {errorMsg}
                            </div>
                        )}

                        {/* Calculate Button */}
                        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-900/10">
                            {!isCalculated || isLocked ? (
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
                                        {isLocked ? "Recalculate (Results Locked)" : "Calculate Now"} <span className="px-2 py-0.5 bg-white/20 rounded text-xs">1 Credit</span>
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

                    {/* ANALYSIS SECTION */}
                    <div className="lg:col-span-8 relative">
                        {/* LOCKED OVERLAY */}
                        {isCalculated && isLocked && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200">
                                <div className="p-8 bg-white rounded-2xl shadow-2xl text-center max-w-sm border border-slate-100">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <Lock size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Results Locked</h3>
                                    <p className="text-slate-600 mb-6">
                                        To view the detailed results and AI analysis, you need to login first.
                                    </p>
                                    <Link
                                        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                                        className="w-full btn-primary flex items-center justify-center gap-2"
                                    >
                                        <LogIn size={18} /> Login to Unlock
                                    </Link>
                                    <p className="text-xs text-slate-400 mt-4">1 credit will be deducted upon unlocking.</p>
                                </div>
                            </div>
                        )}

                        {/* Results Content (Blurred if locked) */}
                        {isCalculated && result && (
                            <div className={`space-y-6 animate-fade-in-up transition-all ${isLocked ? 'blur-sm opacity-50 pointer-events-none select-none' : ''}`}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                        <h3 className="text-sm font-bold text-slate-900 mb-4 w-full text-left">Visual Breakdown</h3>
                                        <div className="w-64 h-64">
                                            <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                        </div>
                                    </div>

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

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Bot size={100} className="text-blue-600" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 relative z-10 w-full">
                                        <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                                            <Bot size={24} /> AI Strategy Insight
                                        </h3>
                                        <div className="w-full sm:w-auto flex items-center gap-2">
                                            {/* Voice Selector */}
                                            {!isSpeaking && voices.length > 0 && (
                                                <VoiceDropdown
                                                    voices={voices.filter(v => v.lang.startsWith('en'))}
                                                    selectedVoice={selectedVoice}
                                                    onChange={setSelectedVoice}
                                                    disabled={isSpeaking}
                                                    className="flex-1 sm:flex-none sm:w-48"
                                                />
                                            )}
                                            <button
                                                onClick={handleSpeak}
                                                className={`p-2 bg-white/50 hover:bg-white rounded-full text-blue-600 transition-colors border border-blue-200 shadow-sm ${(!isSpeaking && voices.length > 0) ? '' : 'ml-auto'}`}
                                                title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
                                            >
                                                {isSpeaking ? <StopCircle size={20} /> : <Volume2 size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="text-slate-700 leading-relaxed text-lg"
                                        dangerouslySetInnerHTML={{ __html: aiText.replace(/class="highlight"/g, 'class="font-bold text-blue-600"') }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {!isCalculated && (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed relative overflow-hidden">
                                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px]"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                        <Zap size={32} className="text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Start?</h3>
                                    <p className="text-slate-500 max-w-md text-center mb-8">
                                        Configure your values and click "Calculate Now" to see projection.
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
