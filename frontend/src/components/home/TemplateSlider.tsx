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
        <section className="bg-white dark:bg-black py-12 px-6 overflow-hidden relative transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-slate-300 dark:bg-slate-800 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 dark:bg-slate-800 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Professional Resume Templates
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Select from our expertly designed templates and customize to match your unique style
                    </p>
                </div>

                {/* Template Slider */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all shadow-xl hover:scale-110"
                        aria-label="Previous template"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all shadow-xl hover:scale-110"
                        aria-label="Next template"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Templates Display */}
                    <div className="relative overflow-hidden">
                        <div className="flex items-center justify-center gap-8 py-12 min-h-[650px]">
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
                                            transform: `scale(${isActive ? 1 : 0.85}) translateY(${isActive ? '0px' : '20px'})`,
                                            opacity: isActive ? 1 : 0.5,
                                            filter: isActive ? 'none' : 'blur(2px) grayscale(50%)',
                                            zIndex: isActive ? 10 : 0
                                        }}
                                    >
                                        <div className={`relative transition-all duration-500 group card-shine ${isActive
                                            ? 'ring-[6px] ring-black/10 dark:ring-white/20 shadow-2xl rounded-2xl scale-100 hover:scale-[1.02]'
                                            : 'rounded-2xl shadow-xl'
                                            }`}>

                                            {/* Template Preview using ResumeThumbnail */}
                                            <Link href={`/editor?template=${template.id}`} className="block relative overflow-hidden rounded-2xl">
                                                <div className="transition-transform duration-700 ease-out group-hover:scale-110 scale-[0.75] sm:scale-100">
                                                    <ResumeThumbnail scale={0.45}>
                                                        <TemplatePreview templateId={template.id} />
                                                    </ResumeThumbnail>
                                                </div>

                                                {/* Professional Hover Overlay */}
                                                <div className={`absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-12 gap-6 ${!isActive ? 'hidden' : ''}`}>

                                                    {/* Staggered Text */}
                                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75 text-center px-6">
                                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{template.name}</h3>
                                                        <p className="text-slate-600 dark:text-slate-300 font-medium text-lg">{template.category}</p>
                                                    </div>

                                                    {/* Feature Pills */}
                                                    <div className="flex gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-150">
                                                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs font-medium text-slate-700 dark:text-white">ATS Friendly</span>
                                                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs font-medium text-slate-700 dark:text-white">Professional</span>
                                                    </div>

                                                    {/* Action Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onSelect?.(template.id as TemplateId);
                                                        }}
                                                        className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out delay-200 bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 flex items-center gap-2"
                                                    >
                                                        Use Template
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Template Info Below */}
                        <div className="text-center mt-6 min-h-[80px]">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {SLIDER_TEMPLATES[activeIdx].name}
                            </h3>
                            <p className="text-sm text-slate-500">
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
                                    ? 'w-8 h-2 bg-slate-900 dark:bg-white'
                                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
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