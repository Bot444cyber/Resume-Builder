"use client";
import React, { useState } from 'react';
import { Wand2, Layout, FileText, Share2, Shield, Zap, Sparkles, ArrowRight, Check } from 'lucide-react';

const features = [
    {
        icon: Wand2,
        title: "AI-Powered Writing",
        description: "Generate professional content tailored to your industry with advanced AI that understands context and keywords.",
        color: "slate"
    },
    {
        icon: Layout,
        title: "Smart Formatting",
        description: "Automatically formatting layouts that pass ATS systems while looking visually stunning to recruiters.",
        color: "slate"
    },
    {
        icon: FileText,
        title: "Real-time Preview",
        description: "See your changes instantly as you type. No more guessing how your document will look when exported.",
        color: "slate"
    },
    {
        icon: Share2,
        title: "One-Click Export",
        description: "Download in PDF, Word, or TXT formats, or share a live link directly with recruiters.",
        color: "slate"
    },
    {
        icon: Shield,
        title: "ATS Optimization",
        description: "Built-in algorithms ensure your resume is parsed correctly by Applicant Tracking Systems.",
        color: "slate"
    },
    {
        icon: Zap,
        title: "Instant Feedback",
        description: "Get real-time scores and suggestions to improve your resume's impact and readability.",
        color: "slate"
    }
];

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-500">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-slate-200/50 dark:bg-white/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-gray-200/50 dark:bg-white/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-24 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 mb-6">
                        <Zap size={14} className="text-slate-900 dark:text-white" />
                        <span className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Powerful Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                        Everything you need to <br />
                        <span className="text-slate-500 underline decoration-slate-300 dark:decoration-slate-700">land your dream job</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                        Our platform combines cutting-edge AI with professional design principles to give you the competitive edge.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Features List */}
                    <div className="lg:col-span-5 space-y-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveFeature(index)}
                                className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer border ${activeFeature === index
                                    ? 'bg-slate-100/50 dark:bg-white/10 border-slate-200 dark:border-white/20'
                                    : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg transition-colors ${activeFeature === index
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow'
                                        }`}>
                                        <feature.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-bold transition-colors ${activeFeature === index ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-400'
                                            }`}>
                                            {feature.title}
                                        </h3>
                                        <div className={`overflow-hidden transition-all duration-300 ${activeFeature === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
                                            }`}>
                                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Product Preview - Desktop Right */}
                    <div className="lg:col-span-7 relative group perspective-1000">
                        {/* Background Accent */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-slate-200 to-gray-200 dark:from-white/5 dark:to-white/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>

                        <div className="bg-neutral-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transform group-hover:rotate-y-2 transition-transform duration-700 ease-out relative z-10">
                            {/* Fake OS Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-gray-800">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-600/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600/80"></div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full border border-white/5">
                                    <Sparkles size={10} className="text-slate-400" />
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI Editor Beta</span>
                                </div>
                                <div className="w-8"></div>
                            </div>

                            {/* Editor Workspace UI */}
                            <div className="flex h-[500px]">
                                {/* Editor Sidebar */}
                                <div className="w-1/3 border-r border-gray-800 p-6 space-y-6 hidden md:block bg-neutral-900">
                                    <div className="space-y-4">
                                        <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                                        <div className="h-10 w-full bg-gray-800 border border-gray-700 rounded-lg"></div>
                                        <div className="h-10 w-full bg-gray-800 border border-gray-700 rounded-lg"></div>
                                    </div>
                                    <div className="pt-6 space-y-4">
                                        <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="h-10 w-full bg-slate-600/10 text-slate-400 text-xs font-bold px-3 flex items-center justify-between rounded-lg border border-slate-500/20">
                                                <span>GENERATE WITH AI</span>
                                                <Sparkles size={14} />
                                            </div>
                                            <div className="h-10 w-full bg-gray-800/50 rounded-lg border border-gray-700"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Preview Area */}
                                <div className="flex-1 bg-black p-8 overflow-hidden relative">
                                    <div className="bg-white w-full h-[600px] shadow-2xl rounded-sm p-8 origin-top scale-95 transform transition-transform duration-700">
                                        <div className="flex gap-4 mb-8">
                                            <div className="w-12 h-12 bg-slate-200 rounded"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-1/2 bg-slate-900/10 rounded"></div>
                                                <div className="h-3 w-1/3 bg-slate-900/5 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="h-4 w-1/4 bg-blue-50 rounded"></div>
                                            <div className="space-y-2.5">
                                                <div className="h-2.5 w-full bg-slate-100 rounded"></div>
                                                <div className="h-2.5 w-full bg-slate-100 rounded"></div>
                                                <div className="h-2.5 w-3/4 bg-slate-100 rounded"></div>
                                            </div>
                                            <div className="pt-6">
                                                <div className="h-16 w-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex items-center justify-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors cursor-pointer">
                                                    <span>+ Add Experience</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature Highlights */}
                                    <div className="absolute bottom-8 right-8 space-y-3">
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700 text-white text-xs font-bold">
                                            <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-white">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <div>
                                                <div className="opacity-50 text-[10px] uppercase">Analysis</div>
                                                <div>ATS Score: 98%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-24">
                    <button className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-800 dark:hover:bg-gray-100 transition-all hover:-translate-y-1">
                        Let's build yours
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;
