import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ModernTemplate2: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Header */}
            <header className="text-white p-10 flex justify-between items-center" style={{ backgroundColor: data.accentColor }}>
                <div>
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">
                        <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                    </h1>
                    <p className="text-xl font-medium tracking-wide border-b-2 inline-block pb-1" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)' }}>
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </p>
                </div>
                <div className="text-right space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    <div className="flex items-center justify-end gap-2">
                        <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                        <Mail size={14} />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                        <Phone size={14} />
                    </div>
                    {data.address && (
                        <div className="flex items-center justify-end gap-2">
                            <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} />
                            <MapPin size={14} />
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-3 h-full">
                {/* Sidebar */}
                <aside className="col-span-1 bg-slate-50 p-8 pt-10 min-h-[250mm] border-r border-slate-200">
                    <section className="mb-10">
                        <h3 className="font-black uppercase tracking-widest text-sm mb-5 border-b-2 pb-2" style={{ color: data.accentColor, borderColor: `${data.accentColor}40` }}>
                            <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsList.map((skill, i) => (
                                <span key={skill.id || i} className="px-3 py-1 rounded-md text-xs font-bold" style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}>
                                    <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h3 className="font-black uppercase tracking-widest text-sm mb-5 border-b-2 pb-2" style={{ color: data.accentColor, borderColor: `${data.accentColor}40` }}>
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h3>
                        <div className="space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-slate-800"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                    <div className="text-sm text-slate-600"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                                    <div className="text-xs font-bold mt-1" style={{ color: data.accentColor }}><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.customSectionTitle && (
                        <section>
                            <h3 className="font-black uppercase tracking-widest text-sm mb-5 border-b-2 pb-2" style={{ color: data.accentColor, borderColor: `${data.accentColor}40` }}>
                                <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                            </h3>
                            <div className="text-sm text-slate-600 whitespace-pre-wrap">
                                <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="col-span-2 p-10 pt-10">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">
                            <EditableItem value={data.sectionTitles?.summary || 'About Me'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="text-slate-600 leading-7">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: `${data.accentColor}40` }}>
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: data.accentColor }}></div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </h3>
                                        <span className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}>
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-500 uppercase mb-3">
                                        <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    </div>
                                    <div className="text-sm text-slate-600 leading-relaxed">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};
