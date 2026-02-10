import React, { useState } from 'react';
import { Brain, Menu, X, User, CreditCard, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CurrencySelector from './CurrencySelector';
import siteLogo from '../../assets/text-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Helper to check active state (simple)
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="container bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full shadow-lg shadow-slate-200/50 px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                    <img src={siteLogo} alt="Wealth Matrix" className="h-10 w-auto object-contain" />
                </Link>

                {/* Desktop Links */}
                <ul className="hidden lg:flex items-center gap-1 bg-slate-100/50 px-1 py-1 rounded-full border border-slate-200/50">
                    <li><Link to="/" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white px-5 py-2 rounded-full transition-all">Home</Link></li>
                    <li><a href="/#calculators" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white px-5 py-2 rounded-full transition-all">Tools</a></li>
                    <li><Link to="/features" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white px-5 py-2 rounded-full transition-all">Features</Link></li>
                    <li><Link to="/pricing" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white px-5 py-2 rounded-full transition-all">Plans</Link></li>
                    <li><Link to="/security" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white px-5 py-2 rounded-full transition-all">Security</Link></li>
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="hidden lg:flex items-center gap-4 relative">
                            <span className="text-sm font-bold text-slate-700 hidden xl:block">Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}</span>

                            {/* User Dropdown */}
                            <div className="relative group">
                                <Link to="/dashboard" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 hover:shadow-md transition-shadow group-hover:ring-4 ring-blue-50">
                                    <User size={20} />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 w-48">
                                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-1">
                                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                                            <Brain size={16} /> Dashboard
                                        </Link>
                                        <Link to="/billing" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                                            <CreditCard size={16} /> Invoices & Billing
                                        </Link>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium w-full text-left">
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2">Log In</Link>
                            <Link to="/register" className="btn-primary text-sm px-5 py-2">
                                Get Started
                            </Link>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <CurrencySelector />

                    <button
                        className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full mt-4 w-[90%] bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 shadow-xl lg:hidden">
                    <Link to="/" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Home</Link>
                    <a href="/#calculators" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Tools</a>
                    <Link to="/features" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Features</Link>
                    <Link to="/pricing" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Plans</Link>
                    <Link to="/security" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Security</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link to="/billing" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Invoices & Billing</Link>
                            <button onClick={handleLogout} className="text-left text-red-500 font-medium py-2 border-b border-slate-100 flex items-center gap-2">
                                <LogOut size={16} /> Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-primary font-medium py-2 border-b border-slate-100" onClick={() => setIsOpen(false)}>Log In</Link>
                            <Link to="/register" className="btn-primary w-full text-center mt-2" onClick={() => setIsOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
