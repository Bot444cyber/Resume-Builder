import React from 'react';
import { PARTNERS } from './home/constants';
import { Facebook, Twitter, Linkedin, Instagram, Mail, LayoutTemplate, Shield, FileText, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
    const productLinks = [
        { name: 'Resume Builder', href: '/templates' },
        { name: 'CV Maker', href: '/templates' },
        { name: 'Templates', href: '/templates' },
    ];

    const resourceLinks = [
        { name: 'Career Blog', href: '#' },
        { name: 'Interview Tips', href: '#' },
        { name: 'Resume Examples', href: '#' },
        { name: 'Job Search', href: '#' },
        { name: 'Salary Analyzer', href: '#' },
    ];

    const contactInfo = [
        { icon: Mail, text: 'support@livecareer.com' },
        { icon: Phone, text: '+1 (555) 123-4567' },
        { icon: MapPin, text: '123 Career Blvd, Suite 100 San Francisco, CA 94105', isMultiLine: true },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ];

    const socialLinks = [Facebook, Twitter, Instagram, Linkedin];

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white text-lg">L</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Live<span className="text-blue-600">Career</span>
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                            Building careers with AI-powered tools. Create professional resumes, cover letters, and portfolios in minutes.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((Icon, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 hover:border-blue-600 transition-all"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Product</h3>
                        <ul className="space-y-4">
                            {productLinks.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {resourceLinks.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Contact</h3>
                        <ul className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-500 dark:text-gray-400">
                                    <info.icon size={18} className="text-blue-600 mt-1 shrink-0" />
                                    {info.isMultiLine ? (
                                        <span>{info.text.split('San Francisco').join('\nSan Francisco')}</span> // Simple linebreak hacking for now, or just let it wrap
                                    ) : (
                                        <span>{info.text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-gray-500 text-sm">
                        © 2024 LiveCareer. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        {legalLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
