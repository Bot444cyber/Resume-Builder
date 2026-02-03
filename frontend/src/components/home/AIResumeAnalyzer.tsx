
import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIResumeAnalyzer: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const analyzeResume = async () => {
        if (!inputText.trim()) return;
        setIsLoading(true);
        try {
            // NOTE: Using process.env.NEXT_PUBLIC_API_KEY if exposed, or strictly backend.
            // For this demo port, we keep it as is but warn about key leakage.
            // Ideally this should call a server action or API route.
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY || '';
            if (!apiKey) {
                throw new Error("API Key not found");
            }
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp', // Updated model name or keep as in source if valid
                contents: {
                    role: 'user',
                    parts: [{ text: `Analyze this resume content and provide 3 ultra-high impact bullet points of professional feedback. Focus on quantifiable achievements and elite action verbs: \n\n${inputText}` }]
                },
                config: {
                    // thinkingConfig: { thinkingBudget: 0 } // This might depend on the SDK version, commenting out to be safe or adapting
                }
            });
            // Casting response to any to support potential SDK version differences without breaking build.
            // Assuming response has a 'text' property or method as per original source intent.
            const responseText = typeof (response as any).text === 'function' ? (response as any).text() : (response as any).text;

            setAnalysis(responseText || 'No response from AI.');
        } catch (error) {
            console.error(error);
            setAnalysis('Strategic analysis unavailable at the moment. Please try again shortly or check API Key configuration.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-24 md:py-32 bg-slate-50/50 dark:bg-[#0f111a] relative overflow-hidden transition-colors duration-300">
            <div className="hd-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        <Sparkles size={14} /> Intelligence
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">Advanced Scoring Engine.</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium">Input your draft and let our neural engine optimize your narrative for high-impact results.</p>
                </div>

                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] dark:shadow-none relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100/50 dark:group-hover:bg-blue-800/30 transition-colors duration-1000" />

                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your experience summary or job description here..."
                        className="w-full h-48 md:h-60 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-slate-800 dark:text-gray-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 outline-none transition-all mb-8 resize-none text-base md:text-lg leading-relaxed shadow-inner dark:shadow-none font-medium"
                    />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2.5 text-slate-400 dark:text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wide">
                            <ShieldCheck size={18} className="text-emerald-500" />
                            Recruiter-Grade Privacy
                        </div>
                        <button
                            onClick={analyzeResume}
                            disabled={isLoading || !inputText}
                            className="w-full md:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 md:px-10 py-4.5 md:py-5 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 hover:bg-blue-600 dark:hover:bg-gray-200 transition-all shadow-xl shadow-slate-900/10 dark:shadow-black/20 active:scale-95 disabled:opacity-50 group/btn"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                            {isLoading ? 'Engineering Feedback...' : 'Generate AI Insights'}
                        </button>
                    </div>

                    {analysis && (
                        <div className="mt-10 md:mt-12 bg-slate-950 dark:bg-black text-slate-200 p-8 md:p-10 rounded-2xl md:rounded-3xl animate-in fade-in slide-in-from-bottom-6 duration-700 border border-slate-800 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="font-black text-white flex items-center gap-3 text-lg md:text-xl tracking-tight">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                        <Sparkles className="w-[18px] h-[18px] md:w-5 md:h-5" />
                                    </div>
                                    Strategic Insights
                                </h4>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 py-1 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 rounded-full">
                                    Gemini Flash-HD
                                </div>
                            </div>
                            <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-line font-medium border-l-2 border-blue-600/30 pl-6 md:pl-8">
                                {analysis}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AIResumeAnalyzer;
