import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Rahul Sharma",
        role: "Small Business Owner",
        content: "The SIP calculator helped me plan my mutual fund investments accurately. I finally know how much I need to save for my goal!",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Software Engineer",
        content: "I love the clean design and the AI insights. It breaks down complex financial terms into simple advice I can actually use.",
        rating: 5
    },
    {
        name: "Amit Verma",
        role: "Marketing Specialist",
        content: "Retirement planning was always scary for me, but this tool made it visualized and manageable. Highly recommended.",
        rating: 4
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">Testimonials</span>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Thousands</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-300"}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-6 italic">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                                    <span className="text-xs text-slate-500">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
