#!/bin/bash

BOT_TOKEN="8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI"
WEB_APP_URL="https://world-cup-rho.vercel.app"

echo "🎮 Updating Telegram Bot Menu Button..."
echo ""

curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d "{\"menu_button\":{\"type\":\"web_app\",\"text\":\"🎮 Open Betting App\",\"web_app\":{\"url\":\"${WEB_APP_URL}\"}}}"

echo ""
echo ""
echo "✅ Bot menu button updated to: ${WEB_APP_URL}"
echo ""
echo "Test it at: https://t.me/placeyou_betbot"
