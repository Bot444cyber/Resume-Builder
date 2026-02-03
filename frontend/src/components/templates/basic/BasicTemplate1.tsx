import React from 'react';
import { ResumeData } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate1: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-black p-12 mx-auto shadow-2xl font-serif">
            {/* Header */}
            <header className="text-center mb-8 border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.name}</h1>
                <p className="text-lg font-sans mb-2">{data.title}</p>
                <div className="flex justify-center gap-6 text-sm font-sans">
                    <span>{data.email}</span>
                    <span>|</span>
                    <span>{data.phone}</span>
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-black mb-4 pb-1 font-sans">Professional Summary</h2>
                <p className="leading-relaxed text-justify">{data.summary}</p>
            </section>

            {/* Experience */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-black mb-4 pb-1 font-sans">Work Experience</h2>
                <div className="space-y-6">
                    {data.experiences.map((exp) => (
                        <div key={exp.id} className="break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-bold">{exp.company}</h3>
                                <span className="text-sm font-sans italic">{exp.dates}</span>
                            </div>
                            <div className="text-md italic mb-2">{exp.role}</div>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education - Mocked since not in current data but requested */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-black mb-4 pb-1 font-sans">Education</h2>
                <div className="flex justify-between items-baseline">
                    <div>
                        <h3 className="text-lg font-bold">University of Technology</h3>
                        <div className="italic">Bachelor of Science in Computer Science</div>
                    </div>
                    <span className="text-sm font-sans italic">2015 - 2019</span>
                </div>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-black mb-4 pb-1 font-sans">Skills</h2>
                <p className="leading-relaxed">{data.skills}</p>
            </section>
        </div>
    );
};
