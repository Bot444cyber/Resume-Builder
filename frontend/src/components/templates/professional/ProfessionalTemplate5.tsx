import React from 'react';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { EditableItem } from '../../EditableItem';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, User, Target } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ProfessionalTemplate5: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-900">
            {/* Accent Circle Background */}
            <div className="absolute top-[50px] right-[50px] w-[500px] h-[500px] rounded-full z-0 opacity-20" style={{ backgroundColor: data.accentColor }}></div>

            <div className="relative z-10 p-16 pb-0 pt-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-24 gap-8">
                    <div className="bg-white p-12 rounded-[4rem] shadow-xl z-10 flex-1">
                        <h1 className="text-5xl font-black text-center leading-tight mb-2 text-balance">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <div className="text-center py-1 font-bold uppercase tracking-widest text-xs mx-auto w-fit px-4 text-white" style={{ backgroundColor: data.accentColor }}>
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </div>
                    </div>

                    <div className="w-[240px] h-[320px] overflow-hidden rounded-b-full rounded-t-lg shadow-2xl border-4 border-white shrink-0">
                        {data.profileImage ? (
                            <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-slate-300 bg-slate-100">
                                {data.name.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-16">

                    {/* Summary (Working Approach) */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md text-white" style={{ backgroundColor: data.accentColor }}>
                                <Briefcase size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">
                                <EditableItem value={data.sectionTitles?.summary || 'Profile'} onChange={(val) => onTitleUpdate('summary', val)} />
                            </h2>
                        </div>
                        <p className="text-sm font-medium text-slate-700 leading-loose text-justify whitespace-pre-wrap">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </p>
                    </div>

                    {/* Education */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md text-white" style={{ backgroundColor: data.accentColor }}>
                                <GraduationCap size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                                    <div className="text-xs font-mono opacity-70 mb-1"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                    <div className="text-sm"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience (Achievements slot originally) */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md text-white" style={{ backgroundColor: data.accentColor }}>
                                <Award size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">
                                <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                            </h2>
                        </div>
                        <div className="space-y-6 text-sm font-medium text-slate-700 leading-relaxed">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="font-bold"><EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} /></div>
                                    <div className="text-xs font-mono opacity-70 mb-1"><EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} /> | <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} /></div>
                                    <div className="text-sm"><EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Section or Skills (Outside Office slot) */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md text-white" style={{ backgroundColor: data.accentColor }}>
                                <Target size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">
                                <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skillsList.map((skill, i) => (
                                <span key={skill.id || i} className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200" style={{ backgroundColor: `${data.accentColor}10`, color: data.accentColor }}>
                                    <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                </span>
                            ))}
                        </div>

                        {data.customSectionTitle && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-2">
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                </h3>
                                <div className="text-sm text-slate-700 whitespace-pre-wrap">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 border-t border-slate-200 p-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: data.accentColor }}><Mail size={14} /></div>
                    <span className="text-xs font-bold"><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: data.accentColor }}><Phone size={14} /></div>
                    <span className="text-xs font-bold"><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></span>
                </div>
                {data.address && (
                    <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: data.accentColor }}><MapPin size={14} /></div>
                        <span className="text-xs font-bold"><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></span>
                    </div>
                )}
            </div>
        </div>
    );
};
