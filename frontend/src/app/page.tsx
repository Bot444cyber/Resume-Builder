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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-blue-600 selection:text-white font-sans transition-colors duration-300">
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

        {/* 6. Final CTA Section */}
        <section className="py-32 px-6 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to build your career?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of professionals who have successfully landed their dream jobs using our builder.
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xl font-bold transition-all shadow-xl shadow-blue-900/40 hover:-translate-y-1"
            >
              Create My CV Now
            </Link>
            <p className="mt-8 text-sm text-slate-500">
              No credit card required for standard templates
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
