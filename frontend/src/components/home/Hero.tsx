import React from 'react';
import { ArrowRight, Sparkles, Wand2, ArrowUpRight } from 'lucide-react';

interface HeroProps {
    onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    return (
        <section className="relative min-h-[140vh] flex flex-col justify-start pt-32 lg:pt-40 bg-white dark:bg-[#020617] overflow-hidden text-slate-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-500">

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Moving Grid - White in Dark Mode, Slate in Light Mode */}
                <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-white bg-[size:50px_50px] opacity-[0.5] dark:opacity-[0.07] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)] animate-grid-move"></div>

                {/* Spotlight / Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-24 relative z-10 flex flex-col items-center text-center">

                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-xl shadow-black/5 dark:shadow-black/20">
                    <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 border border-white dark:border-[#020617]" />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-gray-300 pl-2">Trusted by 100,000+ professionals</span>
                </div>

                {/* Headlines */}
                <div className="max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-blue-50 dark:to-gray-400">
                        Build your CV <br className="hidden sm:block" />
                        smarter, faster, better
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        AI-powered resume builder tailored to your dream job. <br className="hidden sm:block" />
                        Get matched with the right keywords, tone, and layout — in minutes.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <button
                        onClick={onStart}
                        className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-all shadow-[0_0_40px_-5px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1"
                    >
                        Build my CV
                    </button>
                    <button className="w-full sm:w-auto px-10 py-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-bold text-lg transition-all backdrop-blur-sm hover:border-slate-300 dark:hover:border-white/20">
                        Request demo
                    </button>
                </div>

                {/* 3D Visual Section */}
                <div className="relative w-full max-w-5xl mx-auto perspective-[1200px] group pb-20">

                    {/* The 3D Resume Card */}
                    <div className="relative w-[300px] sm:w-[500px] h-[400px] sm:h-[650px] mx-auto bg-white rounded-2xl transform-style-3d rotate-x-[20deg] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-[8px] border-b-0 border-slate-100 dark:border-[#020617] overflow-hidden transition-all duration-700 hover:rotate-x-[15deg] group-hover:scale-[1.02]">

                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-white/40 to-transparent z-20 pointer-events-none"></div>

                        {/* Content mimicry */}
                        <div className="relative p-8 sm:p-12 space-y-8 bg-slate-50 h-full overflow-hidden text-left">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4 w-2/3">
                                    <h3 className="text-3xl font-bold text-slate-900">Penelope Sterling</h3>
                                    <div className="text-blue-600 font-medium">Senior Visualizer</div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Innovative visual designer with 7+ years of experience brand identity, digital marketing, and UI/UX design.
                                    </p>
                                </div>
                                <div className="w-20 h-20 bg-slate-200 rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100">
                                    <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-3">Professional Experience</h4>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                                        <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100 opacity-60">
                                    <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-3">Education</h4>
                                    <div className="space-y-3">
                                        <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom fade for distinct "cut off" look in 3D */}
                        <div className="absolute bottom-0 w-full h-40 bg-linear-to-t from-white dark:from-[#020617] via-white/80 dark:via-[#020617]/80 to-transparent z-10"></div>
                    </div>

                    {/* Floating Intelligence Badges */}

                    {/* Badge 1: Tone Analysis (Left) */}
                    <div className="absolute top-[20%] -left-4 sm:left-[5%] lg:-left-10 bg-white/80 dark:bg-[#0f111a]/80 border border-blue-500/20 p-4 rounded-xl shadow-xl flex items-center gap-4 backdrop-blur-md animate-float z-30 max-w-[220px] transition-transform hover:scale-105 hover:border-blue-500/40 text-left">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 box-border">
                            <Wand2 size={18} className="text-blue-500 dark:text-blue-400" />
                        </div>
                        <div className="text-xs">
                            <div className="text-slate-500 dark:text-gray-400 font-medium mb-0.5">Tone Analysis</div>
                            <div className="text-slate-900 dark:text-white font-semibold">"Managed projects..."</div>
                        </div>
                    </div>

                    {/* Badge 2: Keyword Match (Right) */}
                    <div className="absolute top-[35%] -right-4 sm:right-[5%] lg:-right-10 bg-white/80 dark:bg-[#0f111a]/80 border border-green-500/20 p-4 rounded-xl shadow-xl flex items-center gap-4 backdrop-blur-md animate-float-alt z-30 max-w-[220px] transition-transform hover:scale-105 hover:border-green-500/40 text-left">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 box-border">
                            <Sparkles size={18} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-xs">
                            <div className="text-slate-500 dark:text-gray-400 font-medium mb-0.5">Impact Score</div>
                            <div className="text-slate-900 dark:text-white font-semibold">+24% Conversion</div>
                        </div>
                    </div>

                    {/* Badge 3: Match Percent (Bottom Center) - glowing visual */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
                        <div className="px-6 py-2 bg-blue-600 rounded-full font-bold text-lg text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/50">
                            67% Match
                        </div>
                        <div className="w-[400px] h-[100px] bg-blue-600/20 blur-[80px] rounded-full pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                </div>

                {/* Bottom Text/Scroller */}
                <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 pb-20">
                    <p className="text-slate-400 dark:text-gray-500 text-sm font-medium tracking-widest uppercase mb-8">Trusted by industry leaders</p>
                    <div className="flex justify-center gap-12 opacity-30 grayscale mix-blend-multiply dark:mix-blend-screen">
                        {/* Simple placeholder logos */}
                        <div className="h-6 w-24 bg-slate-400 dark:bg-white rounded"></div>
                        <div className="h-6 w-24 bg-slate-400 dark:bg-white rounded"></div>
                        <div className="h-6 w-24 bg-slate-400 dark:bg-white rounded"></div>
                        <div className="h-6 w-24 bg-slate-400 dark:bg-white rounded"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
