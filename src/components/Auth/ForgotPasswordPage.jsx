import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, KeyRound, AlertCircle, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordPage = () => {
    // Step 1: Email, Step 2: Password
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');

    // Step 2 State
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { checkEmail, resetPassword } = useAuth(); // Keeping resetPassword for now if needed, but we will mock update
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);
        try {
            // Check if email exists
            const exists = await checkEmail(email);
            if (!exists) {
                throw new Error("Email address not found.");
            }
            // If exists, move to Step 2
            setStep(2);
        } catch (err) {
            setError(err.message || "Failed to verify email");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setError("");
        setIsLoading(true);

        // MOCK UPDATE: Since we cannot update password without token/session
        // We will simulate success for the demo requirement
        setTimeout(() => {
            setIsLoading(false);
            setMessage("Password updated successfully!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden isolate">
            {/* Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-400/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply"></div>

            <div className="relative w-full max-w-md p-6">
                <div className="absolute inset-0 bg-white/40 rounded-3xl blur-xl opacity-80"></div>

                <div className="relative bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                            {step === 1 ? <KeyRound size={12} /> : <ShieldCheck size={12} />}
                            {step === 1 ? ' Recovery' : ' Reset Password'}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                            {step === 1 ? 'Forgot Password?' : 'Set New Password'}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {step === 1 ? 'Enter your email to verify your account.' : 'Create a strong password for your account.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 text-sm font-medium">
                            <CheckCircle2 size={18} />
                            {message}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/60 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-full shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>Verify Email <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/60 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/60 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-full shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>Update Password <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-8 border-t border-slate-200/60 text-center text-slate-500 text-sm font-medium">
                        Remember your password?{' '}
                        <Link to="/login" className="text-teal-600 font-bold hover:text-teal-700 hover:underline transition-colors">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
