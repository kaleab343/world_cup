<?php
require_once 'config.php';

// Function to send message to Telegram
function sendToTelegram($message, $photoPath = null) {
    $botToken = TELEGRAM_BOT_TOKEN;
    $chatId = TELEGRAM_CHAT_ID;
    
    if ($photoPath) {
        // Send photo with caption
        $url = "https://api.telegram.org/bot{$botToken}/sendPhoto";
        
        $postData = [
            'chat_id' => $chatId,
            'caption' => $message,
            'parse_mode' => 'HTML'
        ];
        
        if (file_exists($photoPath)) {
            $postData['photo'] = new CURLFile(realpath($photoPath));
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($ch);
        curl_close($ch);
        
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
        curl_close($ch);
        
        return json_decode($result, true);
    }
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get form data
        $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
        $betId = isset($_POST['betId']) ? $_POST['betId'] : '';
        $countryName = isset($_POST['countryName']) ? $_POST['countryName'] : '';
        $amount = isset($_POST['amount']) ? $_POST['amount'] : '';
        $payout = isset($_POST['payout']) ? $_POST['payout'] : '';
        
        // Validate required fields
        if (empty($phoneNumber)) {
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
            }
            
            $fileExtension = pathinfo($_FILES['screenshot']['name'], PATHINFO_EXTENSION);
            $fileName = 'payment_' . time() . '_' . uniqid() . '.' . $fileExtension;
            $uploadPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['screenshot']['tmp_name'], $uploadPath)) {
                $uploadedFile = $uploadPath;
            }
        }
        
        if (!$uploadedFile) {
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
        
        // Send to Telegram
        $result = sendToTelegram($message, $uploadedFile);
        
        // Delete uploaded file after sending
        if (file_exists($uploadedFile)) {
            unlink($uploadedFile);
        }
        
        if (isset($result['ok']) && $result['ok']) {
            echo json_encode([
                'success' => true,
                'message' => 'Payment submitted successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to send to Telegram',
                'error' => $result
            ]);
        }
        
    } catch (Exception $e) {
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
