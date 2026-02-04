import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ProfessionalTemplate2: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">

            {/* Background Geometry */}
            <div className="absolute top-0 right-0 w-[70%] h-full clip-path-diagonal z-0" style={{ backgroundColor: `${data.accentColor}10` }}></div>
            {/* Custom geometric shape simulation */}
            <div className="absolute top-0 right-0 w-full h-[350px] z-0" style={{ backgroundColor: `${data.accentColor}08` }}></div>
            <div className="absolute bottom-0 right-0 w-full h-[40%] z-0" style={{ backgroundColor: `${data.accentColor}15`, clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>

            <div className="relative z-10 flex flex-col h-full p-12">
                {/* Header */}
                <div className="flex gap-12 items-center mb-16">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-xl flex-shrink-0 z-20 bg-white">
                        {data.profileImage ? (
                            <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">
                                {data.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-6xl font-light text-slate-800 uppercase tracking-tight leading-none mb-2">
                            <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                        </h1>
                        <div className="flex flex-col gap-2 mt-6 text-sm font-medium text-slate-700">
                            <div className="flex items-center gap-3">
                                <Phone size={16} style={{ color: data.accentColor }} />
                                <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} style={{ color: data.accentColor }} />
                                <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                            </div>
                            {data.address && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} style={{ color: data.accentColor }} />
                                    <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    {/* Left Column */}
                    <div className="col-span-4 flex flex-col pt-8">
                        <section className="mb-12 text-right">
                            <h2 className="text-2xl font-light text-slate-500 uppercase tracking-widest mb-6">
                                <EditableItem value={data.sectionTitles?.summary || 'About Me'} onChange={(val) => onTitleUpdate('summary', val)} />
                            </h2>
                            <div className="text-sm leading-loose text-slate-600 font-medium whitespace-pre-wrap">
                                <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline tagName='p' />
                            </div>
                        </section>

                        <section className="text-right">
                            <h2 className="text-2xl font-light text-slate-500 uppercase tracking-widest mb-6">
                                <EditableItem value={data.sectionTitles?.skills || 'Skills'} onChange={(val) => onTitleUpdate('skills', val)} />
                            </h2>
                            <div className="flex flex-col gap-3 items-end">
                                {skillsList.map((skill, i) => (
                                    <div key={skill.id || i} className="text-sm font-bold text-slate-700 italic border-b pb-1 w-full text-right" style={{ borderColor: `${data.accentColor}40` }}>
                                        <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-light text-slate-600 uppercase tracking-widest mb-8 text-center py-2 rounded-lg" style={{ backgroundColor: `${data.accentColor}15` }}>
                                <EditableItem value={data.sectionTitles?.experience || 'Work Experience'} onChange={(val) => onTitleUpdate('experience', val)} />
                            </h2>
                            <div className="space-y-8">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">
                                                <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                            </h3>
                                            <span className="text-sm font-medium" style={{ color: data.accentColor }}>
                                                <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-500 mb-2">
                                            <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                        </div>
                                        <div className="text-sm leading-relaxed text-slate-600">
                                            <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-light text-slate-600 uppercase tracking-widest mb-8 text-center py-2 rounded-lg" style={{ backgroundColor: `${data.accentColor}15` }}>
                                <EditableItem value={data.sectionTitles?.education || 'Education'} onChange={(val) => onTitleUpdate('education', val)} />
                            </h2>
                            <div className="space-y-6">
                                {data.education && data.education.map((edu) => (
                                    <div key={edu.id} className="flex justify-between items-center border-b pb-4 border-slate-100">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg">
                                                <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                            </h3>
                                            <div className="text-sm text-slate-500">
                                                <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium" style={{ color: data.accentColor }}>
                                            <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {data.customSectionTitle && (
                            <section>
                                <h2 className="text-2xl font-light text-slate-600 uppercase tracking-widest mb-8 text-center py-2 rounded-lg" style={{ backgroundColor: `${data.accentColor}15` }}>
                                    <EditableItem value={data.customSectionTitle} onChange={(val) => onUpdate('customSectionTitle', val)} />
                                </h2>
                                <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                                    <EditableItem value={data.customSectionContent || ''} onChange={(val) => onUpdate('customSectionContent', val)} multiline tagName='div' />
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Geometric Decorations */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-300 rounded-full opacity-50 z-20 pointer-events-none"></div>
            <div className="absolute top-24 left-14 w-32 h-0.5 bg-purple-300 -rotate-45 z-20 pointer-events-none"></div>
        </div>
    );
};
