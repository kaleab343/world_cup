<?php
// Simple test script to verify bot connection and get Chat ID

$botToken = '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY';

echo "<h1>Telegram Bot Test</h1>";
echo "<hr>";

// Test 1: Check bot info
echo "<h2>Test 1: Bot Information</h2>";
$url = "https://api.telegram.org/bot{$botToken}/getMe";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

$data = json_decode($result, true);
echo "<pre>";
print_r($data);
echo "</pre>";

// Test 2: Get recent messages (to find your Chat ID)
echo "<hr>";
echo "<h2>Test 2: Get Your Chat ID</h2>";
echo "<p><strong>IMPORTANT:</strong> Send ANY message to your bot first: <a href='https://t.me/worldcupevidensbot' target='_blank'>@worldcupevidensbot</a></p>";

$url = "https://api.telegram.org/bot{$botToken}/getUpdates";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

$data = json_decode($result, true);

if (isset($data['result']) && !empty($data['result'])) {
    echo "<div style='background: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin: 10px 0;'>";
    echo "<h3>✅ Found Chat IDs:</h3>";
    $chatIds = [];
    foreach ($data['result'] as $update) {
        if (isset($update['message']['chat']['id'])) {
            $chatId = $update['message']['chat']['id'];
            $chatIds[$chatId] = true;
            $chatName = $update['message']['chat']['first_name'] ?? 'Unknown';
            echo "<p><strong>Chat ID:</strong> <code style='background: white; color: black; padding: 5px; border-radius: 3px; font-size: 16px;'>{$chatId}</code> - {$chatName}</p>";
        }
    }
    echo "</div>";
    
    echo "<div style='background: #2196F3; color: white; padding: 15px; border-radius: 5px; margin: 10px 0;'>";
    echo "<h3>📝 Next Steps:</h3>";
    echo "<ol>";
    echo "<li>Copy one of the Chat IDs above</li>";
    echo "<li>Edit <code>config.php</code> and replace <code>YOUR_CHAT_ID</code> with your Chat ID</li>";
    echo "<li>Refresh this page and test sending a message below</li>";
    echo "</ol>";
    echo "</div>";
} else {
    echo "<div style='background: #f44336; color: white; padding: 15px; border-radius: 5px;'>";
    echo "<h3>❌ No messages found</h3>";
    echo "<p>1. Open Telegram and search for: @worldcupevidensbot</p>";
    echo "<p>2. Send any message (like 'hello') to the bot</p>";
    echo "<p>3. Refresh this page</p>";
    echo "</div>";
}

echo "<hr>";
echo "<h3>Full Response:</h3>";
echo "<pre>";
print_r($data);
echo "</pre>";

// Test 3: Test sending message (if Chat ID is configured)
if (!empty($chatIds)) {
    echo "<hr>";
    echo "<h2>Test 3: Send Test Message</h2>";
    
    $testChatId = array_keys($chatIds)[0];
    
    echo "<form method='POST' action=''>";
    echo "<input type='hidden' name='test_chat_id' value='{$testChatId}'>";
    echo "<p>Send test message to Chat ID: {$testChatId}</p>";
    echo "<button type='submit' style='background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;'>Send Test Message</button>";
    echo "</form>";
    
    if (isset($_POST['test_chat_id'])) {
        $testUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";
        $postData = [
            'chat_id' => $_POST['test_chat_id'],
            'text' => "🎉 Test message from World Cup Betting!\n\nTime: " . date('Y-m-d H:i:s'),
            'parse_mode' => 'HTML'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $testUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $testResult = curl_exec($ch);
        curl_close($ch);
        
        $testData = json_decode($testResult, true);
        
        if (isset($testData['ok']) && $testData['ok']) {
            echo "<div style='background: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin: 10px 0;'>";
            echo "<h3>✅ Message sent successfully!</h3>";
            echo "<p>Check your Telegram to see the message</p>";
            echo "</div>";
        } else {
            echo "<div style='background: #f44336; color: white; padding: 15px; border-radius: 5px; margin: 10px 0;'>";
            echo "<h3>❌ Failed to send message</h3>";
            echo "<pre>" . print_r($testData, true) . "</pre>";
            echo "</div>";
        }
    }
}
?>
