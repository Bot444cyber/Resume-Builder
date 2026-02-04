import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ModernTemplate4: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-50 mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800">
            {/* Soft Gradient Header */}
            <header className="text-white p-10 pb-16 rounded-b-[3rem] shadow-lg" style={{ background: `linear-gradient(to right, ${data.accentColor}, ${data.accentColor}DD)` }}>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2 text-white drop-shadow-sm">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-lg font-bold">
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-xs font-bold space-y-2">
                        <div className="flex items-center gap-2"><Mail size={14} /> <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                        <div className="flex items-center gap-2"><Phone size={14} /> <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                        {data.address && <div className="flex items-center gap-2"><MapPin size={14} /> <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                    </div>
                </div>
            </header>

            <div className="px-10 -mt-8 grid grid-cols-12 gap-8">
                {/* Main Card */}
                <main className="col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-4 flex items-center gap-2" style={{ color: data.accentColor }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accentColor }}></span>
                            <EditableItem value={data.sectionTitles?.summary || 'Profile'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="leading-relaxed text-slate-600">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-6 flex items-center gap-2" style={{ color: data.accentColor }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accentColor }}></span>
                            <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-10">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: `${data.accentColor}33` }}>
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 rounded-full" style={{ borderColor: data.accentColor }}></div>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </h3>
                                        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}>
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-3 uppercase">
                                        <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    </div>
                                    <div className="text-sm text-slate-600 leading-relaxed">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sidebar Card */}
                <aside className="col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-4" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.skills || 'Top Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skillsList.map((skill, i) => (
                                <span key={skill.id || i} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}>
                                    <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-lg text-white" style={{ borderTop: `4px solid ${data.accentColor}` }}>
                        <h2 className="font-black uppercase text-sm tracking-widest mb-4 opacity-70">
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-lg"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                                    <div className="text-sm opacity-80 mb-1"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                    <div className="text-xs font-mono opacity-50"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.customSectionTitle && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm">
                            <h2 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">
                                <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                            </h2>
                            <div className="text-sm text-slate-600 whitespace-pre-wrap">
                                <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};
