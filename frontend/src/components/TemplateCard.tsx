import React from 'react';
import Link from 'next/link';
import ResumeThumbnail from './ResumeThumbnail';
import { TemplatePreview } from './TemplatePreview';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TemplateCardProps {
    template: {
        id: string;
        name: string;
        category: string;
    };
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
    // A4 width (794px) * scale (0.35) = ~278px
    const CARD_WIDTH = '280px';

    return (
        <div className="group relative flex flex-col items-center mx-auto w-full" style={{ maxWidth: CARD_WIDTH }}>
            {/* Thumbnail Container */}
            <Link href={`/editor?template=${template.id}`} className="block relative z-10 w-full perspective-1000 rounded-3xl overflow-hidden">
                <div className="relative transform transition-all duration-700 ease-out group-hover:scale-[1.02]">
                    <ResumeThumbnail
                        scale={0.35}
                        className="shadow-md group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-none dark:border dark:border-slate-800 transition-all duration-700 rounded-3xl"
                    >
                        <TemplatePreview templateId={template.id} />
                    </ResumeThumbnail>

                    {/* Premium Hover Overlay - Appears on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 select-none sm:pointer-events-none sm:group-hover:pointer-events-auto">

                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                            {/* Metadata Pills */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                                    {template.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-black text-2xl text-white mb-4 tracking-tight drop-shadow-md">
                                {template.name}
                            </h3>

                            {/* Action Button */}
                            <div className="flex items-center gap-3">
                                <button
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 shadow-lg group/btn"
                                >
                                    <span className="text-sm">Use Template</span>
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
