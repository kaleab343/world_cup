<?php
/**
 * Telegram Bot Webhook Handler
 * Handles incoming messages and sends interactive menu
 */

$botToken = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI";

// Get incoming update
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Log for debugging
file_put_contents('bot-log.txt', date('Y-m-d H:i:s') . " - " . $content . "\n", FILE_APPEND);

if (!$update) {
    exit;
}

// Extract message info
$message = $update['message'] ?? null;
$callbackQuery = $update['callback_query'] ?? null;

// Handle callback queries (button clicks)
if ($callbackQuery) {
    $chatId = $callbackQuery['message']['chat']['id'];
    $data = $callbackQuery['data'];
    $callbackId = $callbackQuery['id'];
    
    // Answer callback to remove loading state
    $answerUrl = "https://api.telegram.org/bot{$botToken}/answerCallbackQuery";
    sendRequest($answerUrl, ['callback_query_id' => $callbackId]);
    
    // All callbacks redirect to website
    $text = "🌐 Please visit our website to place your bet!";
    
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 Open Betting Website', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    $sendUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";
    sendRequest($sendUrl, [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'Markdown',
        'reply_markup' => json_encode($keyboard)
    ]);
    
    exit;
}

// Handle text messages
if ($message) {
    $chatId = $message['chat']['id'];
    $text = $message['text'] ?? '';
    $userName = $message['from']['first_name'] ?? 'User';
    
    // Handle different commands
    if ($text == '/start' || $text == '⚽ Place Bet') {
        sendBetMenu($chatId, $userName, $botToken);
    } elseif ($text == '/bet') {
        sendBetMenu($chatId, $userName, $botToken);
    } elseif ($text == '📊 My Bets' || $text == '/mybets') {
        sendMyBets($chatId, $botToken);
    } elseif ($text == '💰 Balance') {
        sendBalance($chatId, $botToken);
    } elseif ($text == '📞 Support' || $text == '/help') {
        sendSupport($chatId, $botToken);
    } else {
        sendDefaultMessage($chatId, $botToken);
    }
}

// Function to send bet menu with inline buttons
function sendBetMenu($chatId, $userName, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $text = "⚽ *Welcome to World Cup 2026 Betting, {$userName}!*\n\n";
    $text .= "🏆 Place your bets on your favorite teams\n";
    $text .= "💰 Fixed bet: 100 Birr per team\n";
    $text .= "🎯 Win big with competitive odds!\n\n";
    $text .= "Click the button below to start betting:";
    
    // Inline keyboard with single button to website
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 Open Betting Website', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    // Reply keyboard (persistent bottom buttons)
    $replyKeyboard = [
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
    
    $data = [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'Markdown',
        'reply_markup' => json_encode($keyboard)
    ];
    
    sendRequest($url, $data);
}

// Send my bets
function sendMyBets($chatId, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $text = "📊 *Your Active Bets*\n\n";
    $text .= "Visit our website to view your bets and track your winnings!\n\n";
    $text .= "All your betting history and active bets are available on the website.";
    
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 View My Bets', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    sendRequest($url, [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'Markdown',
        'reply_markup' => json_encode($keyboard)
    ]);
}

// Send balance
function sendBalance($chatId, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $text = "💰 *Your Balance*\n\n";
    $text .= "Visit our website to view your balance, winnings, and transaction history!\n\n";
    $text .= "Track all your bets and payouts in one place.";
    
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 Check Balance', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    sendRequest($url, [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'Markdown',
        'reply_markup' => json_encode($keyboard)
    ]);
}

// Send support
function sendSupport($chatId, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $text = "📞 *Support & Help*\n\n";
    $text .= "Need assistance? We're here to help!\n\n";
    $text .= "Visit our website for:\n";
    $text .= "• How to place a bet\n";
    $text .= "• Payment methods\n";
    $text .= "• Withdrawal process\n";
    $text .= "• Betting rules\n";
    $text .= "• Contact support team";
    
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 Get Help', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    sendRequest($url, [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'Markdown',
        'reply_markup' => json_encode($keyboard)
    ]);
}

// Send default message
function sendDefaultMessage($chatId, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $text = "I didn't understand that. Use the menu buttons below or type /start to begin! 😊\n\n";
    $text .= "Or visit our website directly:";
    
    $keyboard = [
        'inline_keyboard' => [
            [
                ['text' => '🌐 Open Website', 'url' => 'https://creative-residence-jockstrap.ngrok-free.dev']
            ]
        ]
    ];
    
    sendRequest($url, [
        'chat_id' => $chatId,
        'text' => $text,
        'reply_markup' => json_encode($keyboard)
    ]);
}

// Helper function to send requests
function sendRequest($url, $data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
