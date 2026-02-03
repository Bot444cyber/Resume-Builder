import React from 'react';

const TrustSection: React.FC = () => {
    return (
        <section className="py-24 px-6 lg:px-24 bg-white dark:bg-slate-950 overflow-hidden border-b border-gray-50 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div className="animate-slide-left opacity-0" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-[#00b67a] text-white flex items-center justify-center rounded">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Trustpilot</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-[900] text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
                            Trusted by recruiters and job-seekers around the world.
                        </h2>

                        {/* Trustpilot Stars */}
                        <div className="flex gap-1 mb-10">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-12 h-12 bg-[#00b67a] flex items-center justify-center text-white rounded sm shadow-sm">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-3 leading-relaxed max-w-lg">
                            "LiveCareer customers got the job on average <span className="text-blue-600 dark:text-blue-400 font-bold">48 days faster</span> than candidates without a professional CV."
                        </p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            *based on a survey of 258 LiveCareer users
                        </p>
                    </div>

                    {/* Right Content - Image Grid with Swooshes */}
                    <div className="relative">
                        {/* Decorative Swooshes */}
                        <div className="absolute -inset-10 z-0 pointer-events-none opacity-50">
                            <div className="absolute top-[10%] right-[0%] w-[40%] h-[70%] bg-blue-100 dark:bg-blue-900/30 rounded-full blur-[60px] opacity-60 transform rotate-[15deg]"></div>
                            <div className="absolute bottom-[0%] left-[10%] w-[60%] h-[40%] bg-purple-100 dark:bg-purple-900/30 rounded-full blur-[80px] opacity-40"></div>
                        </div>

                        {/* Grid of Users */}
                        <div className="grid grid-cols-4 gap-3 relative z-10">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={`aspect-square rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:scale-110 hover:shadow-xl hover:z-20 border-2 border-white dark:border-slate-800 ${i % 3 === 0 ? 'translate-y-4' : ''
                                    }`}>
                                    <img
                                        src={`https://picsum.photos/200/200?random=${50 + i}`}
                                        alt={`User ${i + 1}`}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
