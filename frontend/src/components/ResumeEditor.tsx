import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Experience, ResumeData, TemplateId, ResumeSection, Education, Skill } from '../types';
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
    address: "New York, NY",
    summary: "Results-oriented Marketing Director with over 10 years of experience in driving brand growth and high-impact digital campaigns. Expert in strategic planning, team leadership, and multi-channel marketing optimization.",
    customSectionTitle: "Professional Skills",
    customSectionContent: "Communication\n- Developed strategies\n- Managed teams\n\nManagement\n- Boosted sales\n- POS operations",
    experiences: [
        { id: '1', company: 'ZARA', role: 'Retail Sales Associate', dates: '2021 - Present', desc: 'Increased monthly sales by 15% by effectively upselling and cross-selling products. Demonstrated excellent teamwork and customer relationship management skills.' },
        { id: '2', company: 'Dunkin Donuts', role: 'Barista', dates: '2019 - 2021', desc: 'Managed high-volume customer flow during peak hours with efficiency and accuracy. Maintained a clean and organized workspace while delivering premium service.' }
    ],
    education: [
        { id: '1', school: 'Rhode Island School of Design', degree: 'Bachelor of Design', dates: '2016 - 2020' }
    ],
    skills: "Strategic Planning, Team Leadership, Digital Marketing, SEO/SEM, Content Strategy, Brand Management, Analytics, CRM Management",
    skillsDetail: [
        { id: '1', name: 'Strategic Planning', level: 85 },
        { id: '2', name: 'Team Leadership', level: 80 },
        { id: '3', name: 'Digital Marketing', level: 75 },
        { id: '4', name: 'SEO/SEM', level: 70 },
        { id: '5', name: 'Content Strategy', level: 65 }
    ],
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    sectionTitles: {
        summary: "Professional Profile",
        experience: "Visual History",
        skills: "Skill Proficiency",
        education: "Education"
    },
    accentColor: "#2563eb",
    templateId: 'modern-1',
    sectionOrder: ['summary', 'experience', 'skills']
};

const COLOR_PALETTES = {
    "Classic": [
        "#2563eb", // Blue
        "#4f46e5", // Indigo
        "#1e293b", // Slate
        "#64748b", // Slate Light
    ],
    "Vibrant": [
        "#db2777", // Pink
        "#ea580c", // Orange
        "#7c3aed", // Violet
        "#9333ea", // Purple
        "#be123c", // Rose
    ],
    "Nature": [
        "#059669", // Emerald
        "#16a34a", // Green
        "#0891b2", // Cyan
        "#155e75", // Cyan Dark
        "#84cc16", // Lime
        "#ca8a04", // Gold
    ],
    "Dark & Elegant": [
        "#0f172a", // Slate 900
        "#18181b", // Zinc 900
        "#312e81", // Indigo 900
        "#881337", // Rose 900
        "#14532d", // Green 900
        "#4a044e", // Fuchsia 900
    ]
};



interface TemplateConfig {
    hasProfileImage: boolean;
    hasSummary: boolean;
    hasSkills: boolean;
    hasEducation: boolean;
    hasExperience: boolean;
    hasAddress: boolean;
    hasCustomSection: boolean;
}

const DEFAULT_CONFIG: TemplateConfig = {
    hasProfileImage: true,
    hasSummary: true,
    hasSkills: true,
    hasEducation: true,
    hasExperience: true,
    hasAddress: true,
    hasCustomSection: false
};

const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
    // Basic Templates
    'basic': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: false },
    'basic-1': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: false },
    'basic-2': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: false },
    'basic-3': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    'basic-4': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true },
    'basic-5': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    'basic-6': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    // Modern Templates
    'modern': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true },
    'modern-1': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true },
    'modern-2': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    'modern-3': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    'modern-4': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    'modern-5': { ...DEFAULT_CONFIG, hasProfileImage: false, hasAddress: true, hasCustomSection: true },
    // Professional Templates - Have Profile Image
    'professional': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-1': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-2': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-3': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-4': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-5': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
    'professional-6': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
};

const TEMPLATE_DEFAULT_COLORS: Record<string, string> = {
    'basic-1': '#2563eb', // Blue
    'basic-2': '#1e293b', // Slate
    'basic-3': '#059669', // Emerald
    'basic-4': '#7c3aed', // Violet
    'basic-5': '#ea580c', // Orange
    'basic-6': '#0891b2', // Cyan
    'modern-1': '#2563eb', // Blue
    'modern-2': '#db2777', // Pink/Magenta
    'modern-3': '#059669', // Emerald
    'modern-4': '#7c3aed', // Violet
    'modern-5': '#ea580c', // Orange
    'professional-1': '#4f46e5', // Indigo
    'professional-2': '#9333ea', // Purple
    'professional-3': '#0891b2', // Cyan
    'professional-4': '#be123c', // Rose
    'professional-5': '#ca8a04', // Yellow/Gold
    'professional-6': '#18181b', // Zinc/Black
};

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

    const [data, setData] = useState<ResumeData>(() => {
        const mappedId = mapLegacyTemplate(initialTemplate);
        return {
            ...INITIAL_DATA,
            templateId: mappedId,
            accentColor: TEMPLATE_DEFAULT_COLORS[mappedId] || INITIAL_DATA.accentColor,
            sectionTitles: {
                summary: "Professional Profile",
                experience: "Visual History",
                skills: "Skill Proficiency",
                education: "Education"
            }
        };
    });
    const currentConfig = TEMPLATE_CONFIGS[data.templateId] || DEFAULT_CONFIG;

    const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai'>('content');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [zoom, setZoom] = useState(0.8);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

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

    const updateEdu = (id: string, field: keyof Education, value: string) => {
        setData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    };

    const updateTitle = (section: keyof typeof data.sectionTitles, value: string) => {
        setData(prev => ({
            ...prev,
            sectionTitles: { ...prev.sectionTitles, [section]: value }
        }));
    };

    const updateSkillDetail = (id: string, field: keyof Skill, value: string | number) => {
        setData(prev => ({
            ...prev,
            skillsDetail: prev.skillsDetail.map(skill => skill.id === id ? { ...skill, [field]: value } : skill)
        }));
    };

    const handleUpdate = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const renderTemplate = () => {
        const props: any = {
            data,
            onUpdate: handleUpdate,
            onExpUpdate: updateExp,
            onEduUpdate: updateEdu,
            onTitleUpdate: updateTitle,
            onSkillUpdate: updateSkillDetail
        };
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

    const labelClasses = "block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";
    const inputClasses = "w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm";

    // Detect mobile for sidebar behavior
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 overflow-hidden ${isDark ? 'dark' : ''}`}>

            {/* Mobile Header */}
            <div className="md:hidden h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 shrink-0 z-50">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-slate-600 dark:text-slate-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="font-bold text-slate-900 dark:text-white text-sm">Resume Builder</h1>
                <button onClick={onBack} className="text-xs font-bold text-slate-500">Back</button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-56px)] md:h-screen relative">

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
                                        {currentConfig.hasProfileImage && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                                                    {data.profileImage ? (
                                                        <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <label className={labelClasses}>Profile Photo</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-800 dark:file:text-blue-400"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div><label className={labelClasses}>Full Name</label><input className={inputClasses} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></div>
                                        <div><label className={labelClasses}>Job Title</label><input className={inputClasses} value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div><label className={labelClasses}>Email</label><input className={inputClasses} value={data.email} onChange={e => setData({ ...data, email: e.target.value })} /></div>
                                            <div><label className={labelClasses}>Phone</label><input className={inputClasses} value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} /></div>
                                        </div>
                                        {currentConfig.hasAddress && (
                                            <div><label className={labelClasses}>Address</label><input className={inputClasses} value={data.address || ''} onChange={e => setData({ ...data, address: e.target.value })} /></div>
                                        )}
                                    </div>
                                </section>

                                {/* Summary */}
                                {currentConfig.hasSummary && (
                                    <section className="space-y-3 md:space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
                                                {data.sectionTitles?.summary || 'Summary'}
                                            </h3>
                                            <button onClick={() => rewriteWithAi('summary')} className="text-[9px] md:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase flex items-center gap-1">✨ AI</button>
                                        </div>
                                        <textarea rows={5} className={inputClasses} value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} />
                                    </section>
                                )}

                                {/* Experience */}
                                {currentConfig.hasExperience && (
                                    <section className="space-y-3 md:space-y-4">
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
                                            {data.sectionTitles?.experience || 'Experience'}
                                        </h3>
                                        <div className="space-y-3 md:space-y-4">
                                            {data.experiences?.map(exp => (
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
                                )}

                                {/* Skills */}
                                {currentConfig.hasSkills && (
                                    <section className="space-y-3 md:space-y-4 pb-6">
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
                                            {data.sectionTitles?.skills || 'Skills'}
                                        </h3>
                                        <textarea rows={3} className={inputClasses} value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} placeholder="Comma separated skills..." />
                                    </section>
                                )}

                                {/* Education */}
                                {currentConfig.hasEducation && (
                                    <section className="space-y-3 md:space-y-4 pb-6">
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
                                            {data.sectionTitles?.education || 'Education'}
                                        </h3>
                                        <div className="space-y-3 md:space-y-4">
                                            {data.education?.map(edu => (
                                                <div key={edu.id} className="p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                                    <div className="mb-3"><label className={labelClasses}>School</label><input className={inputClasses} value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} /></div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                                        <div><label className={labelClasses}>Degree</label><input className={inputClasses} value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} /></div>
                                                        <div><label className={labelClasses}>Dates</label><input className={inputClasses} value={edu.dates} onChange={e => updateEdu(edu.id, 'dates', e.target.value)} /></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Custom Section */}
                                {currentConfig.hasCustomSection && (
                                    <section className="space-y-3 md:space-y-4 pb-6">
                                        <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">
                                            Custom Section
                                        </h3>
                                        <div><label className={labelClasses}>Section Title</label><input className={inputClasses} value={data.customSectionTitle || ''} onChange={e => setData({ ...data, customSectionTitle: e.target.value })} placeholder="e.g. Professional Skills" /></div>
                                        <div><label className={labelClasses}>Content</label><textarea rows={5} className={inputClasses} value={data.customSectionContent || ''} onChange={e => setData({ ...data, customSectionContent: e.target.value })} placeholder="Content..." /></div>
                                    </section>
                                )}
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                <section className="space-y-4">
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Accent Color</h3>
                                    <div className="space-y-6">
                                        {Object.entries(COLOR_PALETTES).map(([category, colors]) => (
                                            <div key={category}>
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1">{category}</h4>
                                                <div className="grid grid-cols-6 gap-3">
                                                    {colors.map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setData({ ...data, accentColor: color })}
                                                            className={`w-full aspect-square rounded-full transition-all hover:scale-110 border-2 ${data.accentColor === color ? 'border-slate-900 dark:border-white scale-110 shadow-lg' : 'border-transparent'}`}
                                                            style={{ backgroundColor: color }}
                                                            title={color}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3 ml-1">Custom Color</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer group">
                                                <input
                                                    type="color"
                                                    value={data.accentColor}
                                                    onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                                                    className="absolute inset-0 w-full h-full cursor-pointer p-0 border-0 opacity-0"
                                                />
                                                <div
                                                    className="w-full h-full flex items-center justify-center font-bold text-white text-xs shadow-inner"
                                                    style={{ backgroundColor: data.accentColor }}
                                                >
                                                    Pick Color
                                                </div>
                                            </div>
                                            <div className="relative w-28 shrink-0">
                                                <input
                                                    type="text"
                                                    value={data.accentColor}
                                                    onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                                                    className="w-full h-10 pl-3 pr-2 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-mono font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                                                    placeholder="#000000"
                                                    maxLength={7}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white border-l-4 border-blue-500 pl-3">Layout</h3>
                                    {/* Layout controls can go here */}
                                    <p className="text-xs text-slate-500">More design controls coming soon.</p>
                                </section>
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <div className="space-y-6 text-center py-10 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl mb-4">
                                    <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Resume AI Assistant</h3>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-300">Use the ✨ AI buttons next to text fields to auto-improve your content.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Preview */}
                <div className="flex-1 bg-slate-200/50 dark:bg-slate-950 overflow-hidden relative flex flex-col">
                    {/* Toolbar */}
                    <div className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 shrink-0 no-print z-10">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500">-</button>
                            <span className="text-xs font-bold w-12 text-center text-slate-600 dark:text-slate-400">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500">+</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button onClick={() => window.print()} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar p-8 flex items-start justify-center">
                        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="shadow-2xl transition-transform duration-200 ease-out origin-top print-area">
                            {renderTemplate()}
                        </div>
                    </div>
                </div>
            </div>

            {isAiLoading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl flex flex-col items-center shadow-2xl">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="font-bold text-slate-800 dark:text-white">Generating...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeEditor;
