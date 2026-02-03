import React from 'react';
import { ResumeData } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate2: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 mx-auto shadow-2xl font-sans">
            {/* Header: Left Aligned, Bold Name */}
            <header className="mb-8 pb-6 border-b-4 border-slate-900">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-1">{data.name}</h1>
                <p className="text-xl text-slate-600 font-medium mb-4">{data.title}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
                    <span>{data.email}</span>
                    <span>•</span>
                    <span>{data.phone}</span>
                </div>
            </header>

            {/* Summary */}
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Profile</h2>
                <p className="leading-relaxed text-slate-800 font-medium">{data.summary}</p>
            </section>

            {/* Experience */}
            <section className="mb-10">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Experience</h2>
                <div className="space-y-8">
                    {data.experiences.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-xl font-bold">{exp.company}</h3>
                                <span className="text-sm font-mono text-slate-500">{exp.dates}</span>
                            </div>
                            <div className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">{exp.role}</div>
                            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Skills</h2>
                <p className="leading-relaxed font-bold text-slate-800">{data.skills}</p>
            </section>
        </div>
    );
};
