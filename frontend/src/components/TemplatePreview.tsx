import React from 'react';
import { ResumeData } from '../types';

// Template Imports
import { BasicTemplate1 } from './templates/basic/BasicTemplate1';
import { BasicTemplate2 } from './templates/basic/BasicTemplate2';
import { BasicTemplate3 } from './templates/basic/BasicTemplate3';
import { BasicTemplate4 } from './templates/basic/BasicTemplate4';
import { BasicTemplate5 } from './templates/basic/BasicTemplate5';
import { BasicTemplate6 } from './templates/basic/BasicTemplate6';
import { ModernTemplate1 } from './templates/modern/ModernTemplate1';
import { ModernTemplate2 } from './templates/modern/ModernTemplate2';
import { ModernTemplate3 } from './templates/modern/ModernTemplate3';
import { ModernTemplate4 } from './templates/modern/ModernTemplate4';
import { ModernTemplate5 } from './templates/modern/ModernTemplate5';
import { ModernTemplate6 } from './templates/modern/ModernTemplate6';
import { ProfessionalTemplate1 } from './templates/professional/ProfessionalTemplate1';
import { ProfessionalTemplate2 } from './templates/professional/ProfessionalTemplate2';
import { ProfessionalTemplate3 } from './templates/professional/ProfessionalTemplate3';
import { ProfessionalTemplate4 } from './templates/professional/ProfessionalTemplate4';
import { ProfessionalTemplate5 } from './templates/professional/ProfessionalTemplate5';
import { ProfessionalTemplate6 } from './templates/professional/ProfessionalTemplate6';

const PREVIEW_DATA: ResumeData = {
    name: "Alex Morgan",
    title: "Product Manager",
    email: "alex@example.com",
    phone: "+1 555 0123",
    summary: "Experienced Product Manager with a track record of delivering successful products. Skilled in agile methodologies, user research, and data analysis.",
    experiences: [
        { id: '1', company: 'Tech Corp', role: 'Senior PM', dates: '2020 - Present', desc: 'Led cross-functional teams to launch 3 major products. Increased user engagement by 40%.' },
        { id: '2', company: 'StartUp Inc', role: 'Product Manager', dates: '2018 - 2020', desc: 'Managed product roadmap and strategy. Collaborated with engineering and design teams.' }
    ],
    education: [
        { id: '1', school: 'University of Technology', degree: 'MBA', dates: '2016 - 2018' },
        { id: '2', school: 'State University', degree: 'BSc Computer Science', dates: '2012 - 2016' }
    ],
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    skills: "Product Management, Agile, Scrum, Jira, Python, SQL, User Research, A/B Testing",
    skillsDetail: [
        { id: '1', name: 'Product Strategy', level: 90 },
        { id: '2', name: 'Agile/Scrum', level: 85 },
        { id: '3', name: 'Data Analysis', level: 80 },
        { id: '4', name: 'User Research', level: 75 }
    ],
    sectionTitles: {
        summary: "Summary",
        experience: "Experience",
        skills: "Skills",
        education: "Education"
    },
    accentColor: "#2563eb",
    templateId: 'modern-1',
    sectionOrder: ['summary', 'experience', 'skills']
};

const TEMPLATE_DEFAULT_COLORS: Record<string, string> = {
    'basic-1': '#2563eb', // Blue
    'basic-2': '#1e293b', // Slate
    'basic-3': '#059669', // Emerald
    'basic-4': '#7c3aed', // Violet
    'basic-5': '#ea580c', // Orange
    'basic-6': '#0891b2', // Cyan
    'modern-1': '#2563eb', // Blue
    'modern-2': '#db2777', // Pink/Magenta
    'modern-3': '#059669', // Emerald
    'modern-4': '#7c3aed', // Violet
    'modern-5': '#ea580c', // Orange
    'professional-1': '#4f46e5', // Indigo
    'professional-2': '#9333ea', // Purple
    'professional-3': '#0891b2', // Cyan
    'professional-4': '#be123c', // Rose
    'professional-5': '#ca8a04', // Yellow/Gold
    'professional-6': '#18181b', // Zinc/Black
};

const PROFILE_IMAGES = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", // Man 1
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", // Woman 1
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", // Man 2
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", // Woman 2
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", // Man 3
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", // Woman 3
];

interface TemplatePreviewProps {
    templateId: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId }) => {
    // We render the template at a fixed scale to fit the preview card
    // The A4 size is ~210mm x 297mm. The preview container is smaller.
    // We'll use CSS scale to fit it.

    const accentColor = TEMPLATE_DEFAULT_COLORS[templateId] || "#2563eb";

    // Select image based on templateId string hash/length to be consistent but different
    const imgIndex = templateId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % PROFILE_IMAGES.length;
    const profileImage = PROFILE_IMAGES[imgIndex];

    const props = {
        data: { ...PREVIEW_DATA, accentColor, profileImage },
        // Dummy handlers to satisfy prop types (not used in static preview)
        onUpdate: () => { },
        onExpUpdate: () => { },
        onEduUpdate: () => { },
        onTitleUpdate: () => { },
        onSkillUpdate: () => { },
    };

    let Component;
    switch (templateId) {
        case 'basic-1': Component = BasicTemplate1; break;
        case 'basic-2': Component = BasicTemplate2; break;
        case 'basic-3': Component = BasicTemplate3; break;
        case 'basic-4': Component = BasicTemplate4; break;
        case 'basic-5': Component = BasicTemplate5; break;
        case 'basic-6': Component = BasicTemplate6; break;
        case 'modern-1': Component = ModernTemplate1; break;
        case 'modern-2': Component = ModernTemplate2; break;
        case 'modern-3': Component = ModernTemplate3; break;
        case 'modern-4': Component = ModernTemplate4; break;
        case 'modern-5': Component = ModernTemplate5; break;
        case 'modern-6': Component = ModernTemplate6; break;
        case 'professional-1': Component = ProfessionalTemplate1; break;
        case 'professional-2': Component = ProfessionalTemplate2; break;
        case 'professional-3': Component = ProfessionalTemplate3; break;
        case 'professional-4': Component = ProfessionalTemplate4; break;
        case 'professional-5': Component = ProfessionalTemplate5; break;
        case 'professional-6': Component = ProfessionalTemplate6; break;
        default: Component = ModernTemplate1; break;
    }

    return (
        <div className="w-[794px] h-[1123px] bg-white text-left overflow-hidden">
            <Component {...props} />
        </div>
    );
};
