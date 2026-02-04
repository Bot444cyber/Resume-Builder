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

export const BasicTemplate5: React.FC<BasicResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-[#E8E8E8] mx-auto shadow-2xl relative overflow-hidden font-sans text-stone-800 p-12">

            {/* Header */}
            <header className="mb-12 relative">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-5xl font-normal tracking-wide text-stone-900 mb-2">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <p className="text-lg uppercase tracking-[0.2em] text-stone-600">
                            <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                        </p>
                    </div>
                    <div className="text-right text-sm text-stone-500 font-light leading-relaxed">
                        {data.address && <div><EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} /></div>}
                        <div><EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} /></div>
                        <div><EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} /></div>
                    </div>
                </div>

                {/* Decorative Lines and Rings */}
                <div className="relative h-16 flex items-center justify-center">
                    <div className="absolute w-full h-px bg-stone-400 top-1/2 -translate-y-[6px]"></div>
                    <div className="absolute w-full h-px bg-stone-400 top-1/2 translate-y-[6px]"></div>

                    <div className="relative z-10 bg-[#E8E8E8] px-4 flex -space-x-4">
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12 relative">
                {/* Vertical Divider Line */}
                <div className="absolute left-[33%] top-0 bottom-0 w-px bg-stone-400"></div>

                {/* Left Column */}
                <aside className="col-span-4 pr-4 space-y-12">
                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">
                            <EditableItem value={data.sectionTitles?.summary || 'About Me'} onChange={(val) => onTitleUpdate('summary', val)} />
                        </h2>
                        <div className="text-xs leading-loose text-justify text-stone-600 font-light">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                        </div>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">
                            <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                        </h2>
                        <div className="flex flex-col gap-2 text-xs font-light text-stone-600">
                            <EditableItem value={data.skills} onChange={(val) => onUpdate('skills', val)} multiline />
                        </div>
                    </section>
                </aside>

                {/* Right Column */}
                <main className="col-span-8 space-y-12 pl-4">
                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-6">
                            <EditableItem value={data.sectionTitles?.experience || 'Work Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                        </h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex items-baseline gap-2 mb-2 font-bold text-stone-800 text-sm uppercase">
                                        <span><EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} /></span>
                                        <span className="text-stone-400">//</span>
                                        <span><EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} /></span>
                                        <span className="text-stone-400">//</span>
                                        <span><EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} /></span>
                                    </div>
                                    <div className="text-xs leading-relaxed text-stone-600 font-light text-justify pl-4 border-l border-stone-300">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">
                            <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                        </h2>
                        <div className="text-sm space-y-4">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id}>
                                    <span className="uppercase text-stone-700 font-medium"><EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} /></span>
                                    <span className="text-stone-400 mx-2">//</span>
                                    <span className="uppercase text-stone-500"><EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} /></span>
                                    <span className="text-stone-400 mx-2">//</span>
                                    <span className="text-stone-500"><EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} /></span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    {/* Custom Section for Certifications */}
                    {data.customSectionTitle && (
                        <section>
                            <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">
                                <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                            </h2>
                            <div className="text-xs font-light text-stone-600 uppercase tracking-wide">
                                <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* Footer Lines */}
            <div className="absolute bottom-12 left-12 right-12 h-16 flex flex-col justify-center gap-2">
                <div className="w-full h-px bg-stone-400"></div>
                <div className="w-full h-px bg-stone-400"></div>
            </div>
        </div>
    );
};
