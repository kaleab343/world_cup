#!/bin/bash

echo "================================================"
echo "Getting Chat ID from Telegram Bot"
echo "================================================"
echo ""
echo "IMPORTANT: First send a message to your bot!"
echo "Bot: https://t.me/worldcupevidensbot"
echo ""
echo "Press Enter after sending a message..."
read

echo "Fetching updates..."
RESPONSE=$(curl -s "https://api.telegram.org/bot8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY/getUpdates")

CHAT_ID=$(echo "$RESPONSE" | grep -o '"chat":{"id":[0-9]*' | head -1 | grep -o '[0-9]*$')

if [ -z "$CHAT_ID" ]; then
    echo ""
    echo "❌ No Chat ID found!"
    echo ""
    echo "Please:"
    echo "1. Open Telegram"
    echo "2. Search for: @worldcupevidensbot"
    echo "3. Send ANY message (like 'hello')"
    echo "4. Run this script again"
    echo ""
    echo "Full response:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo ""
    echo "✅ Found Chat ID: $CHAT_ID"
    echo ""
    echo "Now updating config.php..."
    
    sudo sed -i "s/'YOUR_CHAT_ID'/'$CHAT_ID'/g" /opt/lampp/htdocs/backend/config.php
    
    echo "✅ Config updated!"
    echo ""
    echo "Verification:"
    sudo grep TELEGRAM_CHAT_ID /opt/lampp/htdocs/backend/config.php
    echo ""
    echo "🎉 Done! You can now test the payment system."
fi
