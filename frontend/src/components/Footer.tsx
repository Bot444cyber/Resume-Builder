import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, LayoutTemplate, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
    const productLinks = [
        { name: 'Templates', href: '/templates' },
        { name: 'Create Resume', href: '/templates' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
    ];

    const socialLinks = [
        { icon: Twitter, href: '#' },
        { icon: Github, href: '#' },
        { icon: Linkedin, href: '#' }
    ];

    return (
        <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                <Image
                                    src="/image/website/svg/icon.svg"
                                    alt="CVBuilder Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                                CVBuilder<span className="text-blue-600 dark:text-blue-500">.</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed max-w-sm">
                            The professional's choice for building stunning, ATS-friendly resumes.
                            Crafted with precision to help you land your dream job.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                                >
                                    <social.icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h3>
                        <ul className="space-y-4">
                            {productLinks.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact - Simplified */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:support@cvbuilder.com" className="flex items-center gap-3 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                    <Mail size={18} />
                                    <span>support@cvbuilder.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-gray-500 text-sm font-medium">
                        © {new Date().getFullYear()} CVBuilder. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8 text-sm">
                        {legalLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
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
