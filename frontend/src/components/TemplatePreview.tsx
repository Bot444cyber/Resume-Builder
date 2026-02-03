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
    skills: "Product Management, Agile, Scrum, Jira, Python, SQL, User Research, A/B Testing",
    accentColor: "#2563eb",
    templateId: 'modern-1',
    sectionOrder: ['summary', 'experience', 'skills']
};

interface TemplatePreviewProps {
    templateId: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId }) => {
    // We render the template at a fixed scale to fit the preview card
    // The A4 size is ~210mm x 297mm. The preview container is smaller.
    // We'll use CSS scale to fit it.

    const props = { data: PREVIEW_DATA };

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
