
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { Sun, Moon, Sparkles, ArrowRight, FileDown, Trash2 } from 'lucide-react';
import { Experience, ResumeData, TemplateId, ResumeSection, Education, Skill } from '../types';
import * as aiService from '../services/ai';

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
import { ModernTemplate6 } from './templates/modern/ModernTemplate6';
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
    'modern-6': { ...DEFAULT_CONFIG, hasProfileImage: true, hasAddress: true, hasCustomSection: true },
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
    'modern-6': '#eab308', // Yellow/Gold
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

    // Optimize zoom for mobile on load
    // Optimize zoom for mobile on load
    useEffect(() => {
        const handleResize = () => {
            // "PC give it 80% and mobile make it 100%"
            if (window.innerWidth < 768) {
                setZoom(1.0);
            } else {
                setZoom(0.8);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // AI Scoring State
    const [aiScore, setAiScore] = useState<{ score: number, feedback: string[] } | null>(null);

    // AI Generator State
    const [aiJobTitle, setAiJobTitle] = useState('');
    const [aiJobCompany, setAiJobCompany] = useState('');

    // AI Full Generator State
    const [fullGenJobTitle, setFullGenJobTitle] = useState('');
    const [fullGenExpLevel, setFullGenExpLevel] = useState('');

    const resumeRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (resumeRef.current) {
            const height = resumeRef.current.scrollHeight;
            // Target Height: 980px (Safe buffer for Letter/A4 and printer margins)
            const maxPageHeight = 980;

            if (height > maxPageHeight) {
                const zoomFactor = maxPageHeight / height;
                // Apply zoom variable
                resumeRef.current.style.setProperty('--print-zoom', zoomFactor.toString());
            } else {
                resumeRef.current.style.removeProperty('--print-zoom');
            }
        }

        // Short delay to ensure styles apply
        setTimeout(() => {
            window.print();
        }, 500);
    };

    const handleDownloadPDF = () => {
        handlePrint();
    };

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
            setData({
                ...INITIAL_DATA,
                name: "",
                title: "",
                email: "",
                phone: "",
                address: "",
                summary: "",
                customSectionTitle: "",
                customSectionContent: "",
                experiences: [],
                education: [],
                skills: "",
                skillsDetail: [],
                profileImage: "",
                templateId: data.templateId, // Keep current template
                accentColor: data.accentColor // Keep current color
            });
        }
    };

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
        setIsAiLoading(true);
        try {
            const targetText = experienceId
                ? data.experiences.find(e => e.id === experienceId)?.desc
                : data.summary;

            if (!targetText) return;

            const newText = await aiService.rewriteText(targetText, field === 'summary' ? 'summary' : 'job description');

            if (experienceId) {
                updateExp(experienceId, 'desc', newText);
            } else {
                setData({ ...data, summary: newText });
            }
        } catch (err) {
            console.error("AI Generation failed", err);
            alert((err as Error).message);
        } finally {
            setIsAiLoading(false);
        }
    };

    const generateResumeScore = async () => {
        setIsAiLoading(true);
        try {
            const resumeContext = JSON.stringify({
                summary: data.summary,
                experiences: data.experiences,
                skills: data.skills,
                education: data.education
            });

            const result = await aiService.generateResumeScore(resumeContext);
            if (result) {
                setAiScore(result);
            }
        } catch (err) {
            console.error("AI Scoring failed", err);
            alert((err as Error).message);
        } finally {
            setIsAiLoading(false);
        }
    };

    const generateExperienceEntry = async () => {
        if (!aiJobTitle || !aiJobCompany) {
            alert("Please enter a job title and company.");
            return;
        }

        setIsAiLoading(true);
        try {
            const desc = await aiService.generateExperienceEntry(aiJobTitle, aiJobCompany);
            if (desc) {
                const newExp: Experience = {
                    id: Date.now().toString(),
                    company: aiJobCompany,
                    role: aiJobTitle,
                    dates: '2023 - Present',
                    desc
                };
                setData(prev => ({
                    ...prev,
                    experiences: [newExp, ...prev.experiences]
                }));
                setAiJobTitle('');
                setAiJobCompany('');
                setActiveTab('content');
            }
        } catch (err) {
            console.error("AI Generation failed", err);
            alert((err as Error).message);
        } finally {
            setIsAiLoading(false);
        }
    };

    const generateFullResume = async (jobTitle: string, experienceLevel: string) => {
        setIsAiLoading(true);
        try {
            const generatedData = await aiService.generateFullResume(jobTitle, experienceLevel);

            if (generatedData) {
                // Ensure IDs are strings and unique
                const cleanExperiences = generatedData.experiences?.map((exp: any, i: number) => ({
                    ...exp,
                    id: Date.now().toString() + i
                })) || [];

                const cleanEducation = generatedData.education?.map((edu: any, i: number) => ({
                    ...edu,
                    id: Date.now().toString() + i + 10
                })) || [];

                const cleanSkillsDetail = generatedData.skillsDetail?.map((skill: any, i: number) => ({
                    ...skill,
                    id: Date.now().toString() + i + 20
                })) || [];

                setData(prev => ({
                    ...prev,
                    ...generatedData,
                    experiences: cleanExperiences,
                    education: cleanEducation,
                    skillsDetail: cleanSkillsDetail,
                    templateId: prev.templateId, // Keep existing template
                    accentColor: prev.accentColor, // Keep existing color
                    sectionTitles: prev.sectionTitles // Keep existing titles
                }));
                setActiveTab('content');
            }
        } catch (err) {
            console.error("Full Resume Generation failed", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Generation failed: ${errorMessage}. Check console for details.`);
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
            case 'modern-6': return <ModernTemplate6 {...props} />;
            case 'professional-1': return <ProfessionalTemplate1 {...props} />;
            case 'professional-2': return <ProfessionalTemplate2 {...props} />;
            case 'professional-3': return <ProfessionalTemplate3 {...props} />;
            case 'professional-4': return <ProfessionalTemplate4 {...props} />;
            case 'professional-5': return <ProfessionalTemplate5 {...props} />;
            case 'professional-6': return <ProfessionalTemplate6 {...props} />;
            default: return <ModernTemplate1 {...props} />;
        }
    };

    const labelClasses = "block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";
    const inputClasses = "w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white transition-all shadow-sm placeholder:text-slate-300 dark:placeholder:text-slate-600";

    // Detect mobile for sidebar behavior
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`h-screen flex flex-col md:flex-row bg-white dark:bg-black overflow-hidden ${isDark ? 'dark' : ''}`}>

            {/* Mobile Header */}
            <div className="no-print md:hidden h-14 bg-white dark:bg-black border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 shrink-0 z-50">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-slate-900 dark:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <h1 className="font-black text-slate-900 dark:text-white text-sm tracking-tight">RESUME BUILDER</h1>
                <button onClick={onBack} className="text-xs font-bold text-slate-500">Back</button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-56px)] md:h-screen relative">

                {/* Left Sidebar - Inputs */}
                <div className={`
                    no-print
                    fixed md:relative inset-y-0 left-0 z-40
                    w-full sm:w-[380px] md:w-[420px] 
                    bg-white dark:bg-black 
                    border-r border-slate-100 dark:border-slate-800 
                    flex flex-col shrink-0 
                    shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] 
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">Edit Resume</span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Tabs */}
                    <div className="flex border-b border-slate-100 dark:border-slate-800 p-3 gap-2 bg-white dark:bg-black">
                        <button onClick={() => setActiveTab('content')} className={`flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${activeTab === 'content' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-md' : 'bg-white dark:bg-black text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900'}`}>Content</button>
                        <button onClick={() => setActiveTab('design')} className={`flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${activeTab === 'design' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-md' : 'bg-white dark:bg-black text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900'}`}>Design</button>
                        <button onClick={() => setActiveTab('ai')} className={`flex-1 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${activeTab === 'ai' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-md' : 'bg-white dark:bg-black text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900'}`}>AI</button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        {activeTab === 'content' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 ease-out">
                                {/* Personal Info */}
                                <section className="space-y-5">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">Personal Details</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {currentConfig.hasProfileImage && (
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                                    {data.profileImage ? (
                                                        <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] uppercase font-bold">No Photo</div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <label className={labelClasses}>Profile Photo</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-slate-900 file:text-white hover:file:bg-black transition-all cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div><label className={labelClasses}>Full Name</label><input className={inputClasses} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></div>
                                        <div><label className={labelClasses}>Job Title</label><input className={inputClasses} value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <section className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                                {data.sectionTitles?.summary || 'Summary'}
                                            </h3>
                                            <button onClick={() => rewriteWithAi('summary')} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-bold flex items-center gap-1.5 group">
                                                <Sparkles size={12} />
                                                <span className="text-[10px] uppercase tracking-wider">Rewrite</span>
                                            </button>
                                        </div>
                                        <textarea rows={5} className={`${inputClasses} resize-none`} value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} />
                                    </section>
                                )}

                                {/* Experience */}
                                {currentConfig.hasExperience && (
                                    <section className="space-y-4">
                                        <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                            {data.sectionTitles?.experience || 'Experience'}
                                        </h3>
                                        <div className="space-y-4">
                                            {data.experiences?.map(exp => (
                                                <div key={exp.id} className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                        <div><label className={labelClasses}>Company</label><input className={inputClasses} value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} /></div>
                                                        <div><label className={labelClasses}>Dates</label><input className={inputClasses} value={exp.dates} onChange={e => updateExp(exp.id, 'dates', e.target.value)} /></div>
                                                    </div>
                                                    <div className="mb-4"><label className={labelClasses}>Role</label><input className={inputClasses} value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} /></div>
                                                    <div>
                                                        <div className="flex justify-between mb-2">
                                                            <label className={labelClasses}>Description</label>
                                                            <button onClick={() => rewriteWithAi('desc', exp.id)} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-bold flex items-center gap-1.5 group">
                                                                <Sparkles size={12} />
                                                                <span className="text-[10px] uppercase tracking-wider">Rewrite</span>
                                                            </button>
                                                        </div>
                                                        <textarea rows={4} className={`${inputClasses} resize-none`} value={exp.desc} onChange={e => updateExp(exp.id, 'desc', e.target.value)} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Skills */}
                                {currentConfig.hasSkills && (
                                    <section className="space-y-4 pb-4">
                                        <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                            {data.sectionTitles?.skills || 'Skills'}
                                        </h3>
                                        <textarea rows={3} className={`${inputClasses} resize-none`} value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} placeholder="Comma separated skills..." />
                                    </section>
                                )}

                                {/* Education */}
                                {currentConfig.hasEducation && (
                                    <section className="space-y-4 pb-4">
                                        <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                            {data.sectionTitles?.education || 'Education'}
                                        </h3>
                                        <div className="space-y-4">
                                            {data.education?.map(edu => (
                                                <div key={edu.id} className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                                                    <div className="mb-4"><label className={labelClasses}>School</label><input className={inputClasses} value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} /></div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                                    <section className="space-y-4 pb-8">
                                        <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                            Custom Section
                                        </h3>
                                        <div><label className={labelClasses}>Section Title</label><input className={inputClasses} value={data.customSectionTitle || ''} onChange={e => setData({ ...data, customSectionTitle: e.target.value })} placeholder="e.g. Professional Skills" /></div>
                                        <div className="mt-4"><label className={labelClasses}>Content</label><textarea rows={5} className={`${inputClasses} resize-none`} value={data.customSectionContent || ''} onChange={e => setData({ ...data, customSectionContent: e.target.value })} placeholder="Content..." /></div>
                                    </section>
                                )}
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                                <section className="space-y-5">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">Accent Color</h3>
                                    <div className="space-y-6">
                                        {Object.entries(COLOR_PALETTES).map(([category, colors]) => (
                                            <div key={category}>
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{category}</h4>
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

                                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Custom Color</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-11 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer group hover:border-slate-300 transition-colors">
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
                                                    Tap to Pick
                                                </div>
                                            </div>
                                            <div className="relative w-32 shrink-0">
                                                <input
                                                    type="text"
                                                    value={data.accentColor}
                                                    onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                                                    className={`${inputClasses} font-mono uppercase text-center`}
                                                    placeholder="#000000"
                                                    maxLength={7}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">Layout</h3>
                                    {/* Layout controls can go here */}
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
                                        <p className="text-xs text-slate-500 font-bold">More controls coming soon</p>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <div className="space-y-8 py-6 animate-in fade-in slide-in-from-left-4 duration-500">
                                {/* Resume Scoring */}
                                <section className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                        Resume Score
                                    </h3>
                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800 text-center">
                                        {aiScore ? (
                                            <div className="animate-in zoom-in duration-300">
                                                <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="48" cy="48" r="40" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="8" fill="none" />
                                                        <circle
                                                            cx="48" cy="48" r="40"
                                                            className={`stroke-current ${aiScore.score >= 80 ? 'text-emerald-500' : aiScore.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}
                                                            strokeWidth="8"
                                                            fill="none"
                                                            strokeDasharray="251.2"
                                                            strokeDashoffset={251.2 - (251.2 * aiScore.score) / 100}
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <span className="absolute text-2xl font-black text-slate-900 dark:text-white">{aiScore.score}</span>
                                                </div>
                                                <div className="text-left space-y-2 mb-6">
                                                    {aiScore.feedback.map((item, i) => (
                                                        <div key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                                                            <span className="text-red-500 font-bold">•</span>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button onClick={generateResumeScore} className="text-xs font-bold underline text-slate-500 hover:text-slate-900 dark:hover:text-white">
                                                    Re-Analyze
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Sparkles size={20} className="text-slate-900 dark:text-white" />
                                                </div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Check Acceptance Rate</h4>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 px-4">
                                                    Get an instant analysis of your resume with a 0-100 score and actionable feedback.
                                                </p>
                                                <button
                                                    onClick={generateResumeScore}
                                                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg"
                                                >
                                                    Analyze Resume
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Content Generator */}
                                <section className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                        Content Generator
                                    </h3>
                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 space-y-4">
                                        <div>
                                            <label className={labelClasses}>Target Job Title</label>
                                            <input
                                                className={inputClasses}
                                                value={aiJobTitle}
                                                onChange={(e) => setAiJobTitle(e.target.value)}
                                                placeholder="e.g. Senior Product Manager"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Company Name</label>
                                            <input
                                                className={inputClasses}
                                                value={aiJobCompany}
                                                onChange={(e) => setAiJobCompany(e.target.value)}
                                                placeholder="e.g. Google"
                                            />
                                        </div>
                                        <button
                                            onClick={generateExperienceEntry}
                                            disabled={!aiJobTitle || !aiJobCompany}
                                            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Generate Entry
                                        </button>
                                        <p className="text-[10px] text-slate-400 text-center">
                                            Generates a new experience block with professional bullet points.
                                        </p>
                                    </div>
                                </section>

                                {/* Full Resume Generator */}
                                <section className="space-y-4">
                                    <h3 className="text-xs font-black text-slate-900 dark:text-white border-l-2 border-slate-900 dark:border-white pl-3 uppercase tracking-widest">
                                        Full Resume Generator
                                    </h3>
                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 space-y-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-[10px] flex gap-2">
                                            <Sparkles size={14} className="shrink-0 mt-0.5" />
                                            <p>Enter a role and experience level, and our AI will generate a complete, professional resume for you.</p>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Target Role</label>
                                            <input
                                                className={inputClasses}
                                                value={fullGenJobTitle}
                                                onChange={(e) => setFullGenJobTitle(e.target.value)}
                                                placeholder="e.g. Marketing Manager"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Experience Level</label>
                                            <input
                                                className={inputClasses}
                                                value={fullGenExpLevel}
                                                onChange={(e) => setFullGenExpLevel(e.target.value)}
                                                placeholder="e.g. Senior / 5 years"
                                            />
                                        </div>
                                        <button
                                            onClick={() => generateFullResume(fullGenJobTitle, fullGenExpLevel)}
                                            disabled={!fullGenJobTitle}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Sparkles size={16} />
                                            Generate Full Resume
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Preview */}
                <div className="flex-1 bg-slate-100 dark:bg-[#0a0a0a] overflow-hidden relative flex flex-col">
                    {/* Toolbar */}
                    <div className="h-16 bg-white dark:bg-black border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 no-print z-10 shadow-sm gap-2">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                            <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 transition-all font-bold">-</button>
                            <span className="text-[10px] sm:text-xs font-black w-8 sm:w-10 text-center text-slate-900 dark:text-white select-none">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 transition-all font-bold">+</button>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button onClick={toggleTheme} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white transition-all shrink-0">
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button onClick={handleClearData} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-all shrink-0" title="Clear All Data">
                                <Trash2 size={18} />
                            </button>
                            <button onClick={handleDownloadPDF} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-3 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 uppercase tracking-wider shrink-0">
                                <FileDown size={14} />
                                <span className="hidden lg:inline">One-Page PDF</span>
                            </button>
                            <button onClick={handlePrint} className="bg-slate-900 dark:bg-white text-white dark:text-black pl-4 pr-5 sm:pl-5 sm:pr-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 uppercase tracking-wider whitespace-nowrap">
                                <ArrowRight size={14} className="rotate-[-45deg]" />
                                <span>Export <span className="hidden sm:inline">PDF</span></span>
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar p-4 sm:p-8 lg:p-12 flex items-start bg-slate-100 dark:bg-[#0a0a0a]">
                        <div ref={resumeRef} style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', width: '210mm', minWidth: '210mm' }} className="m-auto shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] dark:shadow-none dark:border dark:border-slate-800 transition-transform duration-300 ease-out origin-top print-area bg-white text-left">
                            {renderTemplate()}
                        </div>
                    </div>
                </div>
            </div>

            {isAiLoading && (
                <div className="fixed inset-0 bg-white/80 dark:bg-black/80 z-50 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-black p-8 rounded-3xl flex flex-col items-center shadow-2xl border border-slate-100 dark:border-slate-800 max-w-sm text-center">
                        <div className="w-12 h-12 border-4 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">Refining Content</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Our AI is polishing your text to professional standards...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeEditor;
