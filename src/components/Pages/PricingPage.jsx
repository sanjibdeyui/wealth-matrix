import React from 'react';
import PricingSection from '../Layout/PricingSection';
import { HelpCircle } from 'lucide-react';

const PricingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32">
            <PricingSection />

            {/* FAQ Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do unused credits expire?", a: "No, your purchased credits never expire. Use them whenever you need." },
                            { q: "Can I upgrade anytime?", a: "Yes, you can purchase a larger pack at any time. Credits are cumulative." },
                            { q: "Is there a free trial?", a: "New users automatically get 20 credits for free to try out our tools." },
                            { q: "What is the refund policy?", a: "We offer a 14-day refund policy for unused credit packs." }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200">
                                <h3 className="flex items-start gap-3 font-bold text-slate-900 text-lg mb-2">
                                    <HelpCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                    {faq.q}
                                </h3>
                                <p className="text-slate-600 ml-8">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
