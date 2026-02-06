const fs = require('fs');
const path = require('path');
const https = require('https');

// Load Env
const loadEnv = () => {
    let apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) return apiKey;

    try {
        const envPath = path.resolve(__dirname, '../.env');
        const envLocalPath = path.resolve(__dirname, '../.env.local');

        const targetPath = fs.existsSync(envLocalPath) ? envLocalPath : (fs.existsSync(envPath) ? envPath : null);

        if (targetPath) {
            const content = fs.readFileSync(targetPath, 'utf-8');
            const match = content.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.*)/);
            if (match) return match[1].trim().replace(/['"]/g, '');
        }
    } catch (e) {
        console.log("Error loading env:", e.message);
    }
    return null;
};

const apiKey = loadEnv();
if (!apiKey) {
    console.error("No API KEY found.");
    process.exit(1);
}

console.log(`Checking models for key: ${apiKey.substring(0, 5)}...`);

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API Error:", json.error.message);
            } else if (json.models) {
                console.log("\nAvailable Models:");
                json.models.forEach(m => {
                    if (m.name.includes('gemini')) {
                        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                    }
                });
            } else {
                console.log("Unexpected response:", json);
            }
        } catch (e) {
            console.error("Parse error:", e);
        }
    });
}).on('error', (e) => {
    console.error("Request error:", e);
});
