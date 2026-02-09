import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext'; // Import
import { Navigate, Link } from 'react-router-dom';
import { User, TrendingUp, History, Bookmark, Plus, Zap, CheckCircle2 } from 'lucide-react';

const DashboardPage = () => {
    const { user, userData, logout } = useAuth();
    const { currency } = useCurrency();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Dashboard</h1>
                        <p className="text-slate-500">Welcome back, <span className="text-slate-900 font-bold">{user.user_metadata?.full_name || user.email.split('@')[0]}</span></p>
                    </div>

                </div>

                {/* Main Content - Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Credit Balance Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-10 -translate-y-10 translate-x-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 relative z-10 shrink-0">
                            <Zap size={28} />
                        </div>
                        <div className="relative z-10 flex-1">
                            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-1">Available Credits</span>
                            <span className="text-3xl font-bold text-slate-900">{userData.credits}</span>
                        </div>
                    </div>

                    {/* Calculations Check Card */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-10 -translate-y-10 translate-x-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 relative z-10 shrink-0">
                            <CheckCircle2 size={28} />
                        </div>
                        <div className="relative z-10 flex-1">
                            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider block mb-1">Calculations Done</span>
                            <span className="text-3xl font-bold text-slate-900">{userData.stats.calculations}</span>
                        </div>
                    </div>

                    {/* New Plan Card */}
                    <Link to="/#calculators" className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow hover:-translate-y-0.5 transform">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-10 -translate-y-10 translate-x-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 relative z-10 shrink-0">
                            <Plus size={28} />
                        </div>
                        <div className="relative z-10 flex-1">
                            <span className="block text-lg font-bold text-slate-900 mb-1">New Plan</span>
                            <span className="text-sm text-purple-600 font-medium hover:underline">Start Calculating</span>
                        </div>
                    </Link>

                    {/* Upgrade Plan Card */}
                    <Link to="/pricing" className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow hover:-translate-y-0.5 transform">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-10 -translate-y-10 translate-x-10 group-hover:opacity-20 transition-opacity"></div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-100 relative z-10 shrink-0">
                            <Zap size={28} />
                        </div>
                        <div className="relative z-10 flex-1">
                            <span className="block text-lg font-bold text-slate-900 mb-1">Upgrade Plan</span>
                            <span className="text-sm text-orange-600 font-medium hover:underline">Get More Credits</span>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <History size={18} className="text-slate-400" /> Recent Activity
                        </h3>
                    </div>

                    {userData.history.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {userData.history.slice(0, 5).map((item) => (
                                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{item.tool}</h4>
                                        <span className="text-xs text-slate-500">{item.date}</span>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{item.result}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-slate-400">
                            <History size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No calculations yet. Start using the tools!</p>
                            <Link to="/#calculators" className="text-blue-600 font-bold text-sm mt-2 inline-block">Go to Tools</Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
