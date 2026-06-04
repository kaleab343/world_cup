<?php
// Entry point for Render deployment
// This file helps with routing

$request_uri = $_SERVER['REQUEST_URI'];

// Remove query string
$path = parse_url($request_uri, PHP_URL_PATH);

// Route to appropriate file
if ($path === '/' || $path === '/index.php') {
    echo json_encode([
        'status' => 'ok',
        'message' => 'World Cup Betting Backend API',
        'endpoints' => [
            '/submit-payment.php' => 'POST - Submit payment',
            '/test-bot.php' => 'GET - Test bot connection',
        ]
    ]);
} else {
    // Check if file exists
    $file = __DIR__ . $path;
    if (file_exists($file) && is_file($file)) {
        require $file;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
}
