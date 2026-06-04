# Quick Setup Guide for Telegram Bot

## 🚀 Quick Start (5 Minutes)

### Step 1: Upload Backend Files
Upload the entire `backend` folder to your PHP web server.

### Step 2: Get Your Chat ID

1. **Send a message to your bot**
   - Open Telegram
   - Search for: `@worldcupevidensbot`
   - Send any message (example: "Hello")

2. **Get your Chat ID**
   - Open in browser: `https://your-domain.com/backend/test-bot.php`
   - You should see your Chat ID displayed
   - Copy the Chat ID number (example: `123456789`)

### Step 3: Configure Chat ID

Edit `backend/config.php` line 3:

**Before:**
```php
define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID');
```

**After:**
```php
define('TELEGRAM_CHAT_ID', '123456789'); // Replace with your actual Chat ID
```

### Step 4: Test the Bot

1. Refresh `test-bot.php` in your browser
2. Click "Send Test Message" button
3. Check your Telegram - you should receive a test message!

### Step 5: Update Frontend

Edit `src/pages/PaymentPage.tsx` line 12:

**Before:**
```typescript
const API_ENDPOINT = "http://localhost/backend/submit-payment.php";
```

**After:**
```typescript
const API_ENDPOINT = "https://your-domain.com/backend/submit-payment.php";
```

### Step 6: Test Full Flow

1. Go to your website
2. Select a country and place a bet
3. Enter phone number and upload a screenshot
4. Click "Confirm Payment"
5. Check your Telegram bot - payment details should appear!

## 🐛 Troubleshooting

### Problem: Can't see Chat ID

**Solution:**
- Make sure you sent a message to `@worldcupevidensbot` first
- Wait a few seconds and refresh `test-bot.php`
- Try sending another message

### Problem: Screenshot not sending

**Solution:**
1. Check `backend/debug.log` file for errors
2. Make sure `uploads` folder has write permissions (chmod 777)
3. Verify your Chat ID is configured correctly
4. Test with `test-bot.php` first

### Problem: CORS Errors

**Solution:**
- Make sure `.htaccess` file is in the backend folder
- Enable `mod_headers` in Apache
- Or add this to your Apache config:
```apache
Header set Access-Control-Allow-Origin "*"
```

### Problem: File upload errors

**Solution:**
- Check PHP settings in `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

## 📁 File Structure

```
backend/
├── config.php              # Bot token and Chat ID configuration
├── submit-payment.php      # Main API endpoint
├── test-bot.php           # Test and get Chat ID
├── get-chat-id.php        # Alternative way to get Chat ID
├── .htaccess              # Server configuration
├── debug.log              # Debug information (auto-created)
├── error.log              # Error logs (auto-created)
└── uploads/               # Temporary image storage (auto-created)
```

## ✅ Success Checklist

- [ ] Sent message to @worldcupevidensbot on Telegram
- [ ] Got Chat ID from test-bot.php
- [ ] Updated config.php with Chat ID
- [ ] Test message sent successfully
- [ ] Updated frontend API_ENDPOINT
- [ ] Tested full payment flow
- [ ] Received payment in Telegram bot

## 🔒 Security Tips

1. Keep your bot token secret
2. Don't commit `config.php` with real token to public repos
3. Use HTTPS in production
4. Add rate limiting for API endpoint
5. Validate image file types

## 📞 Support

If you still have issues:
1. Check `debug.log` in backend folder
2. Check browser console for errors
3. Verify bot token is correct
4. Make sure PHP has cURL extension enabled
