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
                    <div className="relative overflow-hidden pt-8 pb-12">
                        <div className="flex items-center justify-center gap-4 sm:gap-8 py-4 sm:py-8 min-h-[450px] sm:min-h-[600px] perspective-1000">
                            {SLIDER_TEMPLATES.map((template, idx) => {
                                // Calculate circular offset
                                let offset = idx - activeIdx;
                                const len = SLIDER_TEMPLATES.length;

                                // Handle wrapping
                                if (offset > len / 2) offset -= len;
                                if (offset < -len / 2) offset += len;

                                // Show only active and immediate neighbors
                                if (Math.abs(offset) > 1) return null;

                                const isActive = offset === 0;
                                const direction = offset > 0 ? 1 : -1;

                                return (
                                    <div
                                        key={template.id}
                                        className="transition-all duration-700 ease-out absolute top-1/2 left-1/2 w-full max-w-[280px] sm:max-w-[320px]"
                                        style={{
                                            transform: `
                                                translate(-50%, -50%) 
                                                translateX(${offset * 110}%) 
                                                scale(${isActive ? 1 : 0.85}) 
                                                perspective(1000px) rotateY(${isActive ? 0 : -direction * 15}deg)
                                            `,
                                            zIndex: isActive ? 20 : 10,
                                            opacity: isActive ? 1 : 0.6,
                                            filter: isActive ? 'none' : 'blur(1px) grayscale(30%)'
                                        }}
                                    >
                                        <div className={`relative transition-all duration-500 group card-shine ${isActive
                                            ? 'ring-[6px] ring-black/10 dark:ring-white/20 shadow-2xl rounded-2xl scale-100 hover:scale-[1.02]'
                                            : 'rounded-2xl shadow-xl'
                                            }`}>

                                            {/* Template Preview using ResumeThumbnail */}
                                            <Link href={`/editor?template=${template.id}`} className="block relative overflow-hidden rounded-2xl bg-white">
                                                <div className="transition-transform duration-700 ease-out group-hover:scale-110 scale-[1] sm:scale-100 origin-top">
                                                    <ResumeThumbnail scale={0.4}>
                                                        <TemplatePreview templateId={template.id} />
                                                    </ResumeThumbnail>
                                                </div>

                                                {/* Professional Hover Overlay */}
                                                <div className={`absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-8 sm:pb-12 gap-4 sm:gap-6 ${!isActive ? 'hidden' : ''}`}>

                                                    {/* Staggered Text */}
                                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75 text-center px-4 sm:px-6">
                                                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2 tracking-tight">{template.name}</h3>
                                                        <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-lg">{template.category}</p>
                                                    </div>

                                                    {/* Feature Pills */}
                                                    <div className="flex gap-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-150">
                                                        <span className="px-2 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-[10px] sm:text-xs font-medium text-slate-700 dark:text-white">ATS Friendly</span>
                                                        <span className="px-2 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-[10px] sm:text-xs font-medium text-slate-700 dark:text-white">Professional</span>
                                                    </div>

                                                    {/* Action Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onSelect?.(template.id as TemplateId);
                                                        }}
                                                        className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out delay-200 bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full shadow-lg hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
                                                    >
                                                        Use Template
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Template Info Below */}
                        <div className="text-center mt-2 sm:mt-6 min-h-[60px] sm:min-h-[80px]">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                                {SLIDER_TEMPLATES[activeIdx].name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 px-4">
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