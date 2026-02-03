import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
}

export const ModernTemplate2: React.FC<ModernResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Header */}
            <header className="bg-indigo-900 text-white p-10 flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">{data.name}</h1>
                    <p className="text-xl text-indigo-200 font-medium tracking-wide border-b-2 border-indigo-400 inline-block pb-1">{data.title}</p>
                </div>
                <div className="text-right space-y-2 text-sm text-indigo-100">
                    <div className="flex items-center justify-end gap-2">
                        <span>{data.email}</span>
                        <Mail size={14} />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span>{data.phone}</span>
                        <Phone size={14} />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span>New York, USA</span>
                        <MapPin size={14} />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-3 h-full">
                {/* Sidebar */}
                <aside className="col-span-1 bg-slate-50 p-8 pt-10 min-h-[250mm] border-r border-slate-200">
                    <section className="mb-10">
                        <h3 className="text-indigo-900 font-black uppercase tracking-widest text-sm mb-5 border-b-2 border-indigo-200 pb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, i) => (
                                <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-xs font-bold">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h3 className="text-indigo-900 font-black uppercase tracking-widest text-sm mb-5 border-b-2 border-indigo-200 pb-2">Education</h3>
                        <div>
                            <div className="font-bold text-slate-800">B.Des</div>
                            <div className="text-sm text-slate-600">RISD</div>
                            <div className="text-xs text-indigo-500 font-bold mt-1">2016 - 2020</div>
                        </div>
                    </section>
                </aside>

                {/* Main Content */}
                <main className="col-span-2 p-10 pt-10">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">About Me</h2>
                        <p className="text-slate-600 leading-7">{data.summary}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Experience</h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-6 border-l-2 border-indigo-200">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-500 uppercase mb-3">{exp.role}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};
