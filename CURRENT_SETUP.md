# 🎉 Current Working Setup

## ✅ Everything is Live and Working!

### 🔧 Backend (Render.com)
- **URL:** https://worldcup-backend-r8kf.onrender.com
- **Status:** ✅ Running
- **Port:** 10000 (Render auto-assigned)
- **Features:**
  - Payment screenshot submission
  - Telegram bot webhook handler
  - Bot commands and menu
  - CORS enabled for frontend

### 🎨 Frontend (ngrok → Local)
- **Public URL:** https://creative-residence-jockstrap.ngrok-free.dev
- **Local:** http://localhost:2026
- **Status:** ✅ Running
- **Backend Connection:** Render.com backend
- **Features:**
  - 48 World Cup 2026 teams
  - Italy removed (didn't qualify)
  - Bilingual (English/Amharic)
  - TeleBirr payment integration
  - QR code generation

### 🤖 Telegram Bot
- **Bot 1:** @worldcupevidensbot (Payment notifications)
  - Token: `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
  - Chat ID: `500761652`
  - Webhook: Render backend
  
- **Bot 2:** @placeyou_betbot (Mini Web App)
  - Token: `8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI`
  - Webhook: https://worldcup-backend-r8kf.onrender.com/bot-webhook.php
  - Mini Web App URL: https://creative-residence-jockstrap.ngrok-free.dev

---

## 🧪 Test Your Setup

### Test 1: Backend Health Check
```bash
curl https://worldcup-backend-r8kf.onrender.com/
```
Expected: `{"status":"ok","message":"World Cup Backend API",...}`

### Test 2: Bot Connection
```bash
curl https://worldcup-backend-r8kf.onrender.com/test-bot.php
```
Expected: Bot information with `"success":true`

### Test 3: Frontend Access
Open: https://creative-residence-jockstrap.ngrok-free.dev
Expected: World Cup betting homepage with 48 countries

### Test 4: Telegram Mini Web App
1. Open: https://t.me/placeyou_betbot
2. Click menu button (≡) next to message input
3. Click "🎮 Open Betting App"
4. Website should open inside Telegram

### Test 5: Full Betting Flow
1. Open bot or website
2. Select a country (e.g., Brazil, Argentina)
3. Click "Place Bet" (100 Birr)
4. Go to payment page
5. Enter phone number
6. Upload TeleBirr payment screenshot
7. Click "Confirm Payment"
8. Check @worldcupevidensbot receives the screenshot
9. QR code modal should appear
10. Screenshot QR and pay in TeleBirr

---

## 📊 Current Configuration

### Environment Variables
**Backend (Render.com):**
```
TELEGRAM_BOT_TOKEN=8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY
TELEGRAM_CHAT_ID=500761652
PORT=10000 (auto-assigned by Render)
```

**Frontend (.env):**
```
VITE_API_ENDPOINT=https://worldcup-backend-r8kf.onrender.com
```

### Running Services
```
Frontend:  npm run dev  (port 2026)
ngrok:     ngrok http 2026
Backend:   Render.com (auto-deployed)
```

---

## 🎯 User Journey

1. **User opens bot:** @placeyou_betbot
2. **Clicks menu:** "🎮 Open Betting App"
3. **Web app opens in Telegram:** Shows 48 countries
4. **Selects country:** e.g., Brazil (odds 4.2)
5. **Places bet:** Fixed 100 Birr
6. **Payment page:** Enter phone + upload screenshot
7. **Screenshot sent to bot:** @worldcupevidensbot receives it
8. **QR modal appears:** User screenshots the QR
9. **Pays in TeleBirr:** Scans QR code from gallery
10. **Confirmation page:** Bet is placed!

---

## 🔄 What Happens Behind the Scenes

1. **Frontend (ngrok):** User interacts with React app
2. **Payment submission:** POST to Render backend `/submit-payment.php`
3. **Backend processing:** 
   - Receives screenshot
   - Sends to Telegram bot via API
   - Returns success response
4. **QR generation:** Frontend shows QR modal
5. **User completes payment:** In TeleBirr app
6. **Admin verification:** Checks @worldcupevidensbot for screenshots

---

## 📝 Important Notes

### Render Free Tier
- ⚠️ Backend spins down after 15 minutes of inactivity
- ⏱️ First request after sleep takes 50+ seconds (cold start)
- 🔄 Subsequent requests are fast
- 💰 Free tier: 750 hours/month (enough for hobby projects)

### ngrok Free Tier
- ⚠️ URL changes every time ngrok restarts
- 🔄 Need to update bot configuration when URL changes
- 💡 For production: Use Vercel for frontend (stable URL)

### Current Limitations
- Frontend on local machine (via ngrok)
- ngrok URL not stable
- Need to manually update bot when ngrok restarts

---

## 🚀 Next Steps for Production

### Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Import `kaleab343/world_cup` repository
3. Set Root Directory: `world-cup`
4. Add Environment Variable:
   - `VITE_API_ENDPOINT` = `https://worldcup-backend-r8kf.onrender.com`
5. Deploy!

### Update Bot Configuration
After Vercel deployment, update Mini Web App URL:
```bash
# Edit setup-mini-app.js
const webAppUrl = "https://your-project.vercel.app";

# Run setup
node setup-mini-app.js
```

### Update TeleBirr Details
Edit `src/pages/PaymentPage.tsx`:
```typescript
const TELEBIRR_NUMBER = "+251XXXXXXXXX"; // Your real TeleBirr number
const TELEGRAM_SUPPORT = "https://t.me/your_support_group"; // Your support group
```

---

## 🐛 Troubleshooting

### Backend not responding
- **Cause:** Render free tier spun down
- **Fix:** Wait 50 seconds for cold start, or upgrade to paid plan ($7/mo)

### Frontend not loading in bot
- **Cause:** ngrok URL changed
- **Fix:** Run `node setup-mini-app.js` with new ngrok URL

### Payment submissions failing
- **Check:** Backend logs on Render dashboard
- **Verify:** Bot token and chat ID are correct
- **Test:** `curl https://worldcup-backend-r8kf.onrender.com/test-bot.php`

### Bot not receiving screenshots
- **Check:** Environment variables in Render
- **Verify:** Bot token is correct
- **Test:** Send test message to @worldcupevidensbot

---

## 📞 Support

- **Backend Logs:** https://dashboard.render.com → worldcup-backend → Logs
- **Frontend Logs:** Check browser console (F12)
- **Bot Status:** Check webhook info in Render logs

---

## ✨ What's Working

✅ Backend deployed on Render.com  
✅ Frontend running locally with ngrok  
✅ Telegram Mini Web App configured  
✅ Payment screenshots forwarded to bot  
✅ QR code generation working  
✅ 48 correct World Cup 2026 teams  
✅ Italy removed (didn't qualify)  
✅ Bilingual interface (English/Amharic)  
✅ All groups properly configured  

**Everything is ready for testing! 🎊**
