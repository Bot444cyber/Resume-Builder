import React from 'react';
import Link from 'next/link';
import ResumeThumbnail from './ResumeThumbnail';
import { TemplatePreview } from './TemplatePreview';

interface TemplateCardProps {
    template: {
        id: string;
        name: string;
        category: string;
    };
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
    return (
        <div className="flex flex-col items-center group">
            <Link href={`/editor?template=${template.id}`} className="block mb-6 relative z-10">
                <ResumeThumbnail scale={0.26} className="transition-transform duration-500 ease-out group-hover:-translate-y-4 shadow-lg group-hover:shadow-2xl">
                    <TemplatePreview templateId={template.id} />
                </ResumeThumbnail>
            </Link>

            <div className="text-center z-20">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{template.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-5">{template.category}</p>
                <Link
                    href={`/editor?template=${template.id}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                >
                    Use This Template
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
};
