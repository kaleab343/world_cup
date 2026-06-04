<?php
// Telegram Bot Configuration
define('TELEGRAM_BOT_TOKEN', getenv('TELEGRAM_BOT_TOKEN') ?: '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY');
define('TELEGRAM_CHAT_ID', getenv('TELEGRAM_CHAT_ID') ?: '500761652');

// CORS Configuration
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
