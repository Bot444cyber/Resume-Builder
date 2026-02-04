import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';

interface ModernResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ModernTemplate1: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const titles = data.sectionTitles || { summary: "Professional Profile", experience: "Visual History", skills: "Skill Proficiency", education: "Education" };
    // Backward compatibility for skills
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-50 mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Geometric Decorations */}
            {/* Geometric Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full z-0 opacity-10" style={{ backgroundColor: data.accentColor }}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-tr-full z-0 opacity-10" style={{ backgroundColor: data.accentColor }}></div>

            {/* Header */}
            <header className="text-white p-12 pb-24 relative clip-path-slant" style={{ backgroundColor: data.accentColor }}>
                <div className="relative z-10 flex gap-8 items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center text-4xl font-black overflow-hidden relative">
                        {data.profileImage ? (
                            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            data.name.charAt(0)
                        )}
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <p className="text-xl font-medium tracking-widest uppercase text-white/80">
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </p>
                    </div>
                </div>

                {/* Contact Bar */}
                <div className="absolute -bottom-8 right-12 bg-white text-slate-800 p-6 shadow-xl rounded-xl flex gap-8 items-center text-sm font-bold z-20">
                    <div className="flex items-center gap-2">
                        <Mail size={16} style={{ color: data.accentColor }} />
                        <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} style={{ color: data.accentColor }} />
                        <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} style={{ color: data.accentColor }} />
                        <span>Remote / NY</span>
                    </div>
                </div>
            </header>

            <div className="p-12 pt-16 grid grid-cols-12 gap-10 relative z-10">
                {/* Left Column */}
                <div className="col-span-8 space-y-10">
                    <section>
                        <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.accentColor }}></span>
                            <EditableItem value={titles.summary} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="text-slate-600 leading-relaxed">
                            <EditableItem
                                value={data.summary}
                                onChange={(val) => onUpdate('summary', val)}
                                multiline
                                className="w-full"
                                tagName="p"
                            />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.accentColor }}></span>
                            <EditableItem value={titles.experience} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-8 border-l-2 pl-8 ml-1.5 tablet-timeline" style={{ borderColor: `${data.accentColor}33` }}>
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[39px] top-1.5 w-5 h-5 bg-white border-4 rounded-full" style={{ borderColor: data.accentColor }}></div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </h3>
                                        <span className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-500 mb-3">
                                        <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        <EditableItem
                                            value={exp.desc}
                                            onChange={(val) => onExpUpdate(exp.id, 'desc', val)}
                                            multiline
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-4 space-y-10">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-black text-slate-800 mb-6">
                            <EditableItem value={titles.skills} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                {skillsList.slice(0, 6).map((skill, i) => (
                                    <div key={skill.id || i}>
                                        <div className="flex justify-between text-xs font-bold mb-1.5">
                                            <EditableItem
                                                value={skill.name}
                                                onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null}
                                            />
                                            <div className="flex" style={{ color: data.accentColor }}>
                                                <EditableItem
                                                    value={skill.level.toString()}
                                                    onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'level', parseInt(val) || 0) : null}
                                                    className="w-8 text-right"
                                                />
                                                <span>%</span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${skill.level}%`, backgroundColor: data.accentColor }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-black text-slate-800 mb-4">
                            <EditableItem value={titles.education} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-sm">
                                        <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                    </div>
                                    <div className="text-xs mb-1" style={{ color: data.accentColor }}>
                                        <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                    </div>
                                    <div className="text-xs font-bold opacity-75" style={{ color: data.accentColor }}>
                                        <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
