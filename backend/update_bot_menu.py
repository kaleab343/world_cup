#!/usr/bin/env python3
import requests
import json

BOT_TOKEN = "8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI"
WEB_APP_URL = "https://world-cup-rho.vercel.app"

print("🎮 Updating Telegram Bot Menu Button...")
print()

url = f"https://api.telegram.org/bot{BOT_TOKEN}/setChatMenuButton"
data = {
    "menu_button": {
        "type": "web_app",
        "text": "🎮 Open Betting App",
        "web_app": {
            "url": WEB_APP_URL
        }
    }
}

try:
    response = requests.post(url, json=data, timeout=30)
    result = response.json()
    
    if result.get("ok"):
        print("✅ SUCCESS! Bot menu button updated")
        print(f"   New URL: {WEB_APP_URL}")
        print()
        print("Next steps:")
        print("1. Close and reopen your Telegram bot chat")
        print("2. Click the menu button (≡) next to message input")
        print("3. The app will now open: https://world-cup-rho.vercel.app")
    else:
        print("❌ Failed to update bot menu button")
        print(f"   Error: {result}")
        
except Exception as e:
    print(f"❌ Error: {e}")
    print()
    print("Alternative: Try running this curl command:")
    print(f'curl -X POST "{url}" -H "Content-Type: application/json" -d \'{json.dumps(data)}\'')
