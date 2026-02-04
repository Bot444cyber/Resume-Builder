import { EditableItem } from '../../EditableItem';
import { ResumeData, Experience, Education, Skill } from '../../../types';
import { Mail, Phone, Linkedin, Target, Briefcase, GraduationCap, Award, Heart } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
    onUpdate: (field: keyof ResumeData, value: string) => void;
    onExpUpdate: (id: string, field: keyof Experience, value: string) => void;
    onEduUpdate: (id: string, field: keyof Education, value: string) => void;
    onTitleUpdate: (section: 'summary' | 'experience' | 'skills' | 'education', value: string) => void;
    onSkillUpdate: (id: string, field: keyof Skill, value: string | number) => void;
}

export const ProfessionalTemplate1: React.FC<ProfessionalResumeTemplateProps> = ({ data, onUpdate, onExpUpdate, onEduUpdate, onTitleUpdate, onSkillUpdate }) => {
    const titles = data.sectionTitles || { summary: "Objectives", experience: "Experience", skills: "Skills", education: "Education" };
    const skillsList = (data.skillsDetail && data.skillsDetail.length > 0)
        ? data.skillsDetail
        : (data.skills ? data.skills.split(',').map((s, i) => ({ id: i.toString(), name: s.trim(), level: 85 })).filter(s => s.name) : []);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans flex">
            {/* Left Sidebar */}
            <aside className="w-[30%] bg-zinc-100 flex flex-col items-center py-12 px-6 border-r border-zinc-200">

                {/* Profile Image */}
                {data.profileImage && (
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-8 relative z-10">
                        <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                )}

                {/* Name & Title */}
                <h1 className="text-3xl font-serif font-bold text-center text-zinc-900 leading-tight mb-2">
                    <EditableItem value={data.name} onChange={(val) => onUpdate('name', val)} />
                </h1>
                <p className="text-xs uppercase tracking-widest text-zinc-500 text-center mb-10 font-bold">
                    <EditableItem value={data.title} onChange={(val) => onUpdate('title', val)} />
                </p>

                <div className="w-16 h-0.5 bg-zinc-300 mb-10"></div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6 items-center text-center w-full mb-10">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                            <Phone size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600">
                            <EditableItem value={data.phone} onChange={(val) => onUpdate('phone', val)} />
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                            <Mail size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600 break-all">
                            <EditableItem value={data.email} onChange={(val) => onUpdate('email', val)} />
                        </span>
                    </div>

                    {data.address && (
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                                <Target size={14} />
                            </div>
                            <span className="text-xs font-bold text-zinc-600">
                                <EditableItem value={data.address} onChange={(val) => onUpdate('address', val)} />
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                            <Linkedin size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600">linkedin.com/in/{data.name.toLowerCase().replace(' ', '')}</span>
                    </div>
                </div>

                <div className="w-full border-t border-zinc-300 pt-8 mt-auto">
                    <h2 className="text-2xl font-serif font-bold text-zinc-900 text-center mb-6">
                        <EditableItem value={titles.skills} onChange={(val) => onTitleUpdate('skills', val)} />
                    </h2>
                    <div className="flex flex-col gap-2 text-center text-sm font-medium text-zinc-600">
                        {skillsList.map((skill, i) => (
                            <div key={skill.id || i}>
                                <EditableItem value={skill.name} onChange={(val) => onSkillUpdate ? onSkillUpdate(skill.id, 'name', val) : null} />
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Right Content */}
            <main className="flex-1 p-12 pt-16 relative">
                {/* Top Right Decoration */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-bl-full z-0 opacity-10 pointer-events-none" style={{ backgroundColor: data.accentColor }}></div>

                <div className="relative z-10 space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                                <Target size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">
                                <EditableItem value={titles.summary} onChange={(val) => onTitleUpdate('summary', val)} />
                            </h2>
                        </div>
                        <div className="text-sm text-zinc-600 leading-relaxed font-medium">
                            <EditableItem value={data.summary} onChange={(val) => onUpdate('summary', val)} multiline />
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                                <Briefcase size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">
                                <EditableItem value={titles.experience} onChange={(val) => onTitleUpdate('experience', val)} />
                            </h2>
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 ml-5" style={{ borderColor: `${data.accentColor}10` }}>
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-zinc-900">
                                            <EditableItem value={exp.role} onChange={(val) => onExpUpdate(exp.id, 'role', val)} />
                                        </h3>
                                        <span className="font-bold text-sm text-zinc-800">
                                            <EditableItem value={exp.dates} onChange={(val) => onExpUpdate(exp.id, 'dates', val)} />
                                        </span>
                                    </div>
                                    <div className="text-sm italic text-zinc-500 mb-3">
                                        <EditableItem value={exp.company} onChange={(val) => onExpUpdate(exp.id, 'company', val)} />
                                    </div>
                                    <div className="text-sm text-zinc-600 leading-relaxed">
                                        <EditableItem value={exp.desc} onChange={(val) => onExpUpdate(exp.id, 'desc', val)} multiline tagName='p' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>
                                <GraduationCap size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">
                                <EditableItem value={titles.education} onChange={(val) => onTitleUpdate('education', val)} />
                            </h2>
                        </div>
                        <div className="space-y-6 pl-14">
                            {data.education && data.education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-bold text-base text-zinc-900">
                                            <EditableItem value={edu.degree} onChange={(val) => onEduUpdate(edu.id, 'degree', val)} />
                                        </h3>
                                        <div className="text-sm italic text-zinc-500">
                                            <EditableItem value={edu.school} onChange={(val) => onEduUpdate(edu.id, 'school', val)} />
                                        </div>
                                    </div>
                                    <div className="font-bold text-sm text-zinc-800">
                                        <EditableItem value={edu.dates} onChange={(val) => onEduUpdate(edu.id, 'dates', val)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Award size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Courses and Certificates</h2>
                        </div>
                        <div className="pl-14 text-sm text-zinc-600 space-y-1 font-medium">
                            <div>Digital Marketing Certificate, Medical Hat School, 2011</div>
                            <div>Effective Communication Skills course, Udemy, 2012</div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Heart size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Hobbies and Interests</h2>
                        </div>
                        <div className="pl-14 text-sm text-zinc-600 leading-relaxed max-w-sm">
                            Swimming, Football, Cycling, Shopping, Skiing, Jogging, Weight lifting, ping pong, etc.
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
