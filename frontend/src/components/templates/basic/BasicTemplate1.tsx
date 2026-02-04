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

export const BasicTemplate1: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const titles = data.sectionTitles || { summary: "Professional Summary", experience: "Work Experience", skills: "Skills", education: "Education" };
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-black p-12 mx-auto shadow-2xl font-serif">
            {/* Header */}
            <header className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: data.accentColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: data.accentColor }}>
                    <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                </h1>
                <p className="text-lg font-sans mb-2">
                    <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                </p>
                <div className="flex justify-center gap-6 text-sm font-sans">
                    <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                    <span>|</span>
                    <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b mb-4 pb-1 font-sans" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                    <EditableItem value={titles.summary} onChange={(val) => onTitleUpdate('summary', val)} />
                </h2>
                <div className="leading-relaxed text-justify">
                    <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b mb-4 pb-1 font-sans" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                    <EditableItem value={titles.experience} onChange={(val) => onTitleUpdate('experience', val)} />
                </h2>
                <div className="space-y-6">
                    {data.experiences.map((exp) => (
                        <div key={exp.id} className="break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-bold">
                                    <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                </h3>
                                <span className="text-sm font-sans italic">
                                    <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                </span>
                            </div>
                            <div className="text-md italic mb-2">
                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                            </div>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b mb-4 pb-1 font-sans" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                    <EditableItem value={titles.education} onChange={(val) => onTitleUpdate('education', val)} />
                </h2>
                <div className="space-y-4">
                    {data.education && data.education.map((edu) => (
                        <div key={edu.id} className="break-inside-avoid flex justify-between items-baseline">
                            <div>
                                <h3 className="text-lg font-bold">
                                    <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                </h3>
                                <div className="italic">
                                    <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                </div>
                            </div>
                            <span className="text-sm font-sans italic">
                                <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b mb-4 pb-1 font-sans" style={{ borderColor: data.accentColor, color: data.accentColor }}>
                    <EditableItem value={titles.skills} onChange={(val) => onTitleUpdate('skills', val)} />
                </h2>
                <div className="leading-relaxed">
                    <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline />
                </div>
            </section>
        </div>
    );
};
