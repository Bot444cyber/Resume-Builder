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

export const ModernTemplate3: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-900 text-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Header with gradient */}
            <div className="absolute top-0 w-full h-64 z-0" style={{ background: `linear-gradient(to right, ${data.accentColor}33, #0f172a)` }}></div>

            <header className="relative z-10 p-12 pb-6 flex items-end justify-between border-b border-slate-700 mx-8 mt-4">
                <div>
                    <h1 className="text-6xl font-thin tracking-tighter mb-2">
                        <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                    </h1>
                    <p className="text-xl text-slate-300 font-light tracking-widest uppercase">
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </p>
                </div>
                <div className="text-right text-sm text-slate-400 font-mono">
                    <div><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                    <div><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                    {data.address && <div><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                </div>
            </header>

            <div className="p-12 pt-8 grid grid-cols-12 gap-12 relative z-10">
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-4">
                            01 <EditableItem value={data.sectionTitles?.summary || 'PROFILE'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="text-slate-300 leading-relaxed text-lg font-light">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-6">
                            02 <EditableItem value={data.sectionTitles?.experience || 'EXPERIENCE'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-10">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </h3>
                                        <span className="text-xs font-mono text-slate-500">
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-4">
                                        <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    </div>
                                    <div className="text-sm text-slate-400 leading-relaxed font-light">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-10 border-l border-slate-800 pl-8">
                    <section>
                        <h2 className="font-mono text-sm mb-6" style={{ color: data.accentColor }}>
                            03 <EditableItem value={data.sectionTitles?.skills || 'SKILLS'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="flex flex-col gap-3">
                            {skillsList.map((skill, i) => (
                                <div key={skill.id || i}>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                        <span><EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} /></span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full">
                                        <div className="h-1 rounded-full opacity-80" style={{ width: `${skill.level || 85}%`, backgroundColor: data.accentColor }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="font-mono text-sm mb-6" style={{ color: data.accentColor }}>
                            04 <EditableItem value={data.sectionTitles?.education || 'EDUCATION'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="text-slate-200 font-bold"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                    <div className="text-slate-500 text-sm">
                                        <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />, <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Custom Section */}
                    {data.customSectionTitle && (
                        <section>
                            <h2 className="font-mono text-sm mb-6" style={{ color: data.accentColor }}>
                                05 <EditableItem value={data.customSectionTitle.toUpperCase()} onChange={(val) => onUpdate('customSectionTitle', val)} />
                            </h2>
                            <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                                <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
