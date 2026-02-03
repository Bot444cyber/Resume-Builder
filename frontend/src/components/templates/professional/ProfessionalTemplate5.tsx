import React from 'react';
import { ResumeData } from '../../../types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, User } from 'lucide-react';

interface ProfessionalResumeTemplateProps {
    data: ResumeData;
}

export const ProfessionalTemplate5: React.FC<ProfessionalResumeTemplateProps> = ({ data }) => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl relative overflow-hidden font-sans text-slate-900">
            {/* Yellow Circle Background */}
            <div className="absolute top-[50px] right-[50px] w-[500px] h-[500px] bg-yellow-400 rounded-full z-0"></div>

            <div className="relative z-10 p-16 pb-0 pt-20">
                {/* Header */}
                <div className="flex items-center justify-between mb-24 relative">
                    <div className="bg-white p-12 pr-20 rounded-[4rem] shadow-xl relative z-10 max-w-xl">
                        <h1 className="text-5xl font-black text-center leading-tight mb-2 text-balance">{data.name}</h1>
                        <div className="bg-yellow-400 text-center py-1 font-bold uppercase tracking-widest text-xs mx-auto w-fit px-4">
                            {data.title}
                        </div>
                        <div className="flex justify-center gap-2 mt-4 items-center font-bold text-slate-700">
                            {/* Logo Placeholder */}
                            <div className="w-6 h-6 bg-slate-900 rotate-45"></div>
                            <span>Green Wealth Management</span>
                        </div>
                    </div>

                    <div className="absolute right-12 top-0 w-[240px] h-[320px] overflow-hidden rounded-b-full rounded-t-lg shadow-2xl border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-16">

                    {/* Education & Experience */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-slate-900 shadow-md">
                                <GraduationCap size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Education <br /> & Experience</h2>
                        </div>
                        <div className="space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
                            <p>{data.summary}</p>
                            <ol className="list-decimal list-inside space-y-2 marker:font-black">
                                <li>Graduated from Stanford University in 2012.</li>
                                <li>Started career in banking at JP Morgan Chase.</li>
                                <li>Acquired Certified Financial Planner designation.</li>
                            </ol>
                        </div>
                    </div>

                    {/* Working Approach */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-slate-900 shadow-md">
                                <Briefcase size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Working <br /> Approach</h2>
                        </div>
                        <p className="text-sm font-medium text-slate-700 leading-loose text-justify">
                            Placing values on integrity and diligence. Joshua spends time with his clients collecting in-depth information. He understands their goals through a comprehensive financial approach. He answers to that urgent phone call, and works with them to save their worries.
                        </p>
                    </div>

                    {/* Achievements */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-slate-900 shadow-md">
                                <Award size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Achievements</h2>
                        </div>
                        <div className="space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
                            <p>• Has organized and presented hundreds of financial education seminars.</p>
                            <p>• One of his passions is teaching workshops on money management.</p>
                        </div>
                    </div>

                    {/* Outside the Office */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-slate-900 shadow-md">
                                <User size={32} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black leading-tight">Outside the <br /> Office</h2>
                        </div>
                        <p className="text-sm font-medium text-slate-700 leading-loose text-justify">
                            When he is not in the office, he and his wife, Rachel, love to travel to visit their three daughters. Joshua loves playing the violin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 border-t border-slate-200 p-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center"><Mail size={14} /></div>
                    <span className="text-xs font-bold">{data.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center"><Phone size={14} /></div>
                    <span className="text-xs font-bold">{data.phone}</span>
                </div>
            </div>
        </div>
    );
};
