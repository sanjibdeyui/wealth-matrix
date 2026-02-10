import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { useCurrency } from '../../context/CurrencyContext';
import { Loader2, ArrowLeft, Printer, Download, CreditCard, MapPin, Brain } from 'lucide-react';

const InvoicePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user && id) {
            fetchInvoice();
        }
    }, [user, id]);

    const fetchInvoice = async () => {
        try {
            const { data, error } = await supabase
                .from('billing_details')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Security check: ensure the invoice belongs to the user (RLS should handle this, but good to be safe)
            if (data.user_id !== user.id) {
                throw new Error("Unauthorized access to this invoice.");
            }

            setInvoice(data);
        } catch (err) {
            console.error(err);
            setError("Invoice not found or access denied.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (error || !invoice) {
        return (
            <div className="min-h-screen pt-32 container mx-auto px-6 text-center">
                <div className="p-4 bg-red-50 text-red-600 rounded-xl inline-block mb-4">
                    {error || "Invoice not found"}
                </div>
                <br />
                <button onClick={() => navigate('/billing')} className="text-blue-600 font-bold hover:underline">
                    Back to Billing
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Actions Bar */}
                <div className="flex justify-between items-center mb-8 no-print">
                    <button
                        onClick={() => navigate('/billing')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Billing
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium shadow-sm transition-colors"
                        >
                            <Printer size={18} /> Print Invoice
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-600/20 transition-colors">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>

                {/* Invoice Paper */}
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 print:shadow-none print:border-none print:p-0">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                <Brain size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Wealth Matrix Inc.</h1>
                                <p className="text-slate-500 text-sm">Automated Invoice Receipt</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-4xl font-bold text-slate-200 mb-2">INVOICE</h2>
                            <p className="text-slate-500 font-mono">#{invoice.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Billed To</h3>
                            <div className="space-y-1 text-slate-800">
                                <p className="font-bold text-lg">{invoice.full_name}</p>
                                <p className="text-slate-500 flex items-start gap-2">
                                    <MapPin size={16} className="mt-1 flex-shrink-0 opacity-50" />
                                    {invoice.address}<br />{invoice.city}, {invoice.country}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Invoice Date</h3>
                                <p className="font-medium text-slate-900">{new Date(invoice.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {invoice.status || 'Paid'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Method</h3>
                                <p className="font-medium text-slate-900 flex items-center gap-2">
                                    <CreditCard size={16} /> •••• {invoice.last_4_digits || '4242'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mb-12">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                    <th className="text-right py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr>
                                    <td className="py-6">
                                        <p className="font-bold text-slate-900 text-lg mb-1">{invoice.plan_purchased}</p>
                                        <p className="text-slate-500 text-sm">Credit purchase for Wealth Matrix platform.</p>
                                    </td>
                                    <td className="py-6 text-right font-bold text-slate-900 text-lg">
                                        {formatPrice(invoice.amount)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Total */}
                    <div className="border-t border-slate-100 pt-8 flex justify-end">
                        <div className="w-full max-w-xs space-y-4">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span>{formatPrice(invoice.amount)}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Tax (0%)</span>
                                <span>{formatPrice(0)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold text-slate-900 border-t border-slate-100 pt-4">
                                <span>Total</span>
                                <span>{formatPrice(invoice.amount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center pt-8 border-t border-slate-100 text-slate-400 text-sm">
                        <p>Thank you for your business.</p>
                        <p className="mt-2 text-xs">If you have any questions about this invoice, please contact support@wealthmatrix.com</p>
                    </div>
                </div>
            </div>

            <style type="text/css" media="print">
                {`
                @page { size: auto;  margin: 0mm; }
                .no-print { display: none !important; }
                body { background: white; }
                `}
            </style>
        </div>
    );
};

export default InvoicePage;




