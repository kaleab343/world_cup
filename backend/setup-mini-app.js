const fetch = require('node-fetch');

const botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";
const webAppUrl = "https://world-cup-rho.vercel.app"; // Frontend Vercel URL
const backendUrl = "https://worldcup-backend-r8kf.onrender.com"; // Backend Render URL

async function setupMiniApp() {
    console.log("🎮 Setting up Telegram Mini Web App\n");
    
    // Step 1: Set bot commands with web app button
    console.log("Step 1: Setting bot commands...");
    const commandsUrl = `https://api.telegram.org/bot${botToken}/setMyCommands`;
    const commandsResponse = await fetch(commandsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            commands: [
                {
                    command: "start",
                    description: "Open World Cup Betting App"
                },
                {
                    command: "bet",
                    description: "Place your bets"
                },
                {
                    command: "mybets",
                    description: "View your bets"
                },
                {
                    command: "help",
                    description: "Get help"
                }
            ]
        })
    });
    const commandsResult = await commandsResponse.json();
    console.log(commandsResult.ok ? "✅ Commands set\n" : "❌ Failed to set commands\n");
    
    // Step 2: Set webhook for bot messages
    console.log("Step 2: Setting webhook...");
    const webhookUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;
    const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: `${backendUrl}/bot-webhook.php`,
            drop_pending_updates: true
        })
    });
    const webhookResult = await webhookResponse.json();
    console.log(webhookResult.ok ? "✅ Webhook set\n" : "❌ Failed to set webhook\n");
    
    // Step 3: Set menu button to open web app
    console.log("Step 3: Setting menu button (Mini Web App)...");
    const menuUrl = `https://api.telegram.org/bot${botToken}/setChatMenuButton`;
    const menuResponse = await fetch(menuUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            menu_button: {
                type: "web_app",
                text: "🎮 Open Betting App",
                web_app: {
                    url: webAppUrl
                }
            }
        })
    });
    const menuResult = await menuResponse.json();
    console.log(menuResult.ok ? "✅ Menu button set\n" : "❌ Failed to set menu button\n");
    
    // Step 4: Get current settings
    console.log("Step 4: Verifying configuration...");
    const infoUrl = `https://api.telegram.org/bot${botToken}/getWebhookInfo`;
    const infoResponse = await fetch(infoUrl);
    const infoResult = await infoResponse.json();
    
    if (infoResult.ok) {
        console.log("📊 Bot Configuration:");
        console.log(`  Webhook URL: ${infoResult.result.url}`);
        console.log(`  Pending Updates: ${infoResult.result.pending_update_count}`);
        console.log(`  Web App URL: ${webAppUrl}`);
    }
    
    console.log("\n🎉 Setup Complete!\n");
    console.log("How to test:");
    console.log("1. Open: https://t.me/placeyou_betbot");
    console.log("2. Click the menu button (≡) next to the message input");
    console.log("3. Click '🎮 Open Betting App'");
    console.log("4. The web app will open inside Telegram!\n");
    console.log("Features:");
    console.log("  ✅ Mini Web App opens in Telegram");
    console.log("  ✅ Full betting functionality");
    console.log("  ✅ Native Telegram experience");
    console.log("  ✅ Payment screenshots sent to bot\n");
}

setupMiniApp().catch(console.error);
