<?php
// Helper script to get your Telegram Chat ID
// Visit this URL in your browser after sending a message to your bot

$botToken = '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY';
$url = "https://api.telegram.org/bot{$botToken}/getUpdates";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);

$data = json_decode($result, true);

echo "<h1>Telegram Bot Updates</h1>";
echo "<p>Send a message to your bot (@worldcupevidensbot) and refresh this page</p>";
echo "<pre>";
print_r($data);
echo "</pre>";

if (isset($data['result']) && !empty($data['result'])) {
    echo "<h2>Your Chat IDs:</h2>";
    foreach ($data['result'] as $update) {
        if (isset($update['message']['chat']['id'])) {
            echo "<p><strong>Chat ID:</strong> " . $update['message']['chat']['id'] . "</p>";
        }
    }
}
