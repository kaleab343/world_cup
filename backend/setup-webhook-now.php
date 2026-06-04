<?php
/**
 * Set Telegram Bot Webhook with ngrok
 * Run this to make your bot work
 */

$botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";
$webhookUrl = "https://creative-residence-jockstrap.ngrok-free.dev/backend/bot-webhook.php";

echo "🤖 Setting up Telegram Bot Webhook\n";
echo "Bot: @placeyou_betbot\n";
echo "Webhook URL: {$webhookUrl}\n\n";

// Set webhook
$setUrl = "https://api.telegram.org/bot{$botToken}/setWebhook?url=" . urlencode($webhookUrl) . "&drop_pending_updates=true";

$response = file_get_contents($setUrl);
$result = json_decode($response, true);

if ($result && $result['ok']) {
    echo "✅ Webhook set successfully!\n\n";
    
    // Get webhook info
    $infoUrl = "https://api.telegram.org/bot{$botToken}/getWebhookInfo";
    $infoResponse = file_get_contents($infoUrl);
    $info = json_decode($infoResponse, true);
    
    if ($info && $info['ok']) {
        echo "📊 Webhook Info:\n";
        echo "  URL: " . $info['result']['url'] . "\n";
        echo "  Pending Updates: " . $info['result']['pending_update_count'] . "\n";
        
        if (isset($info['result']['last_error_message'])) {
            echo "  ⚠️ Last Error: " . $info['result']['last_error_message'] . "\n";
            echo "  Error Date: " . date('Y-m-d H:i:s', $info['result']['last_error_date']) . "\n";
        } else {
            echo "  Status: ✅ Working perfectly!\n";
        }
    }
    
    echo "\n🎉 Bot is now live!\n\n";
    echo "To test:\n";
    echo "1. Open: https://t.me/placeyou_betbot\n";
    echo "2. Send: /start\n";
    echo "3. Click the '⚽ Place Bet' button\n";
    echo "4. Try other buttons and commands\n\n";
    echo "Commands available:\n";
    echo "  /start - Welcome message with menu\n";
    echo "  /bet - Place a bet\n";
    echo "  /mybets - View your bets\n";
    echo "  /help - Get support\n";
    
} else {
    echo "❌ Failed to set webhook!\n";
    if ($result) {
        echo "Error: " . $result['description'] . "\n";
    } else {
        echo "Could not connect to Telegram API\n";
    }
}
?>
