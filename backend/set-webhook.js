const fetch = require('node-fetch');

const botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// Get webhook URL from command line argument or use ngrok URL
const webhookUrl = process.argv[2] || "https://creative-residence-jockstrap.ngrok-free.dev/bot-webhook.php";

async function setWebhook(token, url) {
    const apiUrl = `https://api.telegram.org/bot${token}/setWebhook`;
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: url,
            drop_pending_updates: true
        })
    });
    
    return await response.json();
}

async function getWebhookInfo(token) {
    const apiUrl = `https://api.telegram.org/bot${token}/getWebhookInfo`;
    const response = await fetch(apiUrl);
    return await response.json();
}

(async () => {
    console.log("🤖 Setting up Telegram Bot Webhook");
    console.log("Bot: @placeyou_betbot");
    console.log(`Webhook URL: ${webhookUrl}\n`);
    
    const result = await setWebhook(botToken, webhookUrl);
    
    if (result.ok) {
        console.log("✅ Webhook set successfully!\n");
        
        // Get webhook info
        console.log("📊 Webhook Info:");
        const info = await getWebhookInfo(botToken);
        
        if (info.ok) {
            console.log(`  URL: ${info.result.url}`);
            console.log(`  Pending Updates: ${info.result.pending_update_count}`);
            
            if (info.result.last_error_message) {
                console.log(`  ⚠️ Last Error: ${info.result.last_error_message}`);
                const errorDate = new Date(info.result.last_error_date * 1000);
                console.log(`  Error Date: ${errorDate.toISOString()}`);
            } else {
                console.log("  Status: ✅ Working perfectly!");
            }
        }
        
        console.log("\n🎉 Bot is now live!\n");
        console.log("To test:");
        console.log("1. Open: https://t.me/placeyou_betbot");
        console.log("2. Send: /start");
        console.log("3. Click the '⚽ Place Bet' button");
        console.log("4. Try other buttons and commands\n");
        console.log("Commands available:");
        console.log("  /start - Welcome message with menu");
        console.log("  /bet - Place a bet");
        console.log("  /mybets - View your bets");
        console.log("  /help - Get support");
        
    } else {
        console.log("❌ Failed to set webhook!");
        if (result.description) {
            console.log(`Error: ${result.description}`);
        }
    }
})();
