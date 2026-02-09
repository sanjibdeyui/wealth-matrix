import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Mic, Globe, User } from 'lucide-react';

const VoiceDropdown = ({ voices, selectedVoice, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (voice) => {
        onChange(voice);
        setIsOpen(false);
    };

    // Group voices by language for better organization (optional, but nice)
    // For now, let's keep it simple list but styled well.

    if (voices.length === 0) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
                    ${isOpen
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                title="Select Voice"
            >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <User size={16} />
                </div>

                <div className="flex flex-col items-start mr-2">
                    <span className="text-sm font-bold text-slate-700 truncate max-w-[120px] sm:max-w-[160px]">
                        {selectedVoice ? selectedVoice.name.replace("Microsoft", "").replace("Google", "").replace("English", "").trim() : "Select Voice"}
                    </span>
                </div>

                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar">
                    <div className="p-2 sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-10">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Available Voices</span>
                    </div>

                    <div className="p-1 space-y-0.5">
                        {voices.map((voice) => {
                            const isSelected = selectedVoice?.name === voice.name;
                            return (
                                <button
                                    key={voice.name}
                                    onClick={() => handleSelect(voice)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                                        ${isSelected
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                                        ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}
                                    `}>
                                        <Mic size={14} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold truncate">
                                            {voice.name.replace("Microsoft", "").replace("Google", "").replace("English", "").trim()}
                                        </div>
                                        <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                                            <Globe size={10} /> {voice.lang}
                                        </div>
                                    </div>

                                    {isSelected && <Check size={14} className="text-blue-600 flex-shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceDropdown;
