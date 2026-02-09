import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { User, MapPin, Trash2, Edit2, Loader2, AlertCircle, CreditCard, Clock, FileText } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const BillingPage = () => {
    const { user } = useAuth();
    const { formatPrice } = useCurrency();
    const [billingHistory, setBillingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Edit State (Simplification: Only Edit Address for last record or "Profile" logic)
    // Actually, usually you edit your "Saved Method" or view "Invoices".
    // Requirement: "display, delete and edit / update there details"
    // We'll interpret this as managing the "Transactions" or a "Billing Profile".
    // Given the request said "separate table to store paid user details", it implies a transaction log.
    // BUT "update DETAILS" implies profile.
    // Let's list the transactions, and allow editing/deleting specific entries (like cancelling a record or fixing a typo in history? uncommon but requested).
    // Better interpretation: The user has a "Billing Profile" (latest details) and a "History".
    // We will show the list from `billing_details`.

    useEffect(() => {
        if (user) {
            fetchBillingDetails();
        }
    }, [user]);

    const fetchBillingDetails = async () => {
        try {
            const { data, error } = await supabase
                .from('billing_details')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBillingHistory(data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load billing details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this billing record?")) return;

        try {
            const { error } = await supabase
                .from('billing_details')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setBillingHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete record");
        }
    };

    // For Edit: We'll just have a simple inline or prompt for address to keep it simple as a "detail update"
    const handleEditAddress = async (id, currentAddress) => {
        const newAddress = prompt("Update Address:", currentAddress);
        if (newAddress && newAddress !== currentAddress) {
            try {
                const { error } = await supabase
                    .from('billing_details')
                    .update({ address: newAddress })
                    .eq('id', id);

                if (error) throw error;
                // Refresh local
                setBillingHistory(prev => prev.map(item => item.id === id ? { ...item, address: newAddress } : item));
            } catch (err) {
                console.error(err);
                alert("Failed to update address");
            }
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Billing & Transactions</h1>

                {isLoading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin mx-auto text-blue-600" size={40} />
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                        <AlertCircle size={20} /> {error}
                    </div>
                ) : billingHistory.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                        <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No Transactions Yet</h3>
                        <p className="text-slate-500">Your billing history and details will appear here after your first purchase.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {billingHistory.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-md group">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        {item.plan_purchased}
                                        <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{new Date(item.created_at).toLocaleDateString()}</span>
                                    </h3>
                                    <div className="text-sm text-slate-500 space-y-1">
                                        <p className="flex items-center gap-2"><User size={14} /> {item.full_name}</p>
                                        <p className="flex items-center gap-2"><MapPin size={14} /> {item.address}, {item.city}, {item.country}</p>
                                        <p className="flex items-center gap-2"><CreditCard size={14} /> Card ending in •••• {item.last_4_digits}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-slate-900">{formatPrice(item.amount)}</span>
                                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded uppercase tracking-wide">Paid</span>
                                    </div>
                                    <div className="flex items-center gap-2 pl-6 border-l border-slate-100">
                                        <a
                                            href={`/invoice/${item.id}`}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Invoice"
                                        >
                                            <FileText size={18} />
                                        </a>
                                        <button
                                            onClick={() => handleEditAddress(item.id, item.address)}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Address"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Record"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillingPage;
