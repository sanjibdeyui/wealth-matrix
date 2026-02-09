import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Send, Brain } from 'lucide-react';
import siteLogo from '../../assets/text-logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-50 border-t border-slate-200 pt-20 pb-10 overflow-hidden">
            {/* Background Blob - Light Mode (Matching Hero) */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-50"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-50"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="space-y-4">
                            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                                {/* <Brain className="w-8 h-8 text-blue-600" />
                                <span>Wealth Matrix</span> */}
                                <img src={siteLogo} alt="Wealth Matrix" className="h-20 w-auto object-contain" />
                            </Link>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Empowering investors with advanced AI-driven tools<br />for smarter financial decisions.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                                <Github size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-700 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Product</h3>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><Link to="/features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing Plans</Link></li>

                            <li><Link to="/security" className="hover:text-blue-600 transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>

                            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-6">Stay Connected</h3>
                        <p className="text-slate-500 text-sm mb-4 font-medium">Join our newsletter for weekly financial insights.</p>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                                />
                            </div>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                                Subscribe <Send size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm font-medium">
                        &copy; {currentYear} FinAI Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8 text-sm text-slate-500 font-medium">
                        <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
