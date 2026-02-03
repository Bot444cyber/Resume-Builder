
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Filter, Eye, Copy, ArrowRight, Sparkles, DownloadCloud, Star, X, Check } from 'lucide-react';

type Category = 'All' | 'Professional' | 'Creative' | 'Minimalist' | 'Executive';

interface Template {
    id: string;
    name: string;
    category: Category;
    thumbnail: string;
    popular?: boolean;
    downloads: number;
    rating: number;
    users: number;
    description?: string;
}

const TEMPLATES: Template[] = [
    { id: '1', name: 'Oxford Platinum', category: 'Professional', thumbnail: 'https://picsum.photos/seed/ox-hd/600/800', popular: true, downloads: 12400, rating: 4.9, users: 8500, description: 'A timeless academic-professional layout optimized for high-tier corporate roles.' },
    { id: '2', name: 'Berlin Canvas', category: 'Creative', thumbnail: 'https://picsum.photos/seed/be-hd/600/800', downloads: 8200, rating: 4.7, users: 5100, description: 'Bold typography and asymmetric layouts for the modern creative professional.' },
    { id: '3', name: 'Tokyo Zen', category: 'Minimalist', thumbnail: 'https://picsum.photos/seed/to-hd/600/800', popular: true, downloads: 15600, rating: 4.8, users: 11200, description: 'Focus on content with a clean, distraction-free aesthetic that recruiters love.' },
    { id: '4', name: 'London Elite', category: 'Executive', thumbnail: 'https://picsum.photos/seed/lo-hd/600/800', downloads: 5400, rating: 4.9, users: 3200, description: 'Designed for senior leadership, emphasizing strategic impact and key metrics.' },
    { id: '5', name: 'Parisian Atelier', category: 'Creative', thumbnail: 'https://picsum.photos/seed/pa-hd/600/800', downloads: 7100, rating: 4.6, users: 4400, description: 'Sophisticated elegance meeting artistic flair. Perfect for design and fashion.' },
    { id: '6', name: 'Wall Street', category: 'Executive', thumbnail: 'https://picsum.photos/seed/wa-hd/600/800', downloads: 9800, rating: 5.0, users: 6700, description: 'The industry standard for finance and legal professionals requiring a powerful presence.' },
    { id: '7', name: 'Zurich Prime', category: 'Professional', thumbnail: 'https://picsum.photos/seed/zu-hd/600/800', downloads: 11200, rating: 4.8, users: 7900, description: 'Precision-engineered for tech and engineering roles with deep technical sections.' },
    { id: '8', name: 'Stockholm Nord', category: 'Minimalist', thumbnail: 'https://picsum.photos/seed/st-hd/600/800', downloads: 6300, rating: 4.7, users: 4100, description: 'A breatheable, modern layout that makes long work histories easy to scan.' },
];

const CATEGORIES: Category[] = ['All', 'Professional', 'Creative', 'Minimalist', 'Executive'];

const TemplatesGallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const filteredTemplates = useMemo(() => {
        return TEMPLATES.filter(template => {
            const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const formatNumber = (num: number) => {
        return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
    };

    return (
        <section className="py-24 md:py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" id="templates">
            <div className="hd-glow bottom-0 right-0 opacity-40" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-20 text-center md:text-left">
                    <div className="max-w-2xl mx-auto md:mx-0">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-none">
                            The Gallery of <span className="gradient-text">Excellence.</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-500 dark:text-gray-400 font-semibold tracking-tight">
                            Recruiter-approved templates designed for impact. Optimized for both visual dominance and machine parsing.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all duration-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-14 pr-8 py-4.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-[6px] focus:ring-blue-500/5 focus:border-blue-500/50 transition-all w-full sm:w-80 font-bold text-slate-700 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-6 mb-12 md:mb-16 scrollbar-hide no-scrollbar border-b border-slate-50 dark:border-slate-900">
                    <div className="flex items-center gap-2 text-slate-300 dark:text-slate-600 mr-4 md:mr-6 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                        <Filter size={14} />
                        Filter
                    </div>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-xs md:text-[13px] font-black whitespace-nowrap transition-all duration-500 ${activeCategory === cat
                                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)]'
                                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
                    {filteredTemplates.map((template) => (
                        <div key={template.id} className="group relative">
                            <div
                                onClick={() => setSelectedTemplate(template)}
                                className="relative aspect-[3/4.2] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] hover:-translate-y-3 cursor-pointer card-shine"
                            >
                                <Image
                                    src={template.thumbnail}
                                    alt={template.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                />

                                {template.popular && (
                                    <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-xl z-10 border border-white/50 dark:border-slate-800/50">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600 flex items-center gap-1.5">
                                            <Sparkles size={12} /> Trending
                                        </span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-md">
                                    <div className="mb-4 flex gap-6 text-white animate-in zoom-in-95 duration-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1.5 text-yellow-400">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-sm font-black">{template.rating}</span>
                                            </div>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rating</span>
                                        </div>
                                        <div className="w-px h-8 bg-slate-800" />
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1.5 text-blue-400">
                                                <DownloadCloud size={14} />
                                                <span className="text-sm font-black">{formatNumber(template.downloads)}</span>
                                            </div>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Uses</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template); }}
                                        className="w-full bg-white text-slate-950 px-6 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2.5 hover:scale-105 transition-all active:scale-95 shadow-xl"
                                    >
                                        <Eye size={16} />
                                        Live Preview
                                    </button>
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2.5 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
                                    >
                                        <Copy size={16} />
                                        Use Template
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-center px-2">
                                <div>
                                    <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight mb-0.5 group-hover:text-blue-600 transition-colors">{template.name}</h4>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{template.category}</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="py-32 text-center animate-in fade-in duration-700">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-700">
                            <Search size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">No designs found.</h3>
                        <p className="text-slate-400 font-semibold mb-8 text-sm">Try a different search query or category filter.</p>
                        <button
                            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                            className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* High-Resolution Preview Modal - Responsive Optimized */}
            {selectedTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-400"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button - Floating on mobile, integrated on desktop */}
                        <button
                            onClick={() => setSelectedTemplate(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 hover:scale-110 transition-all shadow-xl"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                        </button>

                        {/* Modal - Preview Area (Scrollable Image) */}
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-6 md:p-12 lg:p-16 overflow-y-auto no-scrollbar border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 flex items-center justify-center">
                            <div className="aspect-[3/4.2] w-full max-w-[28rem] lg:max-w-none lg:h-full rounded-2xl md:rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden bg-white border border-slate-200 group relative">
                                <Image
                                    src={selectedTemplate.thumbnail}
                                    alt={selectedTemplate.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Modal - Details Area */}
                        <div className="w-full lg:w-[26rem] p-8 md:p-10 lg:p-12 flex flex-col bg-white dark:bg-slate-950 overflow-y-auto">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-900/50">
                                    <Sparkles size={14} /> Elite Status
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 leading-none">{selectedTemplate.name}</h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">{selectedTemplate.category} Architecture</p>

                                <p className="text-slate-500 dark:text-gray-400 font-semibold leading-relaxed mb-10 text-sm md:text-base">
                                    {selectedTemplate.description || 'Elevate your career trajectory with a high-performance architecture engineered for clarity and cognitive impact.'}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">{selectedTemplate.rating}</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">{formatNumber(selectedTemplate.downloads)}</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Deployments</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {['ATS-Optimized structure', 'Recruiter-vetted layout', 'HD Print quality'].map((f) => (
                                        <div key={f} className="flex items-center gap-3 text-slate-600 dark:text-gray-400 font-bold text-sm">
                                            <Check size={14} className="text-emerald-500" strokeWidth={3} />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-4">
                                <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black text-base shadow-2xl hover:bg-blue-600 dark:hover:bg-gray-200 transition-all active:scale-95 animate-shimmer">
                                    Build With This Design
                                </button>
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="w-full lg:hidden bg-white dark:bg-slate-950 text-slate-500 dark:text-gray-400 py-4 rounded-2xl font-black text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                                >
                                    Back to Gallery
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TemplatesGallery;
