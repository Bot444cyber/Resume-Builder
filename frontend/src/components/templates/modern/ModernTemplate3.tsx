import React from 'react';
import { ResumeData } from '../../../types';

interface ModernResumeTemplateProps {
    data: ResumeData;
}

export const ModernTemplate3: React.FC<ModernResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-900 text-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Header with gradient */}
            <div className="absolute top-0 w-full h-64 bg-gradient-to-r from-emerald-900 to-slate-900 z-0"></div>

            <header className="relative z-10 p-12 pb-6 flex items-end justify-between border-b border-slate-700 mx-8 mt-4">
                <div>
                    <h1 className="text-6xl font-thin tracking-tighter mb-2">{data.name.split(' ')[0]} <span className="font-bold text-emerald-400">{data.name.split(' ').slice(1).join(' ')}</span></h1>
                    <p className="text-xl text-slate-300 font-light tracking-widest uppercase">{data.title}</p>
                </div>
                <div className="text-right text-sm text-slate-400 font-mono">
                    <div>{data.email}</div>
                    <div>{data.phone}</div>
                </div>
            </header>

            <div className="p-12 pt-8 grid grid-cols-12 gap-12 relative z-10">
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-4">01 // PROFILE</h2>
                        <p className="text-slate-300 leading-relaxed text-lg font-light">{data.summary}</p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-6">02 // EXPERIENCE</h2>
                        <div className="space-y-10">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{exp.company}</h3>
                                        <span className="text-xs font-mono text-slate-500">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-4">{exp.role}</div>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="col-span-4 space-y-10 border-l border-slate-800 pl-8">
                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-6">03 // SKILLS</h2>
                        <div className="flex flex-col gap-3">
                            {skillsArray.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                        <span>{skill}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full">
                                        <div className="bg-emerald-500 h-1 rounded-full opacity-80" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-emerald-400 font-mono text-sm mb-6">04 // EDUCATION</h2>
                        <div>
                            <div className="text-slate-200 font-bold">Bachelor of Design</div>
                            <div className="text-slate-500 text-sm">RISD, 2016-2020</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
