<?php
/**
 * Setup Telegram Bot Menu (Simple version without curl)
 * This script sets up the bot menu with a "Bet" button
 */

$botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// Set Bot Commands using file_get_contents
function setBotCommands($token) {
    $url = "https://api.telegram.org/bot{$token}/setMyCommands";
    
    $commands = [
        [
            "command" => "start",
            "description" => "Start the bot and see welcome message"
        ],
        [
            "command" => "bet",
            "description" => "Place a bet on World Cup 2026"
        ],
        [
            "command" => "mybets",
            "description" => "View your active bets"
        ],
        [
            "command" => "help",
            "description" => "Get help and instructions"
        ]
    ];
    
    $postData = json_encode(['commands' => $commands]);
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json',
            'content' => $postData
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    return json_decode($response, true);
}

// Execute setup
echo "Setting up Telegram Bot Menu...\n";
echo "Bot: @placeyou_betbot\n\n";

echo "Setting bot commands...\n";
$result = setBotCommands($botToken);

if ($result && $result['ok']) {
    echo "✅ Bot commands set successfully!\n\n";
    echo "Commands available:\n";
    echo "  /start - Start the bot\n";
    echo "  /bet - Place a bet\n";
    echo "  /mybets - View bets\n";
    echo "  /help - Get help\n\n";
    echo "✅ Setup complete!\n\n";
    echo "To test:\n";
    echo "1. Open: https://t.me/placeyou_betbot\n";
    echo "2. Send /start\n";
    echo "3. Type / to see the command menu\n";
} else {
    echo "❌ Failed to set commands\n";
    if ($result) {
        echo "Error: " . json_encode($result) . "\n";
    }
}
?>
