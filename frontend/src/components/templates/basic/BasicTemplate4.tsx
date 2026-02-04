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

export const BasicTemplate4: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 p-10 mx-auto shadow-2xl font-sans text-sm">
            {/* Header */}
            <header className="border-b-2 border-slate-200 pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-1">
                        <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                    </h1>
                    <p className="text-lg text-slate-500 font-medium">
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </p>
                </div>
                <div className="text-right text-slate-500 text-xs leading-loose">
                    <div><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                    <div><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                    {data.address && <div><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                </div>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-8 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                            <EditableItem value={data.sectionTitles?.summary || 'Profile'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="leading-relaxed text-slate-600">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                            <EditableItem value={data.sectionTitles?.experience || 'Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-6">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </h3>
                                        <span className="text-xs font-mono text-slate-400">
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">
                                        <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                    </div>
                                    <div className="text-slate-600 leading-relaxed">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-4 border-l border-slate-100 pl-8 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                            <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="flex flex-col gap-2 text-slate-600 font-medium">
                            <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="space-y-4 text-slate-600">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <strong className="text-slate-900 block text-xs">
                                        <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                    </strong>
                                    <div className="block text-xs my-1">
                                        <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                    </div>
                                    <div className="text-xs">
                                        <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
