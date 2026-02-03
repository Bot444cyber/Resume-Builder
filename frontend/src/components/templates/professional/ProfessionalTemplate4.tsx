import React from 'react';
import { ResumeData } from '../../../types';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate4: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-900 p-12">

            {/* Abstract Overlays */}
            <div className="absolute top-[80px] left-[200px] w-[300px] h-[500px] bg-pink-400/80 rounded-[100px] transform -rotate-12 mix-blend-multiply z-0 filter blur-sm"></div>
            <div className="absolute top-[200px] left-[450px] w-[250px] h-[550px] bg-emerald-400/80 rounded-full transform rotate-6 mix-blend-multiply z-0 filter blur-sm"></div>
            <div className="absolute bottom-[100px] right-[50px] w-[300px] h-[300px] bg-sky-300/60 rounded-full mix-blend-multiply z-0 filter blur-sm"></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <header className="flex justify-between items-start mb-16">
                    <h1 className="text-7xl font-light tracking-tight uppercase leading-none">
                        {data.name.split(' ').map((n, i) => (
                            <span key={i} className="block">{n}</span>
                        ))}
                    </h1>
                    <div className="w-24 h-24 bg-slate-200 rounded-sm overflow-hidden shadow-lg border-2 border-white">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                    </div>
                </header>

                <div className="mb-16">
                    <h2 className="text-xl font-medium uppercase tracking-widest mb-4">Restaurant Manager</h2>
                    <div className="grid grid-cols-2 gap-12">
                        <p className="text-sm font-medium leading-loose text-slate-800">
                            {data.summary}
                        </p>
                        <div className="text-right text-2xl font-light">
                            <div className="mb-1">{data.phone}</div>
                            <div className="uppercase tracking-widest text-sm font-bold border-b-2 border-black inline-block pb-1 mb-1">{data.email}</div>
                            <div className="text-sm font-bold mt-2 opacity-60">New York, NY</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12 flex-1">
                    <div className="col-span-7">
                        <h2 className="text-2xl font-light uppercase tracking-widest mb-8">Employment History</h2>
                        <div className="space-y-10">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-2 bg-white/40 backdrop-blur-sm p-2 rounded">
                                        <h3 className="font-bold text-lg">{exp.role} at {exp.company}</h3>
                                        <span className="text-xs font-mono font-bold">{exp.dates}</span>
                                    </div>
                                    <ul className="list-disc list-inside text-sm leading-relaxed font-medium text-slate-800 pl-2">
                                        <li>{exp.desc}</li>
                                        <li>Effectively coordinated daily management operations.</li>
                                        <li>Altered the menu based on seasonal offerings.</li>
                                        <li>Monitored dining room and seating changes.</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-5">
                        <h2 className="text-2xl font-light uppercase tracking-widest mb-8 text-right">Skills</h2>
                        <div className="flex flex-col items-end gap-3 filter drop-shadow-sm">
                            {data.skills.split(',').map((skill, i) => (
                                <div key={i} className="flex items-center gap-4 w-full justify-end">
                                    <span className="text-sm font-bold text-slate-900">{skill.trim()}</span>
                                    <span className="text-xs font-bold uppercase text-slate-500">Expert</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
