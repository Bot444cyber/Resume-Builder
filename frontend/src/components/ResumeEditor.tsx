import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Experience, ResumeData, TemplateId, ResumeSection } from '../types';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

// Template Imports
import { BasicTemplate1 } from './templates/basic/BasicTemplate1';
import { BasicTemplate2 } from './templates/basic/BasicTemplate2';
import { BasicTemplate3 } from './templates/basic/BasicTemplate3';
import { BasicTemplate4 } from './templates/basic/BasicTemplate4';
import { BasicTemplate5 } from './templates/basic/BasicTemplate5';
import { BasicTemplate6 } from './templates/basic/BasicTemplate6';
import { ModernTemplate1 } from './templates/modern/ModernTemplate1';
import { ModernTemplate2 } from './templates/modern/ModernTemplate2';
import { ModernTemplate3 } from './templates/modern/ModernTemplate3';
import { ModernTemplate4 } from './templates/modern/ModernTemplate4';
import { ModernTemplate5 } from './templates/modern/ModernTemplate5';
import { ProfessionalTemplate1 } from './templates/professional/ProfessionalTemplate1';
import { ProfessionalTemplate2 } from './templates/professional/ProfessionalTemplate2';
import { ProfessionalTemplate3 } from './templates/professional/ProfessionalTemplate3';
import { ProfessionalTemplate4 } from './templates/professional/ProfessionalTemplate4';
import { ProfessionalTemplate5 } from './templates/professional/ProfessionalTemplate5';
import { ProfessionalTemplate6 } from './templates/professional/ProfessionalTemplate6';

const INITIAL_DATA: ResumeData = {
    name: "Ishaan Agarwal",
    title: "Marketing Director",
    email: "ishaan@example.com",
    phone: "+91 99 5555 3345",
    summary: "Results-oriented Marketing Director with over 10 years of experience in driving brand growth and high-impact digital campaigns. Expert in strategic planning, team leadership, and multi-channel marketing optimization.",
    experiences: [
        { id: '1', company: 'ZARA', role: 'Retail Sales Associate', dates: '2021 - Present', desc: 'Increased monthly sales by 15% by effectively upselling and cross-selling products. Demonstrated excellent teamwork and customer relationship management skills.' },
        { id: '2', company: 'Dunkin Donuts', role: 'Barista', dates: '2019 - 2021', desc: 'Managed high-volume customer flow during peak hours with efficiency and accuracy. Maintained a clean and organized workspace while delivering premium service.' }
    ],
    skills: "Strategic Planning, Team Leadership, Digital Marketing, SEO/SEM, Content Strategy, Brand Management, Analytics, CRM Management",
    accentColor: "#2563eb",
    templateId: 'modern-1',
    sectionOrder: ['summary', 'experience', 'skills']
};

const PRESET_COLORS = [
    "#2563eb", "#1e293b", "#059669", "#dc2626", "#7c3aed", "#ea580c", "#0891b2", "#4f46e5"
];

const ResumeEditor: React.FC<{ onBack: () => void, initialTemplate: TemplateId }> = ({ onBack, initialTemplate }) => {
    // If initialTemplate is passed as 'modern' or legacy, map it to new ones or use as is if updated
    const mapLegacyTemplate = (id: string): TemplateId => {
        if (id === 'modern') return 'modern-1';
        if (id === 'classic') return 'basic-1';
        if (id === 'professional') return 'professional-1';
        return id as TemplateId;
    };

    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const [data, setData] = useState<ResumeData>({ ...INITIAL_DATA, templateId: mapLegacyTemplate(initialTemplate) });
    const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai'>('content');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [zoom, setZoom] = useState(0.8);

    const rewriteWithAi = async (field: 'summary' | 'desc', experienceId?: string) => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            alert("AI features require an API Key. Please create a .env.local file with NEXT_PUBLIC_GEMINI_API_KEY=your_key");
            return;
        }

        setIsAiLoading(true);
        try {
            const genAI = new GoogleGenAI({ apiKey });
            const targetText = experienceId
                ? data.experiences.find(e => e.id === experienceId)?.desc
                : data.summary;

            const response = await genAI.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: `Rewrite this resume ${field === 'summary' ? 'professional summary' : 'job description'} to be more impactful, outcome-oriented, and professional for a high-level job application. Keep it concise. Original: "${targetText}"`,
            });

            if (response.text) {
                if (experienceId) {
                    updateExp(experienceId, 'desc', response.text.trim());
                } else {
                    setData({ ...data, summary: response.text.trim() });
                }
            }
        } catch (err) {
            console.error("AI Generation failed", err);
            alert("AI Generation failed. See console for details.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const updateExp = (id: string, field: keyof Experience, value: string) => {
        setData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    const renderTemplate = () => {
        const props = { data };
        switch (data.templateId) {
            case 'basic-1': return <BasicTemplate1 {...props} />;
            case 'basic-2': return <BasicTemplate2 {...props} />;
            case 'basic-3': return <BasicTemplate3 {...props} />;
            case 'basic-4': return <BasicTemplate4 {...props} />;
            case 'basic-5': return <BasicTemplate5 {...props} />;
            case 'basic-6': return <BasicTemplate6 {...props} />;
            case 'modern-1': return <ModernTemplate1 {...props} />;
            case 'modern-2': return <ModernTemplate2 {...props} />;
            case 'modern-3': return <ModernTemplate3 {...props} />;
            case 'modern-4': return <ModernTemplate4 {...props} />;
            case 'modern-5': return <ModernTemplate5 {...props} />;
            case 'professional-1': return <ProfessionalTemplate1 {...props} />;
            case 'professional-2': return <ProfessionalTemplate2 {...props} />;
            case 'professional-3': return <ProfessionalTemplate3 {...props} />;
            case 'professional-4': return <ProfessionalTemplate4 {...props} />;
            case 'professional-5': return <ProfessionalTemplate5 {...props} />;
            case 'professional-6': return <ProfessionalTemplate6 {...props} />;
            default: return <ModernTemplate1 {...props} />;
        }
    };

    const inputClasses = "w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white";
    const labelClasses = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden font-sans transition-colors duration-300">
            {/* Top Bar for Editor */}
            <header className="no-print h-14 md:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 md:px-6 shrink-0 z-20 transition-colors duration-300">
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <button onClick={onBack} className="flex items-center gap-1 md:gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-xs md:text-sm font-bold">
                        <span>←</span>
                        <span className="hidden sm:inline">Back to Templates</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                    <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                    <span className="hidden md:block font-bold text-slate-900 dark:text-white">Untitled Resume</span>
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                    >
                        {isDark ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
                    </button>
                    <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm">-</button>
                    <span className="hidden sm:block text-xs md:text-sm font-mono text-slate-500 dark:text-slate-400 w-10 md:w-12 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm">+</button>
                    <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 md:mx-2"></div>
                    <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-colors shadow-sm flex items-center gap-1 md:gap-2">
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-30"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Left Sidebar - Inputs */}
                <div className={`
                    no-print
                    fixed md:relative inset-y-0 left-0 z-40
                    w-full sm:w-[380px] md:w-[420px] 
                    bg-white dark:bg-slate-900 
                    border-r border-slate-200 dark:border-slate-800 
                    flex flex-col shrink-0 
                    shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] 
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-900 dark:text-white">Edit Resume</span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Tabs */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 gap-1 bg-white dark:bg-slate-900">
                        <button onClick={() => setActiveTab('content')} className={`flex-1 py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'content' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>Content</button>
                        <button onClick={() => setActiveTab('design')} className={`flex-1 py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'design' ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>Design</button>
                        <button onClick={() => setActiveTab('ai')} className={`flex-1 py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'ai' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>AI</button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
                        {activeTab === 'content' && (
                            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                {/* Personal Info */}
                                <section className="space-y-3 md:space-y-4">
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Personal Details</h3>
                                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                                        <div><label className={labelClasses}>Full Name</label><input className={inputClasses} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></div>
                                        <div><label className={labelClasses}>Job Title</label><input className={inputClasses} value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div><label className={labelClasses}>Email</label><input className={inputClasses} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} /></div>
                                            <div><label className={labelClasses}>Phone</label><input className={inputClasses} value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} /></div>
                                        </div>
                                    </div>
                                </section>

                                {/* Summary */}
                                <section className="space-y-3 md:space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Summary</h3>
                                        <button onClick={() => rewriteWithAi('summary')} className="text-[9px] md:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase flex items-center gap-1">✨ AI</button>
                                    </div>
                                    <textarea rows={5} className={inputClasses} value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} />
                                </section>

                                {/* Experience */}
                                <section className="space-y-3 md:space-y-4">
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Experience</h3>
                                    <div className="space-y-3 md:space-y-4">
                                        {data.experiences.map(exp => (
                                            <div key={exp.id} className="p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                                    <div><label className={labelClasses}>Company</label><input className={inputClasses} value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} /></div>
                                                    <div><label className={labelClasses}>Dates</label><input className={inputClasses} value={exp.dates} onChange={e => updateExp(exp.id, 'dates', e.target.value)} /></div>
                                                </div>
                                                <div className="mb-3"><label className={labelClasses}>Role</label><input className={inputClasses} value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} /></div>
                                                <div>
                                                    <div className="flex justify-between mb-1.5">
                                                        <label className={labelClasses}>Description</label>
                                                        <button onClick={() => rewriteWithAi('desc', exp.id)} className="text-[9px] md:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase">✨ AI</button>
                                                    </div>
                                                    <textarea rows={3} className={inputClasses} value={exp.desc} onChange={e => updateExp(exp.id, 'desc', e.target.value)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Skills */}
                                <section className="space-y-3 md:space-y-4 pb-6">
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Skills</h3>
                                    <textarea rows={3} className={inputClasses} value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} placeholder="Comma separated skills..." />
                                </section>
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                <section>
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white mb-4 md:mb-6">Accent Color</h3>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {PRESET_COLORS.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setData({ ...data, accentColor: color })}
                                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-transform hover:scale-110 ${data.accentColor === color ? 'border-slate-900 dark:border-white scale-110 ring-2 ring-slate-200 dark:ring-slate-700' : 'border-transparent'}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 md:space-y-6 pt-10 opacity-70">
                                <div className="text-5xl md:text-6xl">🤖</div>
                                <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">AI Assistant Ready</h3>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xs px-4">Use the ✨ buttons in the Content tab to instantly rewrite sections of your resume.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Preview - Canvas */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-auto flex items-start justify-center p-4 md:p-8 lg:p-12 relative transition-colors duration-300 no-print">
                    <div
                        className="print-container bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-out origin-top w-full max-w-[210mm]"
                        style={{
                            transform: `scale(${zoom})`,
                            minHeight: '297mm'
                        }}
                    >
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;
