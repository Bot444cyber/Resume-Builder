"use client";

import React, { useState } from 'react';
import { TemplateId } from '../../types';
import { Code, ChevronLeft, ChevronRight } from 'lucide-react';
import ResumeThumbnail from '../ResumeThumbnail';
import { TemplatePreview } from '../TemplatePreview';
import Link from 'next/link';

interface TemplateSliderProps {
    onSelect?: (slug: TemplateId) => void;
}

// Last 3 Modern + Last 3 Professional templates
const SLIDER_TEMPLATES = [
    { id: 'professional-4', name: 'Corporate Gray', category: 'Professional', description: 'Clean corporate styling' },
    { id: 'modern-5', name: 'Split Diagonal', category: 'Modern', description: 'Unique diagonal split layout' },
    { id: 'professional-5', name: 'Compact Tech', category: 'Professional', description: 'Tech-focused professional design' },
    { id: 'modern-3', name: 'Dark Modern', category: 'Modern', description: 'Bold dark theme with modern aesthetics' },
    { id: 'modern-4', name: 'Vibrant Pill', category: 'Modern', description: 'Colorful and creative design' },
    { id: 'professional-6', name: 'Bold Composition', category: 'Professional', description: 'Strong visual hierarchy' },
] as const;

const TemplateSlider: React.FC<TemplateSliderProps> = ({ onSelect }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    const next = () => setActiveIdx((prev) => (prev + 1) % SLIDER_TEMPLATES.length);
    const prev = () => setActiveIdx((prev) => (prev - 1 + SLIDER_TEMPLATES.length) % SLIDER_TEMPLATES.length);

    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-black py-12 px-6 overflow-hidden relative transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Professional Resume Templates
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Select from our expertly designed templates and customize to match your unique style
                    </p>
                </div>

                {/* Template Slider */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl hover:scale-110"
                        aria-label="Previous template"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl hover:scale-110"
                        aria-label="Next template"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Templates Display */}
                    <div className="relative overflow-hidden">
                        <div className="flex items-center justify-center gap-6 py-12 min-h-[550px]">
                            {SLIDER_TEMPLATES.map((template, idx) => {
                                const isActive = idx === activeIdx;
                                const offset = idx - activeIdx;

                                // Show only templates within range of -1 to +1
                                if (Math.abs(offset) > 1) return null;

                                return (
                                    <div
                                        key={template.id}
                                        className="transition-all duration-700 ease-out flex-shrink-0"
                                        style={{
                                            transform: `scale(${isActive ? 1 : 0.85})`,
                                            opacity: isActive ? 1 : 0.4,
                                            filter: isActive ? 'none' : 'blur(1px)'
                                        }}
                                    >
                                        <div className={`relative transition-all duration-500 ${isActive ? 'ring-4 ring-blue-500 shadow-2xl shadow-blue-500/50 rounded-2xl' : 'rounded-2xl'
                                            }`}>
                                            {/* Template Preview using ResumeThumbnail */}
                                            <Link href={`/editor?template=${template.id}`}>
                                                <ResumeThumbnail scale={0.26}>
                                                    <TemplatePreview templateId={template.id} />
                                                </ResumeThumbnail>
                                            </Link>

                                            {/* Overlay with CTA - Only on Active */}
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                                    <div className="text-white mb-4">
                                                        <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                                                        <p className="text-sm text-slate-300">{template.description}</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onSelect?.(template.id as TemplateId);
                                                        }}
                                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                                    >
                                                        Use This Template
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Template Info Below */}
                        <div className="text-center mt-6 min-h-[80px]">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {SLIDER_TEMPLATES[activeIdx].name}
                            </h3>
                            <p className="text-sm text-slate-400">
                                {SLIDER_TEMPLATES[activeIdx].category} • {SLIDER_TEMPLATES[activeIdx].description}
                            </p>
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {SLIDER_TEMPLATES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={`transition-all duration-300 rounded-full ${idx === activeIdx
                                    ? 'w-8 h-2 bg-blue-500'
                                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                                    }`}
                                aria-label={`Go to template ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TemplateSlider;