"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import ResumeThumbnail from '../../components/ResumeThumbnail';
import { TemplatePreview } from '../../components/TemplatePreview';

const templates = [
    { id: 'basic-1', name: 'Classic Basic', category: 'Basic', color: 'bg-white' },
    { id: 'basic-2', name: 'Bold Basic', category: 'Basic', color: 'bg-white' },
    { id: 'basic-3', name: 'Centered Basic', category: 'Basic', color: 'bg-white' },
    { id: 'basic-4', name: 'Minimalist Grid', category: 'Basic', color: 'bg-white' },
    { id: 'basic-5', name: 'Monochrome Edge', category: 'Basic', color: 'bg-white' },
    { id: 'basic-6', name: 'Clean Columns', category: 'Basic', color: 'bg-white' },
    { id: 'modern-1', name: 'Teal Modern', category: 'Modern', color: 'bg-teal-50' },
    { id: 'modern-2', name: 'Indigo Modern', category: 'Modern', color: 'bg-indigo-5' },
    { id: 'modern-3', name: 'Dark Modern', category: 'Modern', color: 'bg-slate-900' },
    { id: 'modern-4', name: 'Vibrant Pill', category: 'Modern', color: 'bg-fuchsia-50' },
    { id: 'modern-5', name: 'Split Diagonal', category: 'Modern', color: 'bg-slate-800' },
    { id: 'professional-1', name: 'Blue Professional', category: 'Professional', color: 'bg-white' },
    { id: 'professional-2', name: 'Sidebar Professional', category: 'Professional', color: 'bg-white' },
    { id: 'professional-3', name: 'Minimal Executive', category: 'Professional', color: 'bg-white' },
    { id: 'professional-4', name: 'Corporate Gray', category: 'Professional', color: 'bg-slate-100' },
    { id: 'professional-5', name: 'Compact Tech', category: 'Professional', color: 'bg-sky-50' },
    { id: 'professional-6', name: 'Bold Composition', category: 'Professional', color: 'bg-yellow-400' },
];

const categories = [
    { id: 'Basic', title: 'Basic & Clean', description: 'Simple, distraction-free layouts perfect for conservative industries.', icon: '📄', color: 'bg-slate-100 dark:bg-slate-800/50' },
    { id: 'Modern', title: 'Modern & Creative', description: 'Stand out with visual flair, color accents, and unique layouts.', icon: '🎨', color: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'Professional', title: 'Professional & Executive', description: 'Polished, authoritative designs for senior roles and corporate environments.', icon: '💼', color: 'bg-blue-50 dark:bg-blue-900/20' },
];

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredTemplates = selectedCategory
        ? templates.filter(t => t.category === selectedCategory)
        : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Navbar />

            <main className="py-20 px-6 min-h-[80vh]">
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

                {/* Category Selection View */}
                {!selectedCategory && (
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`group cursor-pointer rounded-3xl p-10 text-center border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${cat.color} ${cat.id === 'Modern' ? 'border-indigo-100 dark:border-indigo-800' : 'border-slate-200 dark:border-slate-800'}`}
                            >
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{cat.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{cat.description}</p>
                                <div className="mt-8 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Templates <span>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filtered Templates View with ResumeThumbnail */}
                {selectedCategory && (
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold transition-colors"
                        >
                            ← Back to Categories
                        </button>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {filteredTemplates.map((template) => (
                                <div key={template.id} className="flex flex-col items-center">
                                    {/* ResumeThumbnail with Anti-Gravity Effect */}
                                    <Link href={`/editor?template=${template.id}`} className="block mb-6">
                                        <ResumeThumbnail scale={0.26}>
                                            <TemplatePreview templateId={template.id} />
                                        </ResumeThumbnail>
                                    </Link>

                                    {/* Template Info */}
                                    <div className="text-center">
                                        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{template.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">{template.category}</p>
                                        <Link
                                            href={`/editor?template=${template.id}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            Use This Template
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
