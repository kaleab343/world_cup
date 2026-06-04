<?php
require_once 'config.php';

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Function to log debug info
function logDebug($message) {
    $logFile = __DIR__ . '/debug.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[{$timestamp}] {$message}\n", FILE_APPEND);
}

// Function to send message to Telegram
function sendToTelegram($message, $photoPath = null) {
    $botToken = TELEGRAM_BOT_TOKEN;
    $chatId = TELEGRAM_CHAT_ID;
    
    logDebug("Attempting to send to Telegram. Chat ID: {$chatId}");
    
    // Validate Chat ID
    if ($chatId === 'YOUR_CHAT_ID' || empty($chatId)) {
        logDebug("ERROR: Chat ID not configured!");
        return [
            'ok' => false,
            'error' => 'Chat ID not configured. Please run get-chat-id.php first.'
        ];
    }
    
    if ($photoPath) {
        // Send photo with caption
        $url = "https://api.telegram.org/bot{$botToken}/sendPhoto";
        
        logDebug("Sending photo: {$photoPath}");
        
        if (!file_exists($photoPath)) {
            logDebug("ERROR: Photo file does not exist!");
            return ['ok' => false, 'error' => 'Photo file not found'];
        }
        
        $postData = [
            'chat_id' => $chatId,
            'caption' => $message,
            'parse_mode' => 'HTML',
            'photo' => new CURLFile(realpath($photoPath))
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            logDebug("CURL Error: {$error}");
            curl_close($ch);
            return ['ok' => false, 'error' => $error];
        }
        
        curl_close($ch);
        
        logDebug("Telegram API Response (HTTP {$httpCode}): {$result}");
        
        return json_decode($result, true);
    } else {
        // Send text message only
        $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
        
        $postData = [
            'chat_id' => $chatId,
            'text' => $message,
            'parse_mode' => 'HTML'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            logDebug("CURL Error: {$error}");
            curl_close($ch);
            return ['ok' => false, 'error' => $error];
        }
        
        curl_close($ch);
        
        logDebug("Telegram API Response: {$result}");
        
        return json_decode($result, true);
    }
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    logDebug("=== New Payment Submission ===");
    logDebug("POST Data: " . print_r($_POST, true));
    logDebug("FILES Data: " . print_r($_FILES, true));
    
    try {
        // Get form data
        $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
        $betId = isset($_POST['betId']) ? $_POST['betId'] : '';
        $countryName = isset($_POST['countryName']) ? $_POST['countryName'] : '';
        $amount = isset($_POST['amount']) ? $_POST['amount'] : '';
        $payout = isset($_POST['payout']) ? $_POST['payout'] : '';
        
        // Validate required fields
        if (empty($phoneNumber)) {
            logDebug("ERROR: Phone number missing");
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Phone number is required'
            ]);
            exit();
        }
        
        // Handle file upload
        $uploadedFile = null;
        if (isset($_FILES['screenshot']) && $_FILES['screenshot']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = __DIR__ . '/uploads/';
            
            // Create uploads directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
                logDebug("Created uploads directory");
            }
            
            $fileExtension = pathinfo($_FILES['screenshot']['name'], PATHINFO_EXTENSION);
            $fileName = 'payment_' . time() . '_' . uniqid() . '.' . $fileExtension;
            $uploadPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['screenshot']['tmp_name'], $uploadPath)) {
                $uploadedFile = $uploadPath;
                logDebug("File uploaded successfully: {$uploadPath}");
            } else {
                logDebug("ERROR: Failed to move uploaded file");
            }
        } else {
            $uploadError = isset($_FILES['screenshot']['error']) ? $_FILES['screenshot']['error'] : 'No file';
            logDebug("ERROR: File upload issue - Error code: {$uploadError}");
        }
        
        if (!$uploadedFile) {
            logDebug("ERROR: No screenshot uploaded");
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Screenshot is required'
            ]);
            exit();
        }
        
        // Create message for Telegram
        $message = "🎰 <b>New Bet Payment</b>\n\n";
        $message .= "🏆 Country: <b>{$countryName}</b>\n";
        $message .= "💰 Amount: <b>{$amount} Birr</b>\n";
        $message .= "🎯 Potential Payout: <b>{$payout} Birr</b>\n";
        $message .= "📱 Phone: <code>{$phoneNumber}</code>\n";
        $message .= "🆔 Bet ID: <code>{$betId}</code>\n";
        $message .= "📅 Time: " . date('Y-m-d H:i:s') . "\n\n";
        $message .= "✅ Please verify this payment";
        
        logDebug("Prepared message for Telegram");
        
        // Send to Telegram
        $result = sendToTelegram($message, $uploadedFile);
        
        // Delete uploaded file after sending
        if (file_exists($uploadedFile)) {
            unlink($uploadedFile);
            logDebug("Deleted uploaded file");
        }
        
        if (isset($result['ok']) && $result['ok']) {
            logDebug("SUCCESS: Message sent to Telegram");
            echo json_encode([
                'success' => true,
                'message' => 'Payment submitted successfully'
            ]);
        } else {
            logDebug("ERROR: Telegram API returned error");
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to send to Telegram',
                'error' => $result['error'] ?? 'Unknown error',
                'telegram_response' => $result
            ]);
        }
        
    } catch (Exception $e) {
        logDebug("EXCEPTION: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
