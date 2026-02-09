import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { supabase } from '../../lib/supabaseClient';
import { CreditCard, ShieldCheck, MapPin, User, CheckCircle2, AlertCircle, Loader2, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { countries, states } from '../../data/locationData';

const CheckoutPage = () => {
    const { state } = useLocation();
    const { user, addCredits } = useAuth();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    const plan = state?.plan || { name: "Pro Bundle", credits: 100, price: 499 }; // Fallback for dev

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US", // Default to US
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === 'expiry') {
            // Remove non-digits
            const clean = value.replace(/\D/g, '');
            // Limit to 4 digits (MMYY)
            const truncated = clean.substring(0, 4);

            if (truncated.length >= 3) {
                value = `${truncated.substring(0, 2)}/${truncated.substring(2)}`;
            } else {
                value = truncated;
            }
        }

        if (name === 'cardNumber') {
            // Remove all non-digits
            const clean = value.replace(/\D/g, '');
            // Limit to 16 digits
            const truncated = clean.substring(0, 16);
            // Add space after every 4 digits
            const parts = [];
            for (let i = 0; i < truncated.length; i += 4) {
                parts.push(truncated.substring(i, i + 4));
            }
            value = parts.join(' ');
        }

        if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value, state: "" })); // Reset state on country change
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setError("");

        // Basic Validation Step 1
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.country) {
                setError("Please fill in all billing details.");
                return;
            }
            setStep(2);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Expiry Date Validation
        if (formData.expiry) {
            const [month, year] = formData.expiry.split('/');
            if (month && year) {
                const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1); // Month is 0-indexed
                const now = new Date();
                // set current date to 1st of the month to ignore day differences if in same month/year?? 
                // Actually credit cards expire at the end of the month, but let's just check if the month has passed.
                // A better check:
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1; // 1-12
                const expYear = 2000 + parseInt(year);
                const expMonth = parseInt(month);

                if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                    setError("Card has expired.");
                    setIsLoading(false);
                    return;
                }
            }
        }

        // Demo Card Validation
        if (formData.cardNumber.replace(/\s/g, "") !== "4242424242424242") {
            setError("Invalid Card. Use Demo Card: 4242 4242 4242 4242");
            setIsLoading(false);
            return;
        }

        try {
            // 1. Record Transaction in Supabase
            const { error: dbError } = await supabase
                .from('billing_details')
                .insert({
                    user_id: user.id,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip_code: formData.zipCode,
                    country: formData.country,
                    last_4_digits: "4242",
                    plan_purchased: plan.name,
                    amount: plan.price
                });

            if (dbError) throw dbError;

            // 2. Add Credits
            await addCredits(plan.credits);

            // 3. Success
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);

        } catch (err) {
            console.error(err);
            setError("Payment failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
                    <p className="text-slate-500 mb-6">Your order for {plan.name} has been processed and credits have been added to your account.</p>
                    <p className="text-sm text-slate-400">Redirecting to Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Secure Checkout</h1>
                    <div className="flex items-center justify-center gap-4 text-sm font-medium">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-100' : 'bg-slate-100'} `}>1</div>
                            Billing
                        </div>
                        <div className="w-12 h-[2px] bg-slate-200"></div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-100' : 'bg-slate-100'} `}>2</div>
                            Payment
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Left: Form */}
                    <div className="md:col-span-2 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                            {/* DEMO ALERT */}
                            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-yellow-200">
                                DEMO MODE
                            </div>

                            {step === 1 ? (
                                <form onSubmit={handleNext} className="space-y-6">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <MapPin size={20} />
                                        </div>
                                        Billing Address
                                    </h2>

                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                                    <input
                                                        type="text" name="firstName" required
                                                        value={formData.firstName} onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                        placeholder="John"
                                                    />
                                                </div>
                                            </div>
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                                    <input
                                                        type="text" name="lastName" required
                                                        value={formData.lastName} onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                        placeholder="Doe"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                                <input
                                                    type="text" name="address" required
                                                    value={formData.address} onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="123 Ai Street"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                                                <div className="relative">
                                                    <select
                                                        name="country" required
                                                        value={formData.country} onChange={handleInputChange}
                                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none"
                                                    >
                                                        <option value="" disabled>Select Country</option>
                                                        {countries.map(c => (
                                                            <option key={c.code} value={c.code}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                                                <div className="relative">
                                                    <select
                                                        name="state" required
                                                        value={formData.state} onChange={handleInputChange}
                                                        disabled={!formData.country}
                                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none disabled:bg-slate-100 disabled:text-slate-400"
                                                    >
                                                        <option value="" disabled>Select State</option>
                                                        {formData.country && states[formData.country]?.map(s => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                                                <input
                                                    type="text" name="city" required
                                                    value={formData.city} onChange={handleInputChange}
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="New York"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code</label>
                                                <input
                                                    type="text" name="zipCode" required
                                                    value={formData.zipCode} onChange={handleInputChange}
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="10001"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full btn-primary mt-8">
                                        Continue to Payment <ArrowRight size={18} />
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <CreditCard size={20} />
                                            </div>
                                            Payment Details
                                        </h2>
                                        <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
                                            <ArrowLeft size={16} /> Edit Billing
                                        </button>
                                    </div>

                                    {/* Revealable Demo Card */}
                                    <div className="mb-8">
                                        <details className="group">
                                            <summary className="list-none cursor-pointer">
                                                <div className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors w-full">
                                                    <AlertCircle size={16} />
                                                    <span>Click to view Demo Card Details</span>
                                                </div>
                                            </summary>

                                            <div className="mt-4 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-xl relative overflow-hidden max-w-sm mx-auto transform transition-all hover:scale-[1.02]">
                                                {/* Card Decoration */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>

                                                <div className="relative z-10 flex flex-col justify-between h-48">
                                                    <div className="flex justify-between items-start">
                                                        <div className="text-xs font-bold text-white/50 tracking-widest uppercase">Demo Bank</div>
                                                        <CreditCard className="text-white/80" />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                                                            <div className="font-mono text-xl tracking-widest text-shadow">4242 4242 4242 4242</div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData(prev => ({ ...prev, cardNumber: "4242 4242 4242 4242", expiry: "12/30", cvc: "123" }));
                                                                }}
                                                                className="text-xs bg-white text-slate-900 px-2 py-1 rounded font-bold hover:bg-blue-50 transition-colors"
                                                            >
                                                                Fill
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-between text-sm">
                                                            <div>
                                                                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Card Holder</div>
                                                                <div className="font-medium tracking-wide">Demo User</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Expires</div>
                                                                <div className="font-mono">12/30</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Cardholder Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                                <input
                                                    type="text" name="cardName" required
                                                    value={formData.cardName} onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="Name on Card"
                                                />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                                <input
                                                    type="text" name="cardNumber" required
                                                    maxLength={19}
                                                    value={formData.cardNumber} onChange={handleInputChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium font-mono"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                                                <input
                                                    type="text" name="expiry" required
                                                    maxLength={5}
                                                    value={formData.expiry} onChange={handleInputChange}
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">CVC</label>
                                                <input
                                                    type="tel" name="cvc" required
                                                    maxLength={3}
                                                    value={formData.cvc} onChange={handleInputChange}
                                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" disabled={isLoading} className="w-full btn-primary mt-8 disabled:opacity-70 disabled:cursor-not-allowed text-lg">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            <>
                                                Pay <span className="ml-1 opacity-90">{formatPrice(plan.price)}</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-32">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>
                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800">{plan.name}</p>
                                    <p className="text-sm text-slate-500">{plan.credits} Credits</p>
                                </div>
                                <span className="font-bold text-slate-900">{formatPrice(plan.price)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold text-slate-900 mb-6">
                                <span>Total</span>
                                <span>{formatPrice(plan.price)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                                <ShieldCheck size={16} className="text-green-600" />
                                <span>Secure 256-bit SSL Encrypted Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
