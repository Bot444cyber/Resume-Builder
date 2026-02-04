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

export const ProfessionalTemplate6: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800 flex">

            {/* Left Column (30%) */}
            <aside className="w-[30%] flex flex-col border-r border-slate-200">
                {/* Colored Header */}
                <header className="py-12 px-6 text-center text-white" style={{ backgroundColor: data.accentColor }}>
                    <h1 className="text-3xl font-black uppercase tracking-widest leading-none mb-2">
                        {data.name.split(' ').map((n, i) => <div key={i}><EditableItem value={n} onChange={(val) => {
                            const names = data.name.split(' ');
                            names[i] = val;
                            onUpdate('name', names.join(' '));
                        }} /></div>)}
                    </h1>
                </header>

                {/* Photo */}
                <div className="w-full aspect-square bg-slate-200 overflow-hidden relative grayscale">
                    {data.profileImage ? (
                        <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-slate-400 bg-slate-100">
                            {data.name.charAt(0)}
                        </div>
                    )}
                </div>

                <div className="p-8 text-center flex-1 flex flex-col items-center">
                    {/* Title */}
                    <div className="w-full border-b-4 border-slate-800 mb-4"></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-slate-700">
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </h2>
                    <div className="w-full border-b-4 border-slate-800 mb-10"></div>

                    {/* Contact */}
                    <div className="text-xs font-bold text-slate-600 mb-10 space-y-2 break-all w-full">
                        <div><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                        <div><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                        {data.address && <div><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                    </div>

                    <div className="w-16 h-1 bg-slate-800 mb-10"></div>

                    {/* Summary */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-slate-700">
                            <EditableItem value={data.sectionTitles?.summary || 'Summary'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h3>
                        <div className="text-xs leading-loose text-justify text-slate-600 font-medium">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </div>
                    </section>
                </div>
            </aside>

            {/* Middle Column (35%) */}
            <section className="w-[35%] pt-12 px-6 pb-0 flex flex-col">
                <div className="text-center mb-10">
                    <div className="w-16 h-1.5 bg-slate-800 mx-auto mb-4"></div>
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] leading-tight text-slate-700">
                        <EditableItem value={data.sectionTitles?.experience || 'Work Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                    </h2>
                </div>

                <div className="space-y-10 flex-1">
                    {data.experiences.map((exp) => (
                        <div key={exp.id} className="text-center">
                            <h3 className="text-sm font-black text-slate-900">
                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                            </h3>
                            <div className="text-xs font-bold text-slate-600 mb-1">
                                <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} /> | <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                            </div>
                            <div className="text-[10px] leading-relaxed text-slate-600 font-medium text-justify mt-2">
                                <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Education Box */}
                <div className="text-center mt-8 mb-12 p-8 text-white" style={{ backgroundColor: data.accentColor }}>
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">
                        <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                    </h2>
                    {data.education && data.education.map((edu) => (
                        <div key={edu.id} className="mb-4 last:mb-0">
                            <div className="text-sm font-bold"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                            <div className="text-xs font-medium mt-1"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                            <div className="text-xs font-medium opacity-80"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Right Column (35%) */}
            <aside className="w-[35%] pt-12 px-6 border-l border-slate-200">
                {/* Certifications or Custom Section Box */}
                <div className="text-center mb-12 p-8 text-white" style={{ backgroundColor: data.accentColor }}>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4">
                        <EditableItem value={data.customSectionTitle || 'Details'} onChange={(val) => onUpdate('customSectionTitle', val)} />
                    </h2>
                    <div className="space-y-2 text-xs font-bold whitespace-pre-wrap leading-relaxed">
                        <EditableItem value={data.customSectionContent || 'Add details here...'} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-2 text-slate-700">
                        <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                    </h2>
                    <div className="w-full border-b-2 border-slate-800"></div>
                </div>

                <div className="space-y-8">
                    {/* Skills */}
                    <div className="space-y-3">
                        {skillsList.map((skill, i) => (
                            <div key={skill.id || i}>
                                <div className="text-[10px] font-bold mb-1"><EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} /></div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full" style={{ width: `${skill.level || 85}%`, backgroundColor: data.accentColor }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

        </div>
    );
};
