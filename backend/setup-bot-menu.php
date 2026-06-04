<?php
/**
 * Setup Telegram Bot Menu
 * This script sets up the bot menu with a "Bet" button
 */

$botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// Method 1: Set Bot Commands (appears in / menu)
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
    
    $data = [
        'commands' => json_encode($commands)
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Method 2: Set Reply Keyboard (persistent button menu)
function setReplyKeyboard() {
    $keyboard = [
        'keyboard' => [
            [
                ['text' => '⚽ Place Bet'],
                ['text' => '📊 My Bets']
            ],
            [
                ['text' => '💰 Balance'],
                ['text' => '📞 Support']
            ]
        ],
        'resize_keyboard' => true,
        'persistent' => true
    ];
    
    return json_encode($keyboard);
}

// Execute setup
echo "Setting up Telegram Bot Menu...\n";
echo "Bot: @placeyou_betbot\n\n";

echo "Step 1: Setting bot commands...\n";
$result = setBotCommands($botToken);

if ($result['ok']) {
    echo "✅ Bot commands set successfully!\n";
    echo "Commands available:\n";
    echo "  /start - Start the bot\n";
    echo "  /bet - Place a bet\n";
    echo "  /mybets - View bets\n";
    echo "  /help - Get help\n\n";
} else {
    echo "❌ Failed to set commands: " . json_encode($result) . "\n\n";
}

echo "Step 2: Reply Keyboard JSON (for bot responses):\n";
echo setReplyKeyboard() . "\n\n";

echo "✅ Setup complete!\n\n";
echo "To test:\n";
echo "1. Open: https://t.me/placeyou_betbot\n";
echo "2. Send /start\n";
echo "3. Type / to see the command menu\n";
echo "4. Click the menu button to see reply keyboard buttons\n";
?>
