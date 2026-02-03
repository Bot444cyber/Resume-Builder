import React from 'react';
import { ResumeData } from '../../../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate2: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">

            {/* Background Geometry */}
            <div className="absolute top-0 right-0 w-[70%] h-full bg-purple-100/50 clip-path-diagonal z-0"></div>
            {/* Custom geometric shape simulation */}
            <div className="absolute top-0 right-0 w-full h-[350px] bg-purple-100/30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-full h-[40%] bg-yellow-100 z-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>

            <div className="relative z-10 flex flex-col h-full p-12">
                {/* Header */}
                <div className="flex gap-12 items-center mb-16">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-xl flex-shrink-0 z-20">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-6xl font-light text-slate-800 uppercase tracking-tight leading-none mb-2">
                            {data.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                        </h1>
                        <div className="flex flex-col gap-2 mt-6 text-sm font-medium text-slate-700">
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-purple-600" />
                                <span>{data.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-purple-600" />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-purple-600" />
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    {/* Left Column */}
                    <div className="col-span-4 flex flex-col pt-8">
                        <section className="mb-12 text-right">
                            <h2 className="text-2xl font-light text-slate-500 uppercase tracking-widest mb-6">About Me</h2>
                            <p className="text-sm leading-loose text-slate-600 font-medium">
                                {data.summary}
                            </p>
                        </section>

                        <section className="text-right">
                            <h2 className="text-2xl font-light text-slate-500 uppercase tracking-widest mb-6">Skills</h2>
                            <div className="flex flex-col gap-3 items-end">
                                {data.skills.split(',').map((skill, i) => (
                                    <span key={i} className="text-sm font-bold text-slate-700 italic border-b border-purple-200 pb-1 w-full text-right">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-light text-slate-600 uppercase tracking-widest mb-8 text-center bg-purple-100/50 py-2 rounded-lg">Work Experience</h2>
                            <div className="space-y-8">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider">{exp.role}</h3>
                                            <span className="text-xs font-bold text-slate-500">{exp.dates}</span>
                                        </div>
                                        <div className="text-purple-700 font-bold text-sm mb-3">({exp.company})</div>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="pt-8">
                            <h2 className="text-2xl font-light text-slate-600 uppercase tracking-widest mb-8">Education</h2>
                            <div className="flex justify-between items-end border-b border-slate-900 pb-2">
                                <div>
                                    <div className="font-bold text-lg text-slate-900">Seattle University - WA</div>
                                    <div className="text-sm text-slate-600">Master Degree in Business Administration</div>
                                </div>
                                <div className="text-sm font-bold text-slate-900">4/2010 - 8/2014</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Geometric Decorations */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-300 rounded-full opacity-50 z-20 pointer-events-none"></div>
            <div className="absolute top-24 left-14 w-32 h-0.5 bg-purple-300 -rotate-45 z-20 pointer-events-none"></div>
        </div>
    );
};
