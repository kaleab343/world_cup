<?php
// Telegram Bot Configuration
define('TELEGRAM_BOT_TOKEN', '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY');
define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID'); // Replace with your chat ID or channel ID

// CORS Configuration
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
