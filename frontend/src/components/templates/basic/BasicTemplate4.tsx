import React from 'react';
import { ResumeData } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate4: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-800 p-10 mx-auto shadow-2xl font-sans text-sm">
            {/* Header */}
            <header className="border-b-2 border-slate-200 pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-1">{data.name}</h1>
                    <p className="text-lg text-slate-500 font-medium">{data.title}</p>
                </div>
                <div className="text-right text-slate-500 text-xs leading-loose">
                    <div>{data.email}</div>
                    <div>{data.phone}</div>
                    <div>New York, NY</div>
                </div>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-8 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Profile</h2>
                        <p className="leading-relaxed text-slate-600">{data.summary}</p>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Experience</h2>
                        <div className="space-y-6">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{exp.company}</h3>
                                        <span className="text-xs font-mono text-slate-400">{exp.dates}</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">{exp.role}</div>
                                    <p className="text-slate-600 leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-4 border-l border-slate-100 pl-8 space-y-8">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Skills</h2>
                        <div className="flex flex-col gap-2">
                            {data.skills.split(',').map((skill, i) => (
                                <span key={i} className="text-slate-600 font-medium border-b border-slate-50 pb-1">{skill.trim()}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Details</h2>
                        <div className="space-y-2 text-slate-600">
                            <div>
                                <strong className="text-slate-900 block text-xs">Education</strong>
                                University of Technology
                            </div>
                            <div>
                                <strong className="text-slate-900 block text-xs">Degree</strong>
                                BS Computer Science
                            </div>
                            <div>
                                <strong className="text-slate-900 block text-xs">Graduated</strong>
                                2019
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
