import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';

const CareersPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Join Wealth Matrix</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We're building the future of intelligent investing. If you're passionate about finance and AI, we'd love to meet you.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        { title: "Senior React Engineer", dept: "Engineering", type: "Remote", color: "blue" },
                        { title: "AI/ML Data Scientist", dept: "Data Science", type: "Remote", color: "purple" },
                        { title: "Product Designer (UI/UX)", dept: "Design", type: "Remote", color: "pink" },
                        { title: "Financial Analyst Consultant", dept: "Finance", type: "Hybrid", color: "emerald" }
                    ].map((job, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                <div className="flex gap-3 text-sm text-slate-500 mt-1">
                                    <span>{job.dept}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-slate-50 text-slate-700 font-bold rounded-lg border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors flex items-center gap-2">
                                Apply <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-slate-100 rounded-2xl p-8">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">Don't see the right role?</h3>
                    <p className="text-slate-500 mb-6">We're always looking for talent. Send us your resume.</p>
                    <a href="mailto:careers@wealthmatrix.com" className="text-blue-600 font-bold hover:underline">careers@wealthmatrix.com</a>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
