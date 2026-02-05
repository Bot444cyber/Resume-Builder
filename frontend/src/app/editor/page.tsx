
"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResumeEditor from '../../components/ResumeEditor';
import { TemplateId } from '../../types';

function EditorContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const templateId = searchParams.get('template') || 'modern';

    const handleBack = () => {
        router.push('/templates');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
            {/* Passing the template ID as any for now until we update types, 
           ResumeEditor will default to professional/modern if not found 
           but we'll update ResumeEditor next to handle specific IDs */}
            <ResumeEditor onBack={handleBack} initialTemplate={templateId as TemplateId} />
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading Editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
