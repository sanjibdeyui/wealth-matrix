import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

const ContactPage = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        user_id: user ? user.id : null,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20 relative overflow-hidden isolate">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Info */}
                    <div className="relative">
                        <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Get in Touch</h1>
                        <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                            Have questions about our plans, features, or enterprise solutions? Our team is here to help you achieve your financial goals.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/50">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-inner">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
                                    <p className="text-slate-500 mb-2 font-medium">Our support team replies within 24h</p>
                                    <a href="mailto:support@wealthmatrix.com" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors text-lg">support@wealthmatrix.com</a>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/50">
                                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-inner">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Office</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        123 Innovation Drive, Suite 400<br />
                                        Tech Valley, CA 94043
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/50 transition-colors duration-300 border border-transparent hover:border-white/50">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0 shadow-inner">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone</h3>
                                    <p className="text-slate-500 mb-2 font-medium">Mon-Fri from 9am to 6pm PST</p>
                                    <a href="tel:+15550000000" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors text-lg">+1 (555) 000-0000</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl shadow-slate-200/50">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                                <p className="text-slate-500 text-lg mb-8">We'll get back to you shortly.</p>
                                <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {status === 'error' && (
                                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                                        <AlertCircle size={16} />
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium placeholder:text-slate-400"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium placeholder:text-slate-400"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium placeholder:text-slate-400"
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium placeholder:text-slate-400 resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button type="submit" disabled={status === 'loading'} className="w-full btn-primary">
                                    {status === 'loading' ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>Send Message <Send size={20} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
