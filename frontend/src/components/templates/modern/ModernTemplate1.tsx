import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
}

export const ModernTemplate1: React.FC<ModernResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-50 mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Geometric Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-bl-full -z-0 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-50 rounded-tr-full -z-0"></div>

            {/* Header */}
            <header className="bg-teal-700 text-white p-12 pb-24 relative clip-path-slant">
                <div className="relative z-10 flex gap-8 items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center text-4xl font-black">
                        {data.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2">{data.name}</h1>
                        <p className="text-xl text-teal-200 font-medium tracking-widest uppercase">{data.title}</p>
                    </div>
                </div>

                {/* Contact Bar */}
                <div className="absolute -bottom-8 right-12 bg-white text-slate-800 p-6 shadow-xl rounded-xl flex gap-8 items-center text-sm font-bold z-20">
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-teal-600" />
                        <span>{data.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-teal-600" />
                        <span>{data.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-teal-600" />
                        <span>Remote / NY</span>
                    </div>
                </div>
            </header>

            <div className="p-12 pt-16 grid grid-cols-12 gap-10 relative z-10">
                {/* Left Column */}
                <div className="col-span-8 space-y-10">
                    <section>
                        <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                            Professional Profile
                        </h2>
                        <p className="text-slate-600 leading-relaxed">{data.summary}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                            Visual History
                        </h2>
                        <div className="space-y-8 border-l-2 border-teal-100 pl-8 ml-1.5 tablet-timeline">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[39px] top-1.5 w-5 h-5 bg-white border-4 border-teal-500 rounded-full"></div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                                        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-500 mb-3">{exp.role}</div>
                                    <p className="text-sm text-slate-600">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-4 space-y-10">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-black text-slate-800 mb-6">Skill Proficiency</h2>
                        <div className="space-y-4">
                            {skillsArray.slice(0, 6).map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-1.5">
                                        <span>{skill}</span>
                                        <span className="text-teal-500">{(85 - i * 5)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${85 - i * 5}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-black text-slate-800 mb-4">Education</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="font-bold text-sm">Bachelor of Design</div>
                                <div className="text-xs text-slate-500 mb-1">Rhode Island School of Design</div>
                                <div className="text-xs text-teal-600 font-bold">2016 - 2020</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
