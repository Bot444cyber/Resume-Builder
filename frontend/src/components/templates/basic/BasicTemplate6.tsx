import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface BasicResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const BasicTemplate6: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl p-12 font-sans text-slate-900">
            {/* Header */}
            <header className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-6xl font-normal uppercase tracking-wide leading-none mb-4">
                        <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-600">
                        <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                    </p>
                </div>
                <div className="flex flex-col gap-3 text-sm font-medium pt-2">
                    <div className="flex items-center gap-3">
                        <div className="text-white p-1 rounded-full" style={{ backgroundColor: data.accentColor }}><Phone size={12} /></div>
                        <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-white p-1 rounded-full" style={{ backgroundColor: data.accentColor }}><Mail size={12} /></div>
                        <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                    </div>
                    {data.address && (
                        <div className="flex items-center gap-3">
                            <div className="text-white p-1 rounded-full" style={{ backgroundColor: data.accentColor }}><MapPin size={12} /></div>
                            <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} />
                        </div>
                    )}
                </div>
            </header>

            <div className="w-full h-0.5 mb-12" style={{ backgroundColor: data.accentColor }}></div>

            <div className="grid grid-cols-12 gap-12 h-full">
                {/* Left Column (Narrow) */}
                <div className="col-span-4 space-y-12 border-r border-slate-300 pr-8">
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 pb-2 inline-block w-full" style={{ borderColor: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="text-sm font-bold uppercase mb-1"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></div>
                                    <div className="text-sm font-bold mb-1 text-slate-700"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></div>
                                    <div className="text-xs font-bold text-slate-900"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 pb-2 inline-block w-full" style={{ borderColor: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.skills || 'Core Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>

                        <div className="mb-6">
                            <div className="flex flex-col gap-3 text-sm font-medium text-slate-800">
                                <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline />
                            </div>
                        </div>

                        {data.customSectionTitle && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 mb-3 italic">
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                </h3>
                                <div className="text-sm font-medium text-slate-800 whitespace-pre-wrap">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column (Wide) */}
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 pb-2 w-full" style={{ borderColor: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.summary || 'Summary'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="text-sm leading-loose text-slate-700 font-medium">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-8 border-b-2 pb-2 w-full" style={{ borderColor: data.accentColor }}>
                            <EditableItem value={data.sectionTitles?.experience || 'Professional Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="text-sm font-bold uppercase mb-1"><EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} /></div>
                                    <div className="text-sm font-bold text-slate-600 mb-2">
                                        <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} /> <span className="mx-1 text-slate-400">-</span> <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                    </div>
                                    <div className="text-sm leading-relaxed text-slate-700">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='div' />
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
