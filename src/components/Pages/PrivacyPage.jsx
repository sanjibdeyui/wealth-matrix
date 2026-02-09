import React from 'react';
import { ScrollText } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white p-8 md:p-16 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <ScrollText size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
                            <p className="text-slate-500 text-sm">Last updated: October 26, 2023</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-600">
                        <p>Welcome to Wealth Matrix. We respect your privacy and are committed to protecting your personal data.</p>

                        <h3>1. Information We Collect</h3>
                        <p>We collect information you provide directly to us when you create an account, use our tools, or communicate with us.</p>

                        <h3>2. Data We Collect</h3>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Identity Data:</strong> Name, username, or similar identifiers.</li>
                            <li><strong>Contact Data:</strong> Email address and billing address.</li>
                            <li><strong>Financial Data:</strong> Inputs provided to our calculators (processed ephemerally).</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                        </ul>

                        <h3>3. How We Use Your Data</h3>
                        <p>Your data is used solely to:</p>
                        <ul>
                            <li>Provide and maintain our Service</li>
                            <li>Notify you about changes to our Service</li>
                            <li>Provide customer support</li>
                            <li>Gather analysis to improve our Service</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>
                            We adhere to industry-standard security protocols. All financial data is encrypted in transit using SSL technology.
                            We do not sell your personal data to third parties.
                        </p>

                        <h3>5. Your Legal Rights</h3>
                        <p>
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
                            including the right to request access, correction, erasure, or transfer of your data.
                        </p>

                        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-sm mb-0">
                                <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@wealthmatrix.com">privacy@wealthmatrix.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
