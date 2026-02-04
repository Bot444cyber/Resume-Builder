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

export const ModernTemplate5: React.FC<ModernResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Diagonal Background */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-slate-900 skew-x-12 origin-top transform translate-x-20 z-0"></div>

            <div className="relative z-10 h-full flex flex-col">
                <header className="p-16 pb-8 flex justify-between items-end">
                    <div className="text-slate-900 w-1/3 pr-8">
                        <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-4 text-balance">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <div className="w-16 h-2" style={{ backgroundColor: data.accentColor }}></div>
                    </div>
                    <div className="text-white w-2/3 text-right">
                        <p className="text-2xl font-light tracking-wide uppercase mb-6">
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </p>
                        <div className="text-sm font-mono text-slate-400 space-x-6">
                            <span><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></span>
                            <span><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></span>
                            {data.address && <span><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></span>}
                        </div>
                    </div>
                </header>

                <div className="flex-1 grid grid-cols-12">
                    {/* Left Light Side */}
                    <div className="col-span-4 p-12 pr-6 pt-8 space-y-12">
                        <section>
                            <h2 className="text-4xl font-black text-slate-200 mb-4 -ml-1">01</h2>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">
                                <EditableItem value={data.sectionTitles?.summary || 'Profile'} onChange={(val) => onTitleUpdate('summary', val)} />
                            </h3>
                            <div className="text-sm text-slate-600 leading-relaxed font-medium">
                                <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-4xl font-black text-slate-200 mb-4 -ml-1">02</h2>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                            </h3>
                            <div className="space-y-4">
                                {data.education && data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                                        <div className="text-sm"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                        <div className="text-xs font-mono text-slate-500 mt-1"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Custom Section Moved to left if needed, or right? Let's put it on the right for space */}
                    </div>

                    {/* Right Dark Side */}
                    <div className="col-span-8 p-12 pl-6 pt-8 text-white space-y-12">
                        <section>
                            <div className="flex items-baseline gap-4 mb-8">
                                <h2 className="text-4xl font-black text-slate-700">03</h2>
                                <h3 className="text-sm font-bold uppercase tracking-widest pb-2 flex-1" style={{ color: data.accentColor }}>
                                    <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                                </h3>
                            </div>

                            <div className="space-y-10 pl-4 border-l border-slate-700">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: data.accentColor, boxShadow: `0 0 10px ${data.accentColor}80` }}></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold">
                                                <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                            </h4>
                                            <span className="font-mono text-xs text-slate-400">
                                                <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                            </span>
                                        </div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                        </div>
                                        <div className="text-sm text-slate-300 leading-relaxed">
                                            <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-baseline gap-4 mb-6">
                                <h2 className="text-4xl font-black text-slate-700">04</h2>
                                <h3 className="text-sm font-bold uppercase tracking-widest pb-2 flex-1" style={{ color: data.accentColor }}>
                                    <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillsList.map((skill, i) => (
                                    <span key={skill.id || i} className="bg-slate-800 hover:bg-slate-700 transition-colors px-3 py-1 rounded text-xs font-bold text-slate-300 border border-slate-700">
                                        <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                    </span>
                                ))}
                            </div>
                        </section>

                        {data.customSectionTitle && (
                            <section>
                                <div className="flex items-baseline gap-4 mb-6">
                                    <h2 className="text-4xl font-black text-slate-700">05</h2>
                                    <h3 className="text-sm font-bold uppercase tracking-widest pb-2 flex-1" style={{ color: data.accentColor }}>
                                        <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                    </h3>
                                </div>
                                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
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
