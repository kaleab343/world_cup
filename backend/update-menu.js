const https = require('https');

const BOT_TOKEN = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";
const WEB_APP_URL = "https://world-cup-rho.vercel.app";

const data = JSON.stringify({
    menu_button: {
        type: "web_app",
        text: "🎮 Open Betting App",
        web_app: {
            url: WEB_APP_URL
        }
    }
});

const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${BOT_TOKEN}/setChatMenuButton`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    },
    timeout: 30000
};

console.log("🎮 Updating Telegram Bot Menu Button...\n");

const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        try {
            const result = JSON.parse(responseData);
            if (result.ok) {
                console.log("✅ SUCCESS! Bot menu button updated");
                console.log(`   New URL: ${WEB_APP_URL}\n`);
                console.log("Next steps:");
                console.log("1. Close and reopen your Telegram bot chat");
                console.log("2. Click the menu button (≡) next to message input");
                console.log("3. The app will now open the Vercel URL\n");
            } else {
                console.log("❌ Failed to update bot menu button");
                console.log(`   Error: ${JSON.stringify(result, null, 2)}`);
            }
        } catch (e) {
            console.log("❌ Error parsing response:", e.message);
            console.log("   Response:", responseData);
        }
    });
});

req.on('error', (error) => {
    console.log("❌ Network Error:", error.message);
    console.log("\nTroubleshooting:");
    console.log("- Check your internet connection");
    console.log("- Try again in a few moments");
    console.log("- Or use this curl command:");
    console.log(`\ncurl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton" \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '${data}'`);
});

req.on('timeout', () => {
    console.log("❌ Request timed out");
    console.log("   Please check your internet connection and try again");
    req.destroy();
});

req.write(data);
req.end();
