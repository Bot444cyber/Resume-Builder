import React from 'react';
import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ModernTemplate6: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-[#fcf9f6] mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-900">
            {/* Main Content Grid */}
            <div className="grid grid-cols-12 h-full min-h-[297mm]">

                {/* Left Column: Photo & Summary */}
                <div className="col-span-4 relative flex flex-col">
                    {/* Top fluid shape background */}
                    <div className="absolute top-0 left-0 w-full h-[65%] bg-[#1a1a1a] rounded-br-[80px] z-0"></div>

                    {/* Bottom sidebar "RESUME" text decorative */}
                    <div className="absolute bottom-0 left-0 w-16 h-full flex items-end pb-12 justify-center z-10 pointer-events-none">
                        <h1 className="text-[120px] font-black text-slate-200 opacity-20 transform -rotate-90 tracking-widest origin-bottom-left whitespace-nowrap">
                            RESUME
                        </h1>
                    </div>

                    <div className="relative z-20 p-8 pt-12 flex-1 flex flex-col">
                        {/* Profile Photo Area */}
                        <div className="mb-8 mx-auto w-full max-w-[200px] aspect-[3/4] rounded-[40px] overflow-hidden border-4 border-[#262626] shadow-2xl relative group bg-gray-800">
                            {data.profileImage ? (
                                <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-500">
                                    <span className="text-4xl">IMG</span>
                                </div>
                            )}
                        </div>

                        {/* Summary / Quote Section */}
                        <div className="mt-8 mb-12 relative text-white">
                            <span className="text-6xl font-black absolute -top-8 -left-2 font-serif opacity-80" style={{ color: data.accentColor }}>“</span>
                            <div className="relative z-10 text-sm font-medium leading-relaxed opacity-90 pl-4">
                                <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                            </div>
                            <span className="text-6xl font-black absolute -bottom-12 right-0 font-serif opacity-80 rotate-180" style={{ color: data.accentColor }}>“</span>
                        </div>

                        {/* Skills (Left Column Version) */}
                        <div className="mt-auto pl-8 pr-2 pb-12">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-[#1a1a1a] mb-6 flex items-center gap-2">
                                <span className="w-8 h-1" style={{ backgroundColor: data.accentColor }}></span>
                                <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                            </h3>
                            <div className="space-y-4">
                                {skillsList.map((skill, i) => (
                                    <div key={skill.id || i} className="group">
                                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                        </div>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map((dot) => (
                                                <div
                                                    key={dot}
                                                    className={`h-2 flex-1 rounded-full transition-all ${((skill.level || 0) / 20) >= dot ? '' : 'opacity-20'}`}
                                                    style={{ backgroundColor: ((skill.level || 0) / 20) >= dot ? '#1a1a1a' : '#d1d5db' }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Name, Contact, Main Content */}
                <div className="col-span-8 flex flex-col">

                    {/* Header Area */}
                    <div className="relative bg-[#fcf9f6] z-10 pt-16 pr-12 pb-8 pl-8">
                        <h1 className="text-7xl font-black tracking-tight text-[#1a1a1a] leading-[0.9] mb-8">
                            <span className="block"><EditableItem value={data.name.split(' ')[0]} onChange={(val) => onUpdate('name', val)} /></span>
                            <span className="block"><EditableItem value={data.name.split(' ').slice(1).join(' ')} onChange={(val) => onUpdate('name', val)} /></span>
                        </h1>
                    </div>

                    {/* Fluid Connector Shape & Contact Bar */}
                    <div className="relative h-32 w-full mb-12">
                        {/* The connector shape from left col to right content */}
                        <div className="absolute left-[-2rem] top-0 bottom-0 w-[calc(100%+2rem)] bg-[#1a1a1a] rounded-tl-[60px] rounded-bl-[60px] p-6 flex items-center justify-between text-white pr-12 shadow-xl">
                            {/* Decorative Arrow */}
                            <div className="hidden sm:block ml-16">
                                <ArrowRight size={48} style={{ color: data.accentColor }} strokeWidth={1.5} />
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-2 items-end text-right text-xs opacity-90 font-medium tracking-wide">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest" style={{ borderColor: data.accentColor, color: data.accentColor }}>Contact</span>
                                    <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /> <Mail size={12} className="ml-1" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /> <Phone size={12} className="ml-1" />
                                </div>
                                {data.address && (
                                    <div className="flex items-center gap-2">
                                        <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /> <MapPin size={12} className="ml-1" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Sections */}
                    <div className="px-10 pb-16 space-y-12 flex-1 relative">
                        {/* Experience */}
                        <section>
                            <h3 className="text-2xl font-black uppercase text-[#1a1a1a] mb-8 flex items-baseline gap-4">
                                <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                                <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                            </h3>

                            <div className="space-y-10 border-l-2 border-slate-200 ml-3 pl-8 py-2 relative">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id} className="relative group">
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-125" style={{ backgroundColor: data.accentColor }}></div>

                                        <div className="grid grid-cols-12 gap-4 mb-2">
                                            <div className="col-span-3 text-xs font-bold uppercase tracking-widest pt-1 opacity-60">
                                                <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                            </div>
                                            <div className="col-span-9">
                                                <h4 className="text-xl font-bold text-[#1a1a1a] leading-tight mb-1">
                                                    <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                                </h4>
                                                <div className="text-sm font-bold opacity-70 mb-3" style={{ color: data.accentColor }}>
                                                    <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                                </div>
                                                <div className="text-sm text-slate-600 leading-relaxed">
                                                    <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-2xl font-black uppercase text-[#1a1a1a] mb-8 flex items-baseline gap-4">
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                                <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.education && data.education.map((edu) => (
                                    <div key={edu.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">
                                            <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                        </div>
                                        <h4 className="text-lg font-bold text-[#1a1a1a] mb-1">
                                            <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                        </h4>
                                        <div className="text-sm font-medium" style={{ color: data.accentColor }}>
                                            <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Custom Section */}
                        {data.customSectionTitle && (
                            <section>
                                <h3 className="text-2xl font-black uppercase text-[#1a1a1a] mb-6 flex items-baseline gap-4">
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                    <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                                </h3>
                                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
