import React from 'react';
import { ShieldCheck, Zap, Lock, Award } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: "Bank-Grade Security",
        description: "Your data is processed locally in your browser. We never store your personal financial details."
    },
    {
        icon: Zap,
        title: "Instant AI Analysis",
        description: "Get real-time insights powered by advanced algorithms that adapt to your inputs instantly."
    },
    {
        icon: Lock,
        title: "100% Privacy First",
        description: "No sign-up required for basic tools. We believe financial planning should be accessible to everyone."
    },
    {
        icon: Award,
        title: "Expert Verified",
        description: "Our calculation models are vetted by certified financial planners for maximum accuracy."
    }
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-50/50 -z-10 rounded-full blur-3xl opacity-60"></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">Why Choose Wealth Matrix</span>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Smart Tools for Smarter Money</h2>
                    <p className="text-slate-500">
                        We combine precision engineering with user-centric design to help you make the best financial decisions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
