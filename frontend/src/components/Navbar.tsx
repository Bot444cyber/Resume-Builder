import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, FileText, Briefcase, LayoutTemplate, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeProvider';

interface NavbarProps {
    onLogoClick?: () => void;
    isEditorMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, isEditorMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine text color based on state and theme
    // Scrolled: Always dark text (on white bg) - unless we want dark mode navbar to be dark? 
    // Let's go with: 
    // - Light Mode + Scrolled = White/Glass Navbar + Dark Text
    // - Dark Mode + Scrolled = Dark/Glass Navbar + White Text
    // - Transparent (Top) + Light Mode = Dark Text
    // - Transparent (Top) + Dark Mode = White Text

    // Actually, simpler logic:
    // Theme 'dark' = Always White text (background handles itself)
    // Theme 'light' + Scrolled = Dark Text
    // Theme 'light' + Top = Dark Text (usually) - BUT Hero is Dark in dark mode. 

    // Wait, the Hero design in Dark mode requires white text. In Light mode (white bg), it needs dark text.
    // So if theme === 'dark', text is white. If theme === 'light', text is dark.

    // Exception: If we are on top of a dark hero in light mode? No, light mode hero will be light.

    const isDark = theme === 'dark';
    const textColorClass = isDark ? 'text-white' : 'text-slate-900';
    const hoverColorClass = isDark ? 'hover:text-blue-400' : 'hover:text-blue-600';
    const logoTextClass = isDark ? 'text-white' : 'text-slate-900';

    const navBgClass = scrolled
        ? (isDark ? 'bg-black/90 backdrop-blur-md border-slate-800' : 'bg-white/90 backdrop-blur-md border-slate-200 shadow-sm')
        : 'bg-transparent border-transparent';

    // Navigation Data
    const navLinks = [
        { name: 'Templates', href: '/templates', icon: LayoutTemplate },
        { name: 'AI Analyzer', href: '#', icon: Briefcase },
        { name: 'Resources', href: '#', icon: FileText },
    ];

    const actionLinks = [
        { name: 'Create Resume', href: '/templates', type: 'primary', icon: ArrowRight }
    ];

    if (isEditorMode) {
        return (
            <nav className="sticky top-0 z-100 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 py-3 px-6 lg:px-24">
                {/* Editor Mode Navbar Content - Keeping as is for now, maybe add toggle later if needed */}
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group relative z-50">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/image/website/svg/icon.svg"
                                alt="Resume Builder Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            CVBuilder<span className="text-blue-600 dark:text-blue-500">.</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 hidden sm:block">Editor Mode</span>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center gap-2">
                            Download PDF
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav className={`fixed top-0 inset-x-0 z-100 transition-all duration-300 backdrop-blur-xl border-b ${navBgClass} py-3 px-6 lg:px-24`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={onLogoClick}>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/image/website/svg/icon.svg"
                                alt="Resume Builder Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            CVBuilder<span className="text-blue-600 dark:text-blue-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className={`hidden lg:flex items-center gap-2 px-2`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isDark
                                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-full transition-all duration-300 ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {actionLinks.map((action) => (
                            action.type === 'text' ? (
                                <Link key={action.name} href={action.href} className={`text-sm font-semibold ${textColorClass} ${hoverColorClass} transition-colors`}>
                                    {action.name}
                                </Link>
                            ) : (
                                <Link key={action.name} href={action.href} className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-md group ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                    {action.name}
                                    {action.icon && <action.icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className={`p-2 z-50 relative ${isDark ? 'text-white' : 'text-slate-900'}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-90 ${isDark ? 'bg-black' : 'bg-white'} transition-all duration-300 transform lg:hidden flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                }`}>
                <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-2xl font-bold flex items-center gap-4 py-2 border-b ${isDark ? 'text-white border-white/10' : 'text-slate-900 border-gray-100'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <link.icon className="w-6 h-6 text-blue-600" />
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-8 flex flex-col gap-4">
                        {actionLinks.map((action) => (
                            <Link
                                key={action.name}
                                href={action.href}
                                className={`w-full py-4 text-center font-bold rounded-xl ${action.type === 'text'
                                    ? (isDark ? 'text-white bg-white/10' : 'text-slate-700 bg-slate-50')
                                    : 'text-white bg-blue-600 shadow-lg shadow-blue-500/30'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {action.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
