import React from 'react';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { EditableItem } from '../../EditableItem';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ProfessionalTemplate3: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-bl-[100px] rounded-tl-[50px] z-0 opacity-10" style={{ backgroundColor: data.accentColor }}></div>
            <div className="absolute -left-20 bottom-0 w-[500px] h-[200px] rounded-tr-[100px] rounded-br-[50px] z-0 opacity-10" style={{ backgroundColor: data.accentColor }}></div>

            {/* Decor Elements */}
            <div className="absolute top-[280px] right-[50px] w-24 h-24 rotate-12 z-0 opacity-20" style={{ color: data.accentColor }}>
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,50 Q40,20 60,50 T90,50" stroke="currentColor" strokeWidth="15" fill="none" strokeLinecap="round" />
                </svg>
            </div>
            <div className="absolute bottom-[200px] right-[50px] w-32 h-64 z-0 opacity-10" style={{ color: data.accentColor }}>
                <svg viewBox="0 0 100 200" fill="currentColor">
                    <path d="M10,10 C50,50 50,150 10,190" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[150px] flex items-end opacity-90 z-0 pointer-events-none">
                <div className="w-1/3 h-24 rounded-tr-[80px] opacity-30" style={{ backgroundColor: data.accentColor }}></div>
                <div className="w-1/4 h-32 rounded-tl-[60px] rounded-tr-[40px] -ml-8 opacity-60" style={{ backgroundColor: data.accentColor }}></div>
            </div>


            <div className="relative z-10 p-12 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-16">
                    <div className="w-2/3 pt-8">
                        <h1 className="text-6xl font-black leading-tight mb-2 tracking-tight" style={{ color: data.accentColor }}>
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <p className="text-2xl font-bold mb-6 opacity-80" style={{ color: data.accentColor }}>
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </p>
                        <p className="text-slate-600 leading-relaxed max-w-lg font-medium whitespace-pre-wrap">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </p>
                    </div>
                    {/* Photo Placeholder */}
                    <div className="w-[180px] h-[180px] bg-slate-200 rounded-full mt-8 mr-8 border-4 border-white shadow-xl overflow-hidden relative" style={{ borderColor: 'white' }}>
                        {data.profileImage ? (
                            <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">
                                {data.name.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    {/* Main Content */}
                    <div className="col-span-8 space-y-10">
                        <section>
                            <h2 className="text-2xl font-black mb-6" style={{ color: data.accentColor }}>
                                <EditableItem value={data.sectionTitles?.experience || 'Work Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                            </h2>
                            <div className="space-y-8">
                                {data.experiences.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex flex-col mb-1">
                                            <h3 className="text-lg font-bold text-slate-900">
                                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />, <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                            </h3>
                                            <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70" style={{ color: data.accentColor }}>
                                                <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                            </span>
                                        </div>
                                        <div className="text-slate-600 leading-relaxed text-sm">
                                            <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black mb-6" style={{ color: data.accentColor }}>
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                            </h2>
                            <div className="space-y-6">
                                {data.education && data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /> at <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                        </h3>
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70" style={{ color: data.accentColor }}>
                                            <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {data.customSectionTitle && (
                            <section>
                                <h2 className="text-2xl font-black mb-6" style={{ color: data.accentColor }}>
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                </h2>
                                <div className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-10">
                        <section>
                            <h2 className="text-xl font-black mb-4" style={{ color: data.accentColor }}>Details</h2>
                            <div className="text-sm font-medium text-slate-600 space-y-2">
                                <div className="break-words font-bold"><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                                <div><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                                {data.address && <div><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-4" style={{ color: data.accentColor }}>
                                <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                            </h2>
                            <div className="space-y-4">
                                {skillsList.map((skill, i) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-700 mb-1">
                                            <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full">
                                            <div className="h-full rounded-full" style={{ width: `${skill.level || 85}%`, backgroundColor: data.accentColor }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
