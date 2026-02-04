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

export const ProfessionalTemplate4: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-900 p-12">

            {/* Abstract Overlays - Using Accent Color with variations */}
            <div className="absolute top-[80px] left-[200px] w-[300px] h-[500px] rounded-[100px] transform -rotate-12 mix-blend-multiply z-0 filter blur-sm opacity-60" style={{ backgroundColor: data.accentColor }}></div>
            <div className="absolute top-[200px] left-[450px] w-[250px] h-[550px] rounded-full transform rotate-6 mix-blend-multiply z-0 filter blur-sm opacity-40" style={{ backgroundColor: data.accentColor }}></div>
            <div className="absolute bottom-[100px] right-[50px] w-[300px] h-[300px] rounded-full mix-blend-multiply z-0 filter blur-sm opacity-30" style={{ backgroundColor: data.accentColor }}></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <header className="flex justify-between items-start mb-16">
                    <h1 className="text-7xl font-light tracking-tight uppercase leading-none">
                        {data.name.split(' ').map((n, i) => (
                            <span key={i} className="block w-full text-balance"><EditableItem value={n} onChange={(val) => {
                                const names = data.name.split(' ');
                                names[i] = val;
                                onUpdate('name', names.join(' '));
                            }} /></span>
                        ))}
                    </h1>
                    <div className="w-24 h-24 bg-slate-200 rounded-sm overflow-hidden shadow-lg border-2 border-white">
                        {data.profileImage ? (
                            <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">
                                {data.name.charAt(0)}
                            </div>
                        )}
                    </div>
                </header>

                <div className="mb-16">
                    <h2 className="text-xl font-medium uppercase tracking-widest mb-4">
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </h2>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="text-sm font-medium leading-loose text-slate-800">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                        <div className="text-right text-sm font-light">
                            <div className="mb-2 font-bold"><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                            <div className="uppercase tracking-widest font-bold border-b-2 inline-block pb-1 mb-2" style={{ borderColor: data.accentColor }}>
                                <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                            </div>
                            {data.address && <div className="font-bold opacity-60"><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    <div className="col-span-7">
                        <section className="mb-12">
                            <h2 className="text-2xl font-light uppercase tracking-widest mb-8" style={{ color: data.accentColor }}>
                                <EditableItem value={data.sectionTitles?.experience || 'Employment History'} onChange={(val) => onTitleUpdate('experience', val)} />
                            </h2>
                            <div className="space-y-10">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2 bg-white/60 backdrop-blur-sm p-2 rounded shadow-sm">
                                            <h3 className="font-bold text-lg">
                                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                            </h3>
                                            <span className="text-xs font-mono font-bold" style={{ color: data.accentColor }}>
                                                <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                            </span>
                                        </div>
                                        <div className="mb-2 text-sm font-bold pl-2 opacity-70">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </div>
                                        <div className="text-sm leading-relaxed font-medium text-slate-800 pl-2">
                                            <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-light uppercase tracking-widest mb-8" style={{ color: data.accentColor }}>
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                            </h2>
                            <div className="space-y-6">
                                {data.education && data.education.map((edu) => (
                                    <div key={edu.id} className="pl-2">
                                        <h3 className="font-bold text-slate-800 text-lg">
                                            <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                        </h3>
                                        <div className="flex justify-between items-baseline">
                                            <div className="text-sm opacity-80"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                            <div className="text-xs font-bold" style={{ color: data.accentColor }}><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {data.customSectionTitle && (
                            <section>
                                <h2 className="text-2xl font-light uppercase tracking-widest mb-8" style={{ color: data.accentColor }}>
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                </h2>
                                <div className="text-sm leading-relaxed font-medium text-slate-800 pl-2 whitespace-pre-wrap">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-span-5">
                        <h2 className="text-2xl font-light uppercase tracking-widest mb-8 text-right" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="flex flex-col items-end gap-3">
                            {skillsList.map((skill, i) => (
                                <div key={skill.id || i} className="flex items-center gap-4 w-full justify-end bg-white/40 p-1 rounded backdrop-blur-sm">
                                    <span className="text-sm font-bold text-slate-900"><EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} /></span>
                                    <span className="text-xs font-bold uppercase w-12 text-right" style={{ color: data.accentColor }}>{skill.level}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
