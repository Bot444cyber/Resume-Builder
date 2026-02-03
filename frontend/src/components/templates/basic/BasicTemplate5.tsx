import React from 'react';
import { ResumeData } from '../../../types';

interface BasicResumeTemplateProps {
    data: ResumeData;
}

export const BasicTemplate5: React.FC<BasicResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-[#E8E8E8] mx-auto shadow-2xl relative overflow-hidden font-sans text-stone-800 p-12">

            {/* Header */}
            <header className="mb-12 relative">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-5xl font-normal tracking-wide text-stone-900 mb-2">{data.name}</h1>
                        <p className="text-lg uppercase tracking-[0.2em] text-stone-600">{data.title}</p>
                    </div>
                    <div className="text-right text-sm text-stone-500 font-light leading-relaxed">
                        <div>Santa Monica, CA</div>
                        <div>{data.email}</div>
                        <div>{data.phone}</div>
                    </div>
                </div>

                {/* Decorative Lines and Rings */}
                <div className="relative h-16 flex items-center justify-center">
                    <div className="absolute w-full h-px bg-stone-400 top-1/2 -translate-y-[6px]"></div>
                    <div className="absolute w-full h-px bg-stone-400 top-1/2 translate-y-[6px]"></div>

                    <div className="relative z-10 bg-[#E8E8E8] px-4 flex -space-x-4">
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                        <div className="w-12 h-12 rounded-full border border-stone-800 bg-transparent"></div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12 relative">
                {/* Vertical Divider Line */}
                <div className="absolute left-[33%] top-0 bottom-0 w-px bg-stone-400"></div>

                {/* Left Column */}
                <aside className="col-span-4 pr-4 space-y-12">
                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">About Me</h2>
                        <p className="text-xs leading-loose text-justify text-stone-600 font-light">
                            {data.summary}
                        </p>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">Skills</h2>
                        <div className="flex flex-col gap-2 text-xs font-light text-stone-600">
                            {data.skills.split(',').map((skill, i) => (
                                <span key={i} className="block">{skill.trim()}</span>
                            ))}
                        </div>
                    </section>
                </aside>

                {/* Right Column */}
                <main className="col-span-8 space-y-12 pl-4">
                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-6">Work Experience</h2>
                        <div className="space-y-8">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex items-baseline gap-2 mb-2 font-bold text-stone-800 text-sm uppercase">
                                        <span>{exp.role}</span>
                                        <span className="text-stone-400">//</span>
                                        <span>{exp.company}</span>
                                        <span className="text-stone-400">//</span>
                                        <span>{exp.dates}</span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-stone-600 font-light text-justify pl-4 border-l border-stone-300">
                                        • {exp.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">Education</h2>
                        <div className="text-sm">
                            <span className="uppercase text-stone-700 font-medium">Bachelor of Science in Computer Science</span>
                            <span className="text-stone-400 mx-2">//</span>
                            <span className="uppercase text-stone-500">University of Tech</span>
                            <span className="text-stone-400 mx-2">//</span>
                            <span className="text-stone-500">2019</span>
                        </div>
                    </section>

                    <div className="w-full h-px bg-stone-400"></div>

                    <section>
                        <h2 className="text-lg font-mono font-bold text-stone-800 mb-4">Certifications</h2>
                        <div className="text-xs font-light text-stone-600 uppercase tracking-wide">
                            Certified Training and Development Professional (CTDP)
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer Lines */}
            <div className="absolute bottom-12 left-12 right-12 h-16 flex flex-col justify-center gap-2">
                <div className="w-full h-px bg-stone-400"></div>
                <div className="w-full h-px bg-stone-400"></div>
            </div>
        </div>
    );
};
