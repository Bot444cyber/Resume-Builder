import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, Linkedin, Target, Briefcase, GraduationCap, Award, Heart } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate1: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans flex">
            {/* Left Sidebar */}
            <aside className="w-[30%] bg-zinc-100 flex flex-col items-center py-12 px-6 border-r border-zinc-200">

                {/* Profile Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-8 relative z-10">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>

                {/* Name & Title */}
                <h1 className="text-3xl font-serif font-bold text-center text-zinc-900 leading-tight mb-2">
                    {data.name.split(' ').map((n, i) => <span key={i} className="block">{n}</span>)}
                </h1>
                <p className="text-xs uppercase tracking-widest text-zinc-500 text-center mb-10 font-bold">{data.title}</p>

                <div className="w-16 h-0.5 bg-zinc-300 mb-10"></div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6 items-center text-center w-full mb-10">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1">
                            <Phone size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600">{data.phone}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1">
                            <Mail size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600 break-all">{data.email}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-1">
                            <Linkedin size={14} />
                        </div>
                        <span className="text-xs font-bold text-zinc-600">linkedin.com/in/{data.name.toLowerCase().replace(' ', '')}</span>
                    </div>
                </div>

                <div className="w-full border-t border-zinc-300 pt-8 mt-auto">
                    <h2 className="text-2xl font-serif font-bold text-zinc-900 text-center mb-6">Skills</h2>
                    <div className="flex flex-col gap-2 text-center text-sm font-medium text-zinc-600">
                        {data.skills.split(',').map((skill, i) => (
                            <div key={i}>{skill.trim()}</div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Right Content */}
            <main className="flex-1 p-12 pt-16 relative">
                {/* Top Right Decoration */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-100 rounded-bl-full z-0 opacity-50 pointer-events-none"></div>

                <div className="relative z-10 space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Target size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Objectives</h2>
                        </div>
                        <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                            {data.summary}
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Briefcase size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Experience</h2>
                        </div>

                        <div className="space-y-8 pl-4 border-l-2 border-indigo-50 ml-5">
                            {data.experiences.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-zinc-900">{exp.role}</h3>
                                        <span className="font-bold text-sm text-zinc-800">{exp.dates}</span>
                                    </div>
                                    <div className="text-sm italic text-zinc-500 mb-3">{exp.company}</div>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <GraduationCap size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Education</h2>
                        </div>
                        <div className="flex justify-between items-baseline pl-14">
                            <div>
                                <h3 className="font-bold text-base text-zinc-900">Bachelor of Science in Business Admin</h3>
                                <div className="text-sm italic text-zinc-500">Oklahoma University, Athens, OH</div>
                            </div>
                            <div className="font-bold text-sm text-zinc-800">2006-2009</div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Award size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Courses and Certificates</h2>
                        </div>
                        <div className="pl-14 text-sm text-zinc-600 space-y-1 font-medium">
                            <div>Digital Marketing Certificate, Medical Hat School, 2011</div>
                            <div>Effective Communication Skills course, Udemy, 2012</div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
                                <Heart size={20} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">Hobbies and Interests</h2>
                        </div>
                        <div className="pl-14 text-sm text-zinc-600 leading-relaxed max-w-sm">
                            Swimming, Football, Cycling, Shopping, Skiing, Jogging, Weight lifting, ping pong, etc.
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
