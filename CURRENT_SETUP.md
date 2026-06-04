# 🚀 Current Running Setup

## ✅ Services Running

### 1. Frontend (React)
- **URL:** http://localhost:2026
- **Status:** ✅ Running
- **Terminal ID:** 1

### 2. Backend (PHP)
- **URL:** http://localhost:2002
- **Status:** ✅ Running
- **Terminal ID:** 4

### 3. ngrok Tunnel
- **Public URL:** https://creative-residence-jockstrap.ngrok-free.de
- **Forwarding to:** localhost:2002
- **Status:** ✅ Running
- **Terminal ID:** 5
- **Web Interface:** http://127.0.0.1:4040

## 🔧 Configuration

### Backend Configuration
- Bot Token: `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
- Chat ID: **NEEDS TO BE CONFIGURED** in `backend/config.php`

### Frontend Configuration
- API Endpoint: ✅ Updated to ngrok URL

## 📝 Next Steps

### Step 1: Get Your Chat ID

1. Send a message to your bot: https://t.me/worldcupevidensbot
   - Just send any message like "hello" or "/start"

2. Visit this URL in your browser:
   ```
   https://creative-residence-jockstrap.ngrok-free.de/test-bot.php
   ```

3. You'll see your Chat ID displayed. Copy it.

### Step 2: Update Chat ID

Edit `backend/config.php` line 3:
```php
define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID_HERE');
```

Replace `YOUR_CHAT_ID_HERE` with the number from Step 1.

### Step 3: Test the Bot

1. Visit: https://creative-residence-jockstrap.ngrok-free.de/test-bot.php
2. Click "Send Test Message" button
3. Check your Telegram - you should receive a test message!

### Step 4: Test Full Payment Flow

1. Go to http://localhost:2026
2. Select a country
3. Click "Place Bet"
4. Enter phone number: `+251912345678`
5. Upload a screenshot (any image)
6. Click "Confirm Payment"
7. Check Telegram bot - you should receive payment details!

## 🔍 Debugging

### Check Logs
```bash
# View debug logs
cat world-cup/backend/debug.log

# View error logs
cat world-cup/backend/error.log
```

### View ngrok Requests
Visit: http://127.0.0.1:4040

This shows all HTTP requests going through ngrok in real-time.

## 🛑 Stop Services

To stop all services:
```bash
# In the Kiro interface, services can be stopped from the process list
```

Or manually:
- Press Ctrl+C in each terminal

## ⚠️ Important Notes

- ngrok URL will change when ngrok restarts
- This is a FREE ngrok account, so the URL is not permanent
- For production, use a real web server with a domain
- Current setup is perfect for testing!

## 📱 Telegram Bot Info

- Bot Username: `@worldcupevidensbot`
- Bot Token: Already configured
- Support Group: Update in PaymentPage.tsx when ready

## ✅ Checklist

- [x] PHP server running (port 2002)
- [x] ngrok tunnel active
- [x] Frontend API updated
- [ ] Chat ID configured (do this next!)
- [ ] Test message sent
- [ ] Full payment flow tested

---

**Last Updated:** June 4, 2026
**ngrok URL:** https://creative-residence-jockstrap.ngrok-free.de
