import React from 'react';
import { ResumeData } from '../../../types';

interface ModernResumeTemplateProps {
    data: ResumeData;
}

export const ModernTemplate5: React.FC<ModernResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans">
            {/* Diagonal Background */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-slate-900 skew-x-12 origin-top transform translate-x-20 z-0"></div>

            <div className="relative z-10 h-full flex flex-col">
                <header className="p-16 pb-8 flex justify-between items-end">
                    <div className="text-slate-900 w-1/3 pr-8">
                        <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-4 text-balance">{data.name}</h1>
                        <div className="w-16 h-2 bg-yellow-400"></div>
                    </div>
                    <div className="text-white w-2/3 text-right">
                        <p className="text-2xl font-light tracking-wide uppercase mb-6">{data.title}</p>
                        <div className="text-sm font-mono text-slate-400 space-x-6">
                            <span>{data.email}</span>
                            <span>{data.phone}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 grid grid-cols-12">
                    {/* Left Light Side */}
                    <div className="col-span-4 p-12 pr-6 pt-8 space-y-12">
                        <section>
                            <h2 className="text-4xl font-black text-slate-200 mb-4 -ml-1">01</h2>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Profile</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.summary}</p>
                        </section>

                        <section>
                            <h2 className="text-4xl font-black text-slate-200 mb-4 -ml-1">02</h2>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Education</h3>
                            <div>
                                <div className="font-bold">University of Tech</div>
                                <div className="text-sm">BS Comp Sci</div>
                                <div className="text-xs font-mono text-slate-500 mt-1">2015 - 2019</div>
                            </div>
                        </section>
                    </div>

                    {/* Right Dark Side */}
                    <div className="col-span-8 p-12 pl-6 pt-8 text-white space-y-12">
                        <section>
                            <div className="flex items-baseline gap-4 mb-8">
                                <h2 className="text-4xl font-black text-slate-700">03</h2>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-400 pb-2 flex-1">Experience</h3>
                            </div>

                            <div className="space-y-10 pl-4 border-l border-slate-700">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-xl font-bold">{exp.company}</h4>
                                            <span className="font-mono text-xs text-slate-400">{exp.dates}</span>
                                        </div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{exp.role}</div>
                                        <p className="text-sm text-slate-300 leading-relaxed">{exp.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-baseline gap-4 mb-6">
                                <h2 className="text-4xl font-black text-slate-700">04</h2>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-400 pb-2 flex-1">Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillsArray.map((skill, i) => (
                                    <span key={i} className="bg-slate-800 hover:bg-slate-700 transition-colors px-3 py-1 rounded text-xs font-bold text-slate-300 border border-slate-700">{skill}</span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
