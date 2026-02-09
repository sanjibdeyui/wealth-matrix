import React from 'react';
import { Link } from 'react-router-dom';
import { calculators } from '../../data/calculatorConfig';
import {
    ChartLine,
    PiggyBank,
    Coins,
    Umbrella,
    TrendingUp,
    Atom,
    Wallet,
    ShieldAlert,
    ArrowRight
} from 'lucide-react';

const iconMap = {
    ChartLine,
    PiggyBank,
    Coins,
    Umbrella,
    TrendingUp,
    Atom,
    Wallet,
    ShieldAlert
};

const ToolsGrid = () => {
    return (
        <section id="calculators" className="py-24 relative z-10 bg-slate-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 font-sans text-slate-900">AI Financial Tools</h2>
                    <p className="text-slate-500 text-lg">Select a tool to get started with your financial planning.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.keys(calculators).map((key) => {
                        const tool = calculators[key];
                        const Icon = iconMap[tool.icon] || ChartLine;

                        return (
                            <Link
                                key={key}
                                to={`/tool/${key}`}
                                className="group bg-white border border-slate-200 p-8 rounded-2xl hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col"
                            >
                                {/* Hover Gradient Back */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="mb-6 relative z-10 flex justify-between items-start">
                                    <Icon className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight size={16} className="text-blue-600" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-slate-900 relative z-10">{tool.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed relative z-10 mb-4 flex-grow">{tool.description}</p>

                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest relative z-10 group-hover:underline decoration-blue-300 underline-offset-4">Calculate Now</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ToolsGrid;
