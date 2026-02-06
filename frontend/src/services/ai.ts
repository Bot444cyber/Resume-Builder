import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Initialize the Gemini AI Client
 */
const getGenAI = () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("AI features require an API Key. Please create a .env.local file with NEXT_PUBLIC_GEMINI_API_KEY=your_key");
    }
    return new GoogleGenerativeAI(apiKey);
};

// using gemini-2.0-flash as confirmed available by script
const MODEL_NAME = 'gemini-2.0-flash';

/**
 * Helper to clean JSON strings returned by AI
 * Removes markdown code blocks like ```json ... ```
 */
const cleanJSON = (text: string) => {
    return text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
};

/**
 * 1. Rewrite Text (Summary or Job Description)
 */
export const rewriteText = async (text: string, type: 'summary' | 'job description'): Promise<string> => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Rewrite this resume ${type} to be more impactful, outcome-oriented, and professional for a high-level job application. Keep it concise. Original: "${text}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("AI Rewrite Error:", error);
        return text; // Return original text if AI fails
    }
};

/**
 * 2. Generate Resume Score & Feedback
 */
export const generateResumeScore = async (resumeContext: string): Promise<{ score: number, feedback: string[] } | null> => {
    try {
        const genAI = getGenAI();
        // Enable JSON mode for structured output
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Analyze this resume content for ATS compatibility and overall impact. 
        Provide a strict numerical score (0-100) and 3 short, critical, actionable bullet points for improvement.
        Format response as JSON: { "score": 85, "feedback": ["Fix X", "Improve Y", "Add Z"] }
        Resume Data: ${resumeContext}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(cleanJSON(text));
    } catch (error) {
        console.error("AI Score Error:", error);
        return null;
    }
};

/**
 * 3. Generate a Single Experience Entry
 */
export const generateExperienceEntry = async (title: string, company: string): Promise<string> => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Generate a professional resume experience entry for a "${title}" role at "${company}". 
        Include 3-4 impactful bullet points using strong action verbs and metrics. 
        Return ONLY the text content for the description.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("AI Experience Gen Error:", error);
        return "";
    }
};

/**
 * 4. Generate Full Resume JSON
 */
export const generateFullResume = async (jobTitle: string, experienceLevel: string): Promise<any> => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate a realistic, professional resume JSON for a "${jobTitle}" with "${experienceLevel}" experience. 
        The JSON must STRICTLY follow this structure:
        {
            "name": "John Doe",
            "title": "${jobTitle}",
            "email": "john.doe@example.com",
            "phone": "+1 555-0102",
            "address": "City, State",
            "summary": "Professional summary...",
            "skills": "List of comma separated skills...",
            "experiences": [
                { "id": "1", "company": "Company A", "role": "Role A", "dates": "2020 - Present", "desc": "Description..." }
            ],
            "education": [
                { "id": "1", "school": "University Name", "degree": "Degree", "dates": "2016 - 2020" }
            ],
            "skillsDetail": [
                { "id": "1", "name": "Skill A", "level": 90 }
            ]
        }
        Return ONLY the valid JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(cleanJSON(text));
    } catch (error) {
        console.error("AI Full Resume Gen Error:", error);
        throw new Error("Failed to generate resume data. Please try again.");
    }
};

/**
 * 5. Generate Resume Insights (Home Page Analyzer)
 */
export const generateResumeInsights = async (text: string): Promise<string> => {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Analyze this resume content and provide 3 ultra-high impact bullet points of professional feedback. Focus on quantifiable achievements and elite action verbs: \n\n${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("AI Insights Error:", error);
        throw new Error("Strategic analysis unavailable at the moment.");
    }
};