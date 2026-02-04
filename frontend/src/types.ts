
export type TemplateId = 'basic' | 'basic-1' | 'basic-2' | 'basic-3' | 'basic-4' | 'basic-5' | 'basic-6' | 'modern' | 'modern-1' | 'modern-2' | 'modern-3' | 'modern-4' | 'modern-5' | 'professional' | 'professional-1' | 'professional-2' | 'professional-3' | 'professional-4' | 'professional-5' | 'professional-6' | 'creative' | 'classic' | 'minimalist' | 'tech';
export type ResumeSection = 'summary' | 'experience' | 'skills';

export interface Template {
    id: number;
    slug: TemplateId;
    name: string;
    image: string;
    description?: string;
    category?: string;
}

export interface Feature {
    id: number;
    title: string;
    description?: string;
}

export interface PartnerLogo {
    name: string;
    url: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    dates: string;
    desc: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    dates: string;
    desc?: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 0-100
}

export interface SectionTitles {
    summary: string;
    experience: string;
    skills: string;
    education: string;
}

export interface ResumeData {
    name: string;
    title: string;
    email: string;
    phone: string;
    address?: string;
    summary: string;
    experiences: Experience[];
    education: Education[];
    skills: string; // Keeping for backward compatibility
    skillsDetail: Skill[];
    customSectionTitle?: string;
    customSectionContent?: string;
    profileImage?: string;
    sectionTitles: SectionTitles;
    accentColor: string;
    templateId: TemplateId;
    sectionOrder: ResumeSection[];
}
