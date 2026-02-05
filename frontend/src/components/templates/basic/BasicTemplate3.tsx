import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const BasicTemplate3: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl p-12 font-sans text-slate-900">
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-5xl font-normal uppercase tracking-wide mb-2">
                    <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                </h1>
                <div className="text-xs uppercase text-slate-500 tracking-wide mb-8 font-medium flex flex-wrap gap-2">
                    {data.address && <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} />}
                    <span>(H)</span>
                    <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                    <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                </div>
                {/* Red Line */}
                <div className="w-full h-1.5 mb-8" style={{ backgroundColor: data.accentColor }}></div>
            </header>

            <div className="space-y-8">
                {/* Summary Statement */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.summary || 'Summary Statement'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                    </div>
                    <div className="col-span-9">
                        <div className="text-xs leading-relaxed text-slate-700 font-medium text-justify">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                    </div>
                    <div className="col-span-9">
                        <div className="text-xs font-medium text-slate-700 leading-relaxed">
                            <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline />
                        </div>
                    </div>
                </section>

                {/* Custom Section (formerly Professional Skills) */}
                {data.customSectionTitle && (
                    <section className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <h2 className="text-sm font-bold uppercase" style={{ color: data.accentColor }}>
                                <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                            </h2>
                        </div>
                        <div className="col-span-9 space-y-4">
                            <div className="text-xs leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                                <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                            </div>
                        </div>
                    </section>
                )}

                {/* Work History */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.experience || 'Work History'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                    </div>
                    <div className="col-span-9 space-y-6">
                        {data.experiences.map((exp) => (
                            <div key={exp.id}>
                                <div className="text-xs font-bold text-slate-500 uppercase mb-1">
                                    <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                </div>
                                <div className="text-sm font-bold text-slate-800 mb-2">
                                    <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    <span className="font-normal mx-1">|</span>
                                    <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                </div>
                                <div className="text-xs leading-relaxed text-slate-700">
                                    <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase" style={{ color: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                    </div>
                    <div className="col-span-9 space-y-4">
                        {data.education && data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="text-xs font-bold text-slate-500 uppercase mb-1">
                                    <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                </div>
                                <div className="text-sm font-bold text-slate-800">
                                    <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                </div>
                                <div className="text-sm font-normal text-slate-700">
                                    <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
