import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, FileText, Briefcase, LayoutTemplate, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
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
        ? (isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-100')
        : 'bg-transparent border-transparent';

    const navLinks = [
        { name: 'Templates', href: '#', icon: LayoutTemplate },
        { name: 'Services', href: '#', icon: Briefcase },
        { name: 'Resources', href: '#', icon: FileText },
    ];

    if (isEditorMode) {
        return (
            <nav className="sticky top-0 z-100 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 py-3 px-6 lg:px-24">
                {/* Editor Mode Navbar Content - Keeping as is for now, maybe add toggle later if needed */}
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogoClick}>
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                            <span className="font-bold text-white text-lg">L</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                            Live<span className="text-blue-500">Career</span>
                        </span>
                    </div>
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
                    <Link href="/" className="flex items-center gap-2.5 group z-50 relative" onClick={onLogoClick}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${isDark ? 'bg-white/10 border border-white/20' : 'bg-blue-600 shadow-blue-500/20'}`}>
                            {isDark ? (
                                <div className="w-5 h-5 bg-white rounded-full"></div>
                            ) : (
                                <div className="w-5 h-1.5 bg-white rounded-full shadow-sm"></div>
                            )}
                        </div>
                        <span className={`text-2xl font-extrabold tracking-tighter ${logoTextClass} transition-colors`}>
                            Live<span className="text-blue-600">Career</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className={`hidden lg:flex items-center gap-8 px-6 py-2 rounded-full transition-all`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold ${textColorClass} ${hoverColorClass} transition-colors relative group py-1`}
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
                            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-slate-600 hover:text-slate-900'}`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <Link href="/login" className={`text-sm font-semibold ${textColorClass} ${hoverColorClass} transition-colors`}>
                            Log in
                        </Link>

                        <Link href="/templates" className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-md group ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                            Create Resume
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
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
            <div className={`fixed inset-0 z-90 ${isDark ? 'bg-slate-950' : 'bg-white'} transition-all duration-300 transform lg:hidden flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
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
                        <Link href="/login" className={`w-full py-4 text-center font-bold rounded-xl ${isDark ? 'text-white bg-white/10' : 'text-slate-700 bg-slate-50'}`} onClick={() => setMobileMenuOpen(false)}>
                            Log in
                        </Link>
                        <Link href="/templates" className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30" onClick={() => setMobileMenuOpen(false)}>
                            Create Resume Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
