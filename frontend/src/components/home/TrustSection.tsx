import React from 'react';

const TrustSection: React.FC = () => {
    return (
        <section className="py-12 lg:py-24 px-6 lg:px-24 bg-white dark:bg-black overflow-hidden border-b border-gray-50 dark:border-slate-800 transition-colors duration-300">
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
                            "LiveCareer customers got the job on average <span className="text-slate-900 dark:text-white font-bold">48 days faster</span> than candidates without a professional CV."
                        </p>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            *based on a survey of 258 LiveCareer users
                        </p>
                    </div>

                    {/* Right Content - Image Grid with Swooshes */}
                    <div className="relative">
                        {/* Decorative Swooshes */}
                        <div className="absolute -inset-10 z-0 pointer-events-none opacity-50">
                            <div className="absolute top-[10%] right-[0%] w-[40%] h-[70%] bg-slate-200/50 dark:bg-white/5 rounded-full blur-[60px] opacity-60 transform rotate-[15deg]"></div>
                            <div className="absolute bottom-[0%] left-[10%] w-[60%] h-[40%] bg-gray-200/50 dark:bg-white/5 rounded-full blur-[80px] opacity-40"></div>
                        </div>

                        {/* Grid of Users - Professional Masonry Layout */}
                        <div className="grid grid-cols-4 gap-4 relative z-10 perspective-1000">
                            {[
                                "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&h=200&q=80",
                                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&h=200&q=80"
                            ].map((imgUrl, i) => (
                                <div key={i} className={`group relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 transition-all duration-500 ease-out hover:scale-110 hover:shadow-2xl hover:z-20 hover:border-slate-300 dark:hover:border-slate-600 ${i % 2 === 0 ? 'translate-y-6' : '-translate-y-2'
                                    }`}>
                                    <div className="absolute inset-0 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                                    <img
                                        src={imgUrl}
                                        alt={`Professional User ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                        loading="lazy"
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
