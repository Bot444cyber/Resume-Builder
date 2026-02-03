import React from 'react';
import { ResumeData } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate3: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl p-12 font-sans text-slate-900">
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-5xl font-normal uppercase tracking-wide mb-2">
                    {data.name.split(' ').map((n, i) => (
                        <span key={i} className={i === 0 ? "font-bold mr-3" : "font-normal"}>{n}</span>
                    ))}
                </h1>
                <div className="text-xs uppercase text-slate-500 tracking-wide mb-8 font-medium">
                    New York, NY 10012 (H) {data.phone} {data.email.toUpperCase()}
                </div>
                {/* Red Line */}
                <div className="w-full h-1.5 bg-red-700 mb-8"></div>
            </header>

            <div className="space-y-8">
                {/* Summary Statement */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase text-slate-800">Summary Statement</h2>
                    </div>
                    <div className="col-span-9">
                        <p className="text-xs leading-relaxed text-slate-700 font-medium text-justify">
                            {data.summary}
                        </p>
                    </div>
                </section>

                {/* Skills */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase text-slate-800">Skills</h2>
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-medium text-slate-700">
                            {data.skills.split(',').map((skill, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-black rounded-full"></span>
                                    {skill.trim()}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Professional Skills (Mocked based on image as data doesn't fully support categories yet) */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase text-slate-800">Professional Skills</h2>
                    </div>
                    <div className="col-span-9 space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-1">Communication</h3>
                            <ul className="list-disc list-inside text-xs leading-relaxed text-slate-700 font-medium space-y-1">
                                <li>Developed and actualized customer service initiatives to decrease wait times.</li>
                                <li>Maintained customer satisfaction with forward-thinking strategies.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-1">Management</h3>
                            <ul className="list-disc list-inside text-xs leading-relaxed text-slate-700 font-medium space-y-1">
                                <li>Boosted sales revenue by skillfully promoting diverse service options.</li>
                                <li>Managed over 20 POS register operations.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Work History */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase text-slate-800">Work History</h2>
                    </div>
                    <div className="col-span-9 space-y-6">
                        {data.experiences.map((exp) => (
                            <div key={exp.id}>
                                <div className="text-xs font-bold text-slate-500 uppercase mb-1">{exp.dates}</div>
                                <div className="text-sm font-bold text-slate-800">
                                    {exp.role} <span className="font-normal mx-1">|</span> {exp.company} <span className="font-normal mx-1">|</span> New York, NY
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h2 className="text-sm font-bold uppercase text-slate-800">Education</h2>
                    </div>
                    <div className="col-span-9 space-y-4">
                        <div>
                            <div className="text-xs font-bold text-slate-500 uppercase mb-1">June 2019</div>
                            <div className="text-sm font-bold text-slate-800">Bachelor of Science</div>
                            <div className="text-sm font-normal text-slate-700">University of Technology, New York, NY</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
