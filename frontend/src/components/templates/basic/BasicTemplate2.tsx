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

export const BasicTemplate2: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate }) => {
    const titles = data.sectionTitles || { summary: "Profile", experience: "Experience", skills: "Skills", education: "Education" };
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 mx-auto shadow-2xl font-sans">
            {/* Header: Left Aligned, Bold Name */}
            <header className="mb-8 pb-6 border-b-4" style={{ borderColor: data.accentColor }}>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-1" style={{ color: data.accentColor }}>
                    <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                </h1>
                <p className="text-xl text-slate-600 font-medium mb-4">
                    <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
                    <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                    <span>•</span>
                    <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                </div>
            </header>

            {/* Summary */}
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">
                    <EditableItem value={titles.summary} onChange={(val) => onTitleUpdate('summary', val)} />
                </h2>
                <div className="leading-relaxed text-slate-800 font-medium">
                    <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                </div>
            </section>

            {/* Experience */}
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
                    <EditableItem value={titles.experience} onChange={(val) => onTitleUpdate('experience', val)} />
                </h2>
                <div className="space-y-8">
                    {data.experiences.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xl font-bold" style={{ color: data.accentColor }}>
                                    <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                </h3>
                                <span className="text-sm font-mono text-slate-500">
                                    <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                </span>
                            </div>
                            <div className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">
                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                            </div>
                            <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                                <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education (Missing in original BasicTemplate2 but standardizes it) */}
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
                    <EditableItem value={titles.education} onChange={(val) => onTitleUpdate('education', val)} />
                </h2>
                <div className="space-y-8">
                    {data.education && data.education.map((edu) => (
                        <div key={edu.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xl font-bold" style={{ color: data.accentColor }}>
                                    <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                </h3>
                                <span className="text-sm font-mono text-slate-500">
                                    <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                </span>
                            </div>
                            <div className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">
                                <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">
                    <EditableItem value={titles.skills} onChange={(val) => onTitleUpdate('skills', val)} />
                </h2>
                <div className="leading-relaxed font-bold text-slate-800">
                    <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline tagName='p' />
                </div>
            </section>
        </div>
    );
};
