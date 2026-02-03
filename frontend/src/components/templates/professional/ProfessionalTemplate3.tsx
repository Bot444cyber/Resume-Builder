import React from 'react';
import { ResumeData } from '../../../types';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate3: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-blue-50 mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-bl-[100px] rounded-tl-[50px] z-0"></div>
            <div className="absolute -left-20 bottom-0 w-[500px] h-[200px] bg-blue-200/50 rounded-tr-[100px] rounded-br-[50px] z-0"></div>

            {/* Blue Decor Elements */}
            <div className="absolute top-[280px] right-[50px] w-24 h-24 text-blue-800 rotate-12 z-0 opacity-80">
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,50 Q40,20 60,50 T90,50" stroke="currentColor" strokeWidth="15" fill="none" strokeLinecap="round" />
                </svg>
            </div>
            <div className="absolute bottom-[200px] right-[50px] w-32 h-64 text-blue-300 z-0 opacity-60">
                <svg viewBox="0 0 100 200" fill="currentColor">
                    <path d="M10,10 C50,50 50,150 10,190" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" />
                </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[150px] flex items-end opacity-90 z-0 pointer-events-none">
                <div className="w-1/3 h-24 bg-blue-300 rounded-tr-[80px]"></div>
                <div className="w-1/4 h-32 bg-blue-900 rounded-tl-[60px] rounded-tr-[40px] -ml-8"></div>
            </div>


            <div className="relative z-10 p-12 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-16">
                    <div className="w-2/3 pt-8">
                        <h1 className="text-6xl font-black text-blue-950 leading-tight mb-2 tracking-tight">
                            {data.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                        </h1>
                        <p className="text-2xl font-bold text-blue-700 mb-6">{data.title}</p>
                        <p className="text-slate-600 leading-relaxed max-w-lg font-medium">
                            {data.summary}
                        </p>
                    </div>
                    {/* Photo Placeholder */}
                    <div className="w-[180px] h-[180px] bg-slate-200 rounded-full mt-8 mr-8 border-4 border-white shadow-xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    {/* Main Content */}
                    <div className="col-span-8 space-y-10">
                        <section>
                            <h2 className="text-2xl font-black text-blue-950 mb-6">Employment History</h2>
                            <div className="space-y-8">
                                {data.experiences.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex flex-col mb-1">
                                            <h3 className="text-lg font-bold text-slate-900">{exp.role}, {exp.company}</h3>
                                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{exp.dates}</span>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-blue-950 mb-6">Education</h2>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Bachelor of Marketing at McGill University, Montreal</h3>
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">August 2015 — May 2019</span>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-10">
                        <section>
                            <h2 className="text-xl font-black text-blue-950 mb-4">Details</h2>
                            <div className="text-sm font-medium text-slate-600 space-y-1">
                                <div className="break-words">{data.email}</div>
                                <div>{data.phone}</div>
                                <div>New York, USA</div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-blue-950 mb-4">Skills</h2>
                            <div className="space-y-4">
                                {skillsArray.map((skill, i) => (
                                    <div key={i}>
                                        <div className="text-sm font-bold text-slate-700 mb-1">{skill}</div>
                                        <div className="h-1.5 w-full bg-blue-100 rounded-full">
                                            <div className="h-full bg-blue-800 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-blue-950 mb-4">References</h2>
                            <div className="text-sm font-medium text-slate-600 space-y-4">
                                <div>
                                    <div className="font-bold text-slate-900">Christine Faulkner</div>
                                    <div className="text-xs">McGill University</div>
                                    <div className="text-xs opacity-70">514-229-2938</div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">John Rey</div>
                                    <div className="text-xs">John Rey Photography</div>
                                    <div className="text-xs opacity-70">601-887-4322</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
