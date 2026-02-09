import React from 'react';
import { Shield, BarChart3, Zap, Lock, Smartphone, Globe, CheckCircle2 } from 'lucide-react';
import features_dashboard from '../../assets/trust-img-3.png';

const FeaturesPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Wealth Matrix Features</h1>
                    <p className="text-xl text-slate-500">
                        Powerful AI-driven tools designed to give you clarity and confidence in your financial journey.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                            title: "Smart Projections",
                            desc: "AI-driven algorithms predict your investment growth with high accuracy, considering inflation and market trends."
                        },
                        {
                            icon: <Shield className="w-8 h-8 text-indigo-600" />,
                            title: "Bank-Grade Security",
                            desc: "Your financial data is encrypted with 256-bit AES protection. We never store sensitive banking credentials."
                        },
                        {
                            icon: <Smartphone className="w-8 h-8 text-purple-600" />,
                            title: "Mobile Optimized",
                            desc: "Access your dashboard and calculators from any device. Seamless experience on mobile, tablet, and desktop."
                        },
                        {
                            icon: <Globe className="w-8 h-8 text-cyan-600" />,
                            title: "Global Currencies",
                            desc: "Support for major global currencies (USD, INR, EUR, GBP) with real-time conversion rates."
                        },
                        {
                            icon: <Lock className="w-8 h-8 text-emerald-600" />,
                            title: "Private by Design",
                            desc: "We don't sell your data. Your financial inputs are used solely to generate your personalized reports."
                        },
                        {
                            icon: <Zap className="w-8 h-8 text-orange-600" />,
                            title: "Instant PDF Reports",
                            desc: "Download detailed reports of your investment plans to share with advisors or keep for your records."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all hover:-translate-y-1">
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl inline-block">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Section */}
                <div className="bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Professionals Trust Wealth Matrix</h2>
                            <ul className="space-y-4">
                                {[
                                    "Real-time market data integration",
                                    "Customizable investment scenarios",
                                    "Tax-efficient planning modules",
                                    "Dedicated support for Pro users",
                                    "Continuous feature updates"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-64 md:h-80 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center group">
                            <img
                                src={features_dashboard}
                                alt="Wealth Matrix Dashboard"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decoration Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
