import React from 'react';
import { ShieldCheck, Lock, Server, EyeOff, FileKey } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20 relative overflow-hidden isolate">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <ShieldCheck size={14} /> Security First
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Your Security is Our Priority</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        We use bank-grade security protocols to ensure your data remains private, encrypted, and safe at all times.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Lock className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">256-Bit SSL Encryption</h3>
                        <p className="text-slate-600 leading-relaxed">
                            All data transmitted between your device and our servers is encrypted using 256-bit Secure Socket Layer (SSL) technology.
                        </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Server className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Infrastructure</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our servers are hosted in world-class data centers with 24/7 monitoring, biometric access controls, and automated backups.
                        </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <EyeOff className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Data Privacy</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We practice strict data minimization. Your personal financial inputs are processed ephemerally and never mined for advertising.
                        </p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <FileKey className="w-7 h-7 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Regular Audits</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We continually scan our systems for vulnerabilities and undergo regular third-party security audits to maintain best practices.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                        <ShieldCheck size={200} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Have Security Concerns?</h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                            If you believe you have found a security vulnerability in our platform, please let our security team know immediately.
                        </p>
                        <Link to="/contact" className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-colors inline-block shadow-lg">
                            Contact Security Team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
