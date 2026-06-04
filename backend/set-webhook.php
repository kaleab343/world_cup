<?php
/**
 * Set Telegram Bot Webhook
 * Run this once to connect your bot to the webhook handler
 */

$botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// IMPORTANT: Replace with your actual Render.com URL after deployment
$webhookUrl = "https://your-render-url.onrender.com/bot-webhook.php";

// If using ngrok for local testing:
// $webhookUrl = "https://your-ngrok-url.ngrok-free.dev/backend/bot-webhook.php";

function setWebhook($token, $url) {
    $apiUrl = "https://api.telegram.org/bot{$token}/setWebhook";
    
    $data = [
        'url' => $url,
        'drop_pending_updates' => true
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

function getWebhookInfo($token) {
    $apiUrl = "https://api.telegram.org/bot{$token}/getWebhookInfo";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

echo "🤖 Setting up Telegram Bot Webhook\n";
echo "Bot: @placeyou_betbot\n\n";

echo "Setting webhook to: {$webhookUrl}\n\n";

$result = setWebhook($botToken, $webhookUrl);

if ($result['ok']) {
    echo "✅ Webhook set successfully!\n\n";
    
    // Get webhook info
    echo "📊 Webhook Info:\n";
    $info = getWebhookInfo($botToken);
    
    if ($info['ok']) {
        echo "  URL: " . $info['result']['url'] . "\n";
        echo "  Pending Updates: " . $info['result']['pending_update_count'] . "\n";
        
        if (isset($info['result']['last_error_message'])) {
            echo "  Last Error: " . $info['result']['last_error_message'] . "\n";
        } else {
            echo "  Status: ✅ Working\n";
        }
    }
    
    echo "\n✅ Setup complete!\n";
    echo "\nTo test:\n";
    echo "1. Open: https://t.me/placeyou_betbot\n";
    echo "2. Send /start\n";
    echo "3. Click 'Bet' button\n";
    
} else {
    echo "❌ Failed to set webhook!\n";
    echo "Error: " . json_encode($result) . "\n";
}
?>
