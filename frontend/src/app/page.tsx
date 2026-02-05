"use client";

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import TemplateSlider from '../components/home/TemplateSlider';
import Features from '../components/home/Features';
import TrustSection from '../components/home/TrustSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black selection:bg-blue-600 selection:text-white font-sans transition-colors duration-300">
      <Navbar />

      <main className="overflow-x-hidden">
        {/* 1. Hero Section - First Impression */}
        <Hero onStart={() => window.location.href = '/templates'} />

        {/* 4. Template Showcase - Visual confirmation of quality */}
        <TemplateSlider onSelect={(id) => window.location.href = `/editor?template=${id}`} />

        {/* 2. Trust Section - Social Proof immediately after Hero */}
        <TrustSection />

        {/* 3. Features - unique selling points */}
        <Features />
      </main>
      <Footer />
    </div>
  );
}
