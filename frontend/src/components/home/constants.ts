
import { Feature, Template, PartnerLogo } from '../../types';

export const TEMPLATES: Template[] = [
    {
        id: 1,
        slug: 'basic',
        name: 'Basic',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400',
        description: 'Clean and simple design perfect for traditional industries',
        category: 'basic'
    },
    {
        id: 2,
        slug: 'modern',
        name: 'Modern',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400',
        description: 'Contemporary layout with accent colors and icons',
        category: 'modern'
    },
    {
        id: 3,
        slug: 'professional',
        name: 'Professional',
        image: 'https://images.unsplash.com/photo-1586281380349-631531a3d242?auto=format&fit=crop&q=80&w=400',
        description: 'Corporate style with structured sections',
        category: 'professional'
    },
];

export const FEATURES: Feature[] = [
    { id: 1, title: 'AI-Powered Content' },
    { id: 2, title: 'Real-time Live Preview' },
    { id: 3, title: 'Multi-Layout Switching' },
    { id: 4, title: 'Recruiter-Ready Exports' },
    { id: 5, title: 'CV Writing Services', description: 'From a quick review to a design refresh and more, our experts are here for you.' },
];

export const PARTNERS: PartnerLogo[] = [
    { name: 'TCS', url: '#' },
    { name: 'DHL', url: '#' },
    { name: 'Cognizant', url: '#' },
    { name: 'Deloitte.', url: '#' },
    { name: 'Infosys', url: '#' },
];
