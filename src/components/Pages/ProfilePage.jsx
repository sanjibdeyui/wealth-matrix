import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Shield, Zap, Mail } from 'lucide-react';

const ProfilePage = () => {
    const { user, userData } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 h-32 relative">
                        <div className="absolute -bottom-12 left-8 w-24 h-24 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
                            <span className="text-3xl font-bold">{user.email.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">
                            {user.user_metadata?.full_name || "User"}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-500 mb-8">
                            <Mail size={16} /> {user.email}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Credits */}
                            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-orange-500 shadow-sm">
                                    <Zap size={24} className="fill-orange-500" />
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500 font-medium">Available Credits</span>
                                    <span className="block text-2xl font-bold text-slate-900">{userData.credits}</span>
                                </div>
                            </div>

                            {/* Plan */}
                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500 font-medium">Current Plan</span>
                                    <span className="block text-2xl font-bold text-slate-900 capitalize">{userData.plan}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
