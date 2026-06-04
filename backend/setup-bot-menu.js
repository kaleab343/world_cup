const fetch = require('node-fetch');

const botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// Set Bot Commands
async function setBotCommands(token) {
    const url = `https://api.telegram.org/bot${token}/setMyCommands`;
    
    const commands = [
        {
            command: "start",
            description: "Start the bot and see welcome message"
        },
        {
            command: "bet",
            description: "Place a bet on World Cup 2026"
        },
        {
            command: "mybets",
            description: "View your active bets"
        },
        {
            command: "help",
            description: "Get help and instructions"
        }
    ];
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commands })
    });
    
    return await response.json();
}

// Execute setup
(async () => {
    console.log("Setting up Telegram Bot Menu...");
    console.log("Bot: @placeyou_betbot\n");
    
    console.log("Setting bot commands...");
    const result = await setBotCommands(botToken);
    
    if (result && result.ok) {
        console.log("✅ Bot commands set successfully!\n");
        console.log("Commands available:");
        console.log("  /start - Start the bot");
        console.log("  /bet - Place a bet");
        console.log("  /mybets - View bets");
        console.log("  /help - Get help\n");
        console.log("✅ Setup complete!\n");
        console.log("To test:");
        console.log("1. Open: https://t.me/placeyou_betbot");
        console.log("2. Send /start");
        console.log("3. Type / to see the command menu");
    } else {
        console.log("❌ Failed to set commands");
        if (result) {
            console.log("Error:", JSON.stringify(result));
        }
    }
})();
