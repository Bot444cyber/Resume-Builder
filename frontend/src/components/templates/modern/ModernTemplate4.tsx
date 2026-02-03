import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ModernResumeTemplateProps {
    data: ResumeData;
}

export const ModernTemplate4: React.FC<ModernResumeTemplateProps> = ({ data }) => {
    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div className="w-[210mm] min-h-[297mm] bg-slate-50 mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-800">
            {/* Soft Gradient Header */}
            <header className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-10 pb-16 rounded-b-[3rem] shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2 text-white drop-shadow-sm">{data.name}</h1>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-lg font-bold">{data.title}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-xs font-bold space-y-2">
                        <div className="flex items-center gap-2"><Mail size={14} /> {data.email}</div>
                        <div className="flex items-center gap-2"><Phone size={14} /> {data.phone}</div>
                        <div className="flex items-center gap-2"><MapPin size={14} /> New York, NY</div>
                    </div>
                </div>
            </header>

            <div className="px-10 -mt-8 grid grid-cols-12 gap-8">
                {/* Main Card */}
                <main className="col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <h2 className="text-fuchsia-600 font-black uppercase text-sm tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> Profile
                        </h2>
                        <p className="leading-relaxed text-slate-600">{data.summary}</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <h2 className="text-violet-600 font-black uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-violet-500"></span> Experience
                        </h2>
                        <div className="space-y-10">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-6 border-l-2 border-violet-100">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 border-violet-400 rounded-full"></div>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                                        <span className="text-xs font-bold bg-violet-50 text-violet-600 px-3 py-1 rounded-full">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 mb-3 uppercase">{exp.role}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sidebar Card */}
                <aside className="col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm">
                        <h2 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">Top Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skillsArray.map((skill, i) => (
                                <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-lg ${i % 2 === 0 ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-violet-50 text-violet-700'}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-lg text-white">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-4 opacity-70">Education</h2>
                        <div>
                            <div className="font-bold text-lg">RISD</div>
                            <div className="text-sm opacity-80 mb-1">Bachelor of Des.</div>
                            <div className="text-xs font-mono opacity-50">2016-2020</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
