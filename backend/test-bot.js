const fetch = require('node-fetch');

const botToken = process.env.TELEGRAM_BOT_TOKEN || "8840845626:AAE9Mj9zenR88dy8IZ220bH_4HeEOGz-lSA";
const chatId = process.env.TELEGRAM_CHAT_ID || "500761652";

async function testBot() {
    try {
        console.log("🤖 Testing Telegram Bot Connection\n");
        
        // Test 1: Get bot info
        console.log("Test 1: Getting bot information...");
        const botResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/getMe`
        );
        const botInfo = await botResponse.json();
        
        if (botInfo.ok) {
            console.log("✅ Bot info retrieved:");
            console.log(`   Username: @${botInfo.result.username}`);
            console.log(`   Name: ${botInfo.result.first_name}`);
            console.log(`   ID: ${botInfo.result.id}\n`);
        } else {
            console.log("❌ Failed to get bot info");
            console.log(`   Error: ${botInfo.description}\n`);
            return;
        }
        
        // Test 2: Get webhook info
        console.log("Test 2: Checking webhook status...");
        const webhookResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/getWebhookInfo`
        );
        const webhookInfo = await webhookResponse.json();
        
        if (webhookInfo.ok) {
            console.log("✅ Webhook info:");
            console.log(`   URL: ${webhookInfo.result.url || 'Not set'}`);
            console.log(`   Pending Updates: ${webhookInfo.result.pending_update_count}`);
            if (webhookInfo.result.last_error_message) {
                console.log(`   ⚠️ Last Error: ${webhookInfo.result.last_error_message}`);
            }
            console.log();
        }
        
        // Test 3: Send test message
        console.log("Test 3: Sending test message...");
        const messageResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: '🧪 Test message from World Cup Backend!\n\nBot is working correctly! ✅'
                })
            }
        );
        const messageResult = await messageResponse.json();
        
        if (messageResult.ok) {
            console.log("✅ Test message sent successfully!");
            console.log(`   Message ID: ${messageResult.result.message_id}\n`);
        } else {
            console.log("❌ Failed to send test message");
            console.log(`   Error: ${messageResult.description}\n`);
        }
        
        console.log("🎉 All tests completed!\n");
        console.log("Configuration:");
        console.log(`  Bot Token: ${botToken.substring(0, 20)}...`);
        console.log(`  Chat ID: ${chatId}`);
        
    } catch (error) {
        console.error("❌ Error testing bot:", error.message);
    }
}

testBot();
