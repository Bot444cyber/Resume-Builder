import React from 'react';
import { ResumeData } from '../../../types';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate6: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl p-12 font-sans text-slate-900">
            {/* Header */}
            <header className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-6xl font-normal uppercase tracking-wide leading-none mb-4">
                        {data.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-600">{data.title}</p>
                </div>
                <div className="flex flex-col gap-3 text-sm font-medium pt-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-1 rounded-full"><Phone size={12} /></div>
                        <span>{data.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-1 rounded-full"><Mail size={12} /></div>
                        <span>{data.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-1 rounded-full"><MapPin size={12} /></div>
                        <span>New York, USA</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-1 rounded-full"><Linkedin size={12} /></div>
                        <span>Linkedin @{data.name.split(' ')[0]}</span>
                    </div>
                </div>
            </header>

            <div className="w-full h-0.5 bg-slate-800 mb-12"></div>

            <div className="grid grid-cols-12 gap-12 h-full">
                {/* Left Column (Narrow) */}
                <div className="col-span-4 space-y-12 border-r border-slate-300 pr-8">
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-900 pb-2 inline-block w-full">Education</h2>
                        <div>
                            <div className="text-sm font-bold uppercase mb-1">Bachelor of Science</div>
                            <div className="text-sm font-bold mb-1 text-slate-700">University College</div>
                            <div className="text-xs italic text-slate-500 mb-1">New York, USA</div>
                            <div className="text-xs font-bold text-slate-900">2015-2019</div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-900 pb-2 inline-block w-full">Core Skills</h2>

                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-slate-500 mb-3 italic">// PROFESSIONAL</h3>
                            <div className="flex flex-col gap-3 text-sm font-medium text-slate-800">
                                <div>Project Planning</div>
                                <div>Leadership</div>
                                <div>Time Management</div>
                                <div>Teamwork</div>
                                <div>Critical Thinking</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-500 mb-3 italic">// COMPUTER</h3>
                            <div className="flex flex-col gap-3 text-sm font-medium text-slate-800">
                                {data.skills.split(',').slice(0, 5).map((skill, i) => (
                                    <div key={i}>{skill.trim()}</div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Wide) */}
                <div className="col-span-8 space-y-12">
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-900 pb-2 w-full">Summary</h2>
                        <p className="text-sm leading-loose text-slate-700 font-medium">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-bold uppercase tracking-widest mb-8 border-b-2 border-slate-900 pb-2 w-full">Professional Experience</h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="text-sm font-bold uppercase mb-1">{exp.role}</div>
                                    <div className="text-sm font-bold text-slate-600 mb-2">
                                        {exp.company} <span className="mx-1 text-slate-400">-</span> {exp.dates}
                                    </div>
                                    <ul className="list-disc list-inside text-sm leading-relaxed text-slate-700 space-y-2 marker:text-slate-400">
                                        <li>{exp.desc}</li>
                                        <li>Always highlight your strongest accomplishments first.</li>
                                        <li>When starting your resume, highlight filler text and type.</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
