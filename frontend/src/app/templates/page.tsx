"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import ResumeThumbnail from '../../components/ResumeThumbnail';

import { TemplateCard } from '../../components/TemplateCard';

const templates = [
    { id: 'modern-1', name: 'Teal Modern', category: 'Modern', color: 'bg-slate-50' },
    { id: 'professional-1', name: 'Blue Professional', category: 'Professional', color: 'bg-white' },
    { id: 'basic-1', name: 'Classic Basic', category: 'Basic', color: 'bg-white' },
    { id: 'professional-4', name: 'Corporate Gray', category: 'Professional', color: 'bg-slate-50' },
    { id: 'modern-3', name: 'Dark Modern', category: 'Modern', color: 'bg-slate-900' },
    { id: 'basic-5', name: 'Monochrome Edge', category: 'Basic', color: 'bg-white' },
    { id: 'professional-2', name: 'Sidebar Professional', category: 'Professional', color: 'bg-white' },
    { id: 'basic-2', name: 'Bold Basic', category: 'Basic', color: 'bg-white' },
    { id: 'modern-5', name: 'Split Diagonal', category: 'Modern', color: 'bg-slate-800' },
    { id: 'professional-6', name: 'Bold Composition', category: 'Professional', color: 'bg-slate-100' },
    { id: 'basic-4', name: 'Minimalist Grid', category: 'Basic', color: 'bg-white' },
    { id: 'modern-2', name: 'Indigo Modern', category: 'Modern', color: 'bg-slate-50' },
    { id: 'professional-3', name: 'Minimal Executive', category: 'Professional', color: 'bg-white' },
    { id: 'basic-6', name: 'Clean Columns', category: 'Basic', color: 'bg-white' },
    { id: 'modern-4', name: 'Vibrant Pill', category: 'Modern', color: 'bg-slate-50' },
    { id: 'professional-5', name: 'Compact Tech', category: 'Professional', color: 'bg-slate-50' },
    { id: 'basic-3', name: 'Centered Basic', category: 'Basic', color: 'bg-white' },
    { id: 'modern-6', name: 'Golden Modern', category: 'Modern', color: 'bg-slate-50' },
];

const categories = [
    { id: 'Basic', title: 'Basic & Clean', description: 'Simple, distraction-free layouts perfect for conservative industries.', icon: '📄', color: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800' },
    { id: 'Modern', title: 'Modern & Creative', description: 'Stand out with visual flair and unique layouts for creative roles.', icon: '🎨', color: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800' },
    { id: 'Professional', title: 'Professional & Executive', description: 'Polished, authoritative designs for senior roles and corporate environments.', icon: '💼', color: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800' },
];

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <Navbar />

            <main className="py-20 px-4 md:px-6 min-h-[80vh] overflow-x-hidden">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        {selectedCategory ? `${selectedCategory} Templates` : 'Choose Your Style'}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {selectedCategory
                            ? 'Hover over any template to see the anti-gravity effect!'
                            : 'Select a category to browse our collection of professional resume templates.'}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    {/* Filter Bar */}
                    <div className="w-full max-w-sm md:max-w-2xl overflow-x-auto no-scrollbar pb-4 md:pb-0 mb-8 md:mb-16 px-4">
                        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative z-10 w-max mx-auto">
                            {['All', 'Basic', 'Modern', 'Professional'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedCategory(filter === 'All' ? null : filter)}
                                    className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${(filter === 'All' && !selectedCategory) || filter === selectedCategory
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-105'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                    {templates
                        .filter((t) => !selectedCategory || t.category === selectedCategory)
                        .map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                </div>
            </main >

            <Footer />
        </div >
    );
}
