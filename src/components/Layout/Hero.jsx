import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import heroImage from '../../assets/banner-logo.png';

const Hero = () => {
    const { currency, formatPrice } = useCurrency();
    return (
        <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
            {/* Background Blob - Light Mode */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider mb-8 uppercase shadow-sm">
                        <span>AI-Powered Finance</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight font-sans text-slate-900">
                        Grow Wealth with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Intelligent Logic
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Stop guessing. Start strategizing. Our AI engines analyze your inputs to provide personalized financial roadmaps for SIPs, Retirement, and more.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                        <a href="#calculators" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] group">
                            Start Calculating
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="flex justify-center lg:justify-start gap-12 pt-8 border-t border-slate-200">
                        <div>
                            <span className="block text-3xl font-bold text-slate-900 mb-1">10k+</span>
                            <span className="flex items-center gap-2 text-sm text-slate-500">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Active Users
                            </span>
                        </div>
                        <div>
                            <span className="block text-3xl font-bold text-slate-900 mb-1">
                                {currency.code === 'INR' ? '₹500Cr+' : formatPrice(5000000000, true)}
                            </span>
                            <span className="text-sm text-slate-500">Assets Planned</span>
                        </div>
                    </div>
                </div>

                {/* Visual - Light Mode Card */}
                <div className="relative h-[500px] hidden lg:flex items-center justify-center">
                    {/* Ring */}
                    <div className="absolute w-[400px] h-[400px] border border-slate-200 rounded-full animate-[spin_20s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
                    </div>
                    <div className="absolute w-[300px] h-[300px] border border-slate-200 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)]"></div>
                    </div>

                    {/* Card */}
                    <img src={heroImage} alt="Hero Image" className="relative z-10 w-[350px] transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500" />
                    {/* <div className="relative z-10 w-80 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl shadow-blue-500/10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                            </div>
                            <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="w-full h-32 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-lg relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-2 w-1/3 bg-slate-100 rounded-full"></div>
                                <div className="h-2 w-1/4 bg-slate-50 rounded-full"></div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    );
};

export default Hero;
