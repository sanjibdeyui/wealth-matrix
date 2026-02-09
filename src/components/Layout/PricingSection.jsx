import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { Star, Check, Zap } from 'lucide-react';

const PricingSection = () => {
    const { user, addCredits } = useAuth();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [upgradeMsg, setUpgradeMsg] = useState("");

    const handleUpgrade = (planName, credits, price) => {
        if (!user) {
            navigate('/login');
            return;
        }
        // Navigate to Checkout with Plan Details
        navigate('/checkout', { state: { plan: { name: planName, credits, price } } });
    };

    const plans = [
        {
            name: "Starter",
            credits: 50,
            price: 249,
            desc: "Perfect for getting started",
            features: ["50 Credits", "Access to all tools", "Email Support"],
            bestValue: false,
            // White card with Soft Blue accents
            color: "bg-white border-blue-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300",
            textColor: "text-slate-900",
            btnColor: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100"
        },
        {
            name: "Pro Bundle",
            credits: 100,
            price: 499,
            desc: "Best value for power users",
            features: ["100 Credits", "Priority Processing", "Priority Support"],
            bestValue: true,
            // Vibrant Gradient: Deep Blue to Violet
            color: "bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white shadow-2xl shadow-indigo-500/20 scale-105 ring-1 ring-white/10",
            textColor: "text-white",
            btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none hover:shadow-lg hover:shadow-blue-600/25"
        },
        {
            name: "Enterprise",
            credits: 500,
            price: 1999,
            desc: "For heavy usage",
            features: ["500 Credits", "Instant Results", "24/7 Support"],
            bestValue: false,
            // Premium Silver/Slate look
            color: "bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300",
            textColor: "text-slate-900",
            btnColor: "bg-slate-900 text-white hover:bg-slate-800 border-none"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-50 rounded-tr-full opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 font-sans text-slate-900">Flexible Plans for Every Investor</h2>
                    <p className="text-slate-500 text-lg">Choose the credit pack that fits your needs.</p>
                </div>

                {upgradeMsg && (
                    <div className="max-w-md mx-auto mb-12 p-4 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 text-center animate-pulse shadow-sm">
                        {upgradeMsg}
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className={`rounded-2xl p-8 relative transition-transform duration-300 hover:-translate-y-2 flex flex-col ${plan.color} ${plan.bestValue ? 'border-0 ring-4 ring-yellow-400/20' : 'border'}`}>
                            {plan.bestValue && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 ${plan.textColor}`}>{plan.name}</h3>
                                <p className={`text-sm ${plan.bestValue ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-bold ${plan.textColor}`}>{formatPrice(plan.price)}</span>
                                    <span className={`text-sm font-normal ${plan.bestValue ? 'text-slate-400' : 'text-slate-500'}`}>/ {plan.credits} credits</span>
                                </div>
                            </div>

                            <ul className="mb-8 space-y-4 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.bestValue ? 'bg-white/10 text-yellow-400' : 'bg-green-50 text-green-600'}`}>
                                            <Check size={14} />
                                        </div>
                                        <span className={plan.bestValue ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(plan.name, plan.credits, plan.price)}
                                className={`w-full py-3.5 font-bold rounded-full transition-all border ${plan.btnColor}`}
                            >
                                Buy {plan.credits} Credits
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
