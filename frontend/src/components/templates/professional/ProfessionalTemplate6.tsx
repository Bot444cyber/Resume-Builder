import React from 'react';
import { ResumeData } from '../../../types';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate6: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800 flex">

            {/* Left Column (30%) */}
            <aside className="w-[30%] flex flex-col border-r border-slate-200">
                {/* Yellow Header */}
                <header className="bg-yellow-400 py-12 px-6 text-center">
                    <h1 className="text-3xl font-black uppercase tracking-widest leading-none mb-2 text-slate-900">
                        {data.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                    </h1>
                </header>

                {/* Photo */}
                <div className="w-full aspect-square bg-slate-200 overflow-hidden relative grayscale">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>

                <div className="p-8 text-center flex-1 flex flex-col items-center">
                    {/* Title */}
                    <div className="w-full border-b-4 border-slate-800 mb-4"></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-slate-700">{data.title}</h2>
                    <div className="w-full border-b-4 border-slate-800 mb-10"></div>

                    {/* Contact */}
                    <div className="text-xs font-bold text-slate-600 mb-10 space-y-1">
                        <div>The Plaza, New York</div>
                        <div>NY 10019</div>
                        <div>LinkdedIn: {data.name.replace(' ', '').toLowerCase()}</div>
                        <div>{data.email}</div>
                        <div>{data.phone}</div>
                    </div>

                    <div className="w-16 h-1 bg-slate-800 mb-10"></div>

                    {/* Summary */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-slate-700">Summary</h3>
                        <p className="text-xs leading-loose text-justify text-slate-600 font-medium">
                            {data.summary}
                        </p>
                    </section>
                </div>
            </aside>

            {/* Middle Column (35%) */}
            <section className="w-[35%] pt-12 px-6 pb-0 flex flex-col">
                <div className="text-center mb-10">
                    <div className="w-16 h-1.5 bg-slate-800 mx-auto mb-4"></div>
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] leading-tight text-slate-700">Work<br />Experience</h2>
                </div>

                <div className="space-y-10 flex-1">
                    {data.experiences.map((exp) => (
                        <div key={exp.id} className="text-center">
                            <h3 className="text-sm font-black text-slate-900">{exp.role}</h3>
                            <div className="text-xs font-bold text-slate-600 mb-1">{exp.company} | {exp.dates}</div>
                            <p className="text-[10px] leading-relaxed text-slate-600 font-medium text-justify mt-2">
                                {exp.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Education Box */}
                <div className="bg-yellow-400 p-8 text-center mt-8 mb-12">
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4 text-slate-900">Education</h2>
                    <div className="text-sm font-bold text-slate-900">Bachelor of Arts in Computer Science</div>
                    <div className="text-xs font-medium text-slate-800 mt-1">University of Technology</div>
                    <div className="text-xs font-medium text-slate-800">New York | 2019</div>
                </div>
            </section>

            {/* Right Column (35%) */}
            <aside className="w-[35%] pt-12 px-6 border-l border-slate-200">
                {/* Certifications Box */}
                <div className="bg-yellow-400 p-8 text-center mb-12">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-slate-900">Certifications</h2>
                    <div className="space-y-2 text-xs font-bold text-slate-800">
                        <div>Certified Professional (CPRP)</div>
                        <div>Digital Marketing Certificate</div>
                        <div>Social Media Marketing</div>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-2 text-slate-700">Skills</h2>
                    <div className="w-full border-b-2 border-slate-800"></div>
                </div>

                <div className="space-y-8">
                    {/* Software Skills */}
                    <section className="text-center">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">Software Skills</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="text-[10px] font-bold mb-1">Microsoft Office Suite</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[90%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold mb-1">Adobe Creative Suite</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[75%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold mb-1">Content Management (CMS)</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Skills */}
                    <section className="text-center">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">Technical Skills</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="text-[10px] font-bold mb-1">Written Communication</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[95%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold mb-1">Public Relations Strategy</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[60%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold mb-1">Market Research</div>
                                <div className="h-2 w-full bg-slate-200">
                                    <div className="h-full bg-yellow-400 w-[30%]"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </aside>

        </div>
    );
};
