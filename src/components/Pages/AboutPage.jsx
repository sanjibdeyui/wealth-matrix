import React from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';
import officeTeamCollab from '../../assets/office_team_collab_1770290209820.png';

const AboutPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Hero */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">About Wealth Matrix</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We are a team of financial experts and AI engineers dedicated to democratizing specialized financial models.
                        Our mission is to provide professional-grade tools to individual investors.
                    </p>
                </div>

                {/* Mission Stats */}
                <div className="grid md://grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl text-center border border-slate-100 shadow-sm">
                        <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
                        <div className="text-slate-500 font-medium">Users Helped</div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl text-center border border-slate-100 shadow-sm">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">$500M+</div>
                        <div className="text-slate-500 font-medium">Assets Planned</div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl text-center border border-slate-100 shadow-sm">
                        <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                        <div className="text-slate-500 font-medium">Platform Uptime</div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Core Values</h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Accuracy First</h3>
                                    <p className="text-slate-600 mt-2">
                                        We rigorously test our AI models against historical market data to ensure our projections are as accurate as possible.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">User Centric</h3>
                                    <p className="text-slate-600 mt-2">
                                        We design for people, not spreadsheets. Our tools are intuitive, visual, and easy to understand.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Continuous Growth</h3>
                                    <p className="text-slate-600 mt-2">
                                        We are constantly learning and evolving our platform to adapt to changing global economic conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative">
                            {/* Abstract Office Image Placeholder */}
                            <img
                                src={officeTeamCollab}
                                alt="FinAI Team Office"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                            <div className="h-full flex flex-col justify-center text-center">
                                <span className="text-2xl font-bold text-slate-900">2026</span>
                                <span className="text-sm text-slate-500">Year Founded</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
