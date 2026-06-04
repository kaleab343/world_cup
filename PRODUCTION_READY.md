# 🎯 Production Ready Checklist

Your World Cup betting platform is now ready for production deployment!

## ✅ What's Been Configured

### Frontend Changes:
- ✅ Environment variable support added (`VITE_API_ENDPOINT`)
- ✅ `.env` file created with current ngrok URL (for local dev)
- ✅ `.env.example` template created
- ✅ `vercel.json` deployment configuration created
- ✅ `.gitignore` updated to exclude `.env` files
- ✅ `PaymentPage.tsx` updated to use environment variables
- ✅ Complete README.md documentation

### Backend Configuration:
- ✅ `config.php` uses environment variables (already done)
- ✅ `render.yaml` deployment config (already exists)
- ✅ `composer.json` for PHP dependencies (already exists)
- ✅ CORS headers configured
- ✅ Telegram bot integration working

### Documentation Created:
- ✅ `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- ✅ `QUICK_START.md` - Local development guide
- ✅ `PRODUCTION_READY.md` - This file
- ✅ `README.md` - Updated with full project documentation

---

## 🚀 Deploy Now (3 Simple Steps)

### Step 1: Deploy Backend to Render.com (5 minutes)

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub: `kaleab343/world_cup`
4. Configure:
   - **Name:** worldcup-backend
   - **Root Directory:** backend
   - **Environment:** PHP
   - **Build Command:** `composer install --no-dev || echo "No dependencies"`
   - **Start Command:** `php -S 0.0.0.0:$PORT`
5. Add Environment Variables:
   - `TELEGRAM_BOT_TOKEN` = `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
   - `TELEGRAM_CHAT_ID` = `500761652`
6. Click "Create Web Service"
7. Wait 2-5 minutes for deployment
8. **Copy your Render URL** (e.g., `https://worldcup-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import: `kaleab343/world_cup`
4. Configure:
   - **Framework:** Vite
   - **Root Directory:** world-cup
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_ENDPOINT` = `https://worldcup-backend.onrender.com` (your Render URL)
6. Click "Deploy"
7. Wait 2-3 minutes
8. **Your site is live!** 🎉

### Step 3: Test Everything (2 minutes)

1. Visit your Vercel URL
2. Select a country
3. Place a bet (100 Birr)
4. Go to payment page
5. Upload a test screenshot
6. Click "Confirm Payment"
7. Check your Telegram bot receives the screenshot
8. Verify QR code modal appears
9. ✅ Everything works!

---

## 📋 Pre-Launch Checklist

### Before Going Live:

- [ ] **Update TeleBirr Number**
  - Edit `src/pages/PaymentPage.tsx` line 17
  - Replace `+251912345678` with your real TeleBirr number

- [ ] **Create Telegram Support Group**
  - Create a new Telegram group for customer support
  - Get the group invite link
  - Update `src/pages/PaymentPage.tsx` line 18
  - Replace `https://t.me/worldcup2026support` with your group link

- [ ] **Test Payment Flow**
  - Make a real test payment
  - Verify bot receives screenshot
  - Verify QR code displays correctly
  - Test QR code payment in TeleBirr app

- [ ] **Mobile Testing**
  - Test on iPhone
  - Test on Android
  - Check landscape orientation
  - Verify responsive design

- [ ] **Language Testing**
  - Toggle between English/Amharic
  - Verify all text translates correctly
  - Check currency displays (ብር)

- [ ] **Browser Testing**
  - Chrome
  - Safari
  - Firefox
  - Edge (if targeting Windows users)

---

## 🔧 Configuration Reference

### Current Setup (Local Development)

**Frontend:**
- Port: 2026
- API: ngrok URL (`https://creative-residence-jockstrap.ngrok-free.dev/backend`)
- Languages: English (default), Amharic

**Backend:**
- Location: `/opt/lampp/htdocs/backend/`
- Server: XAMPP (Apache on port 80)
- Tunnel: ngrok
- Bot: @worldcupevidensbot
- Chat ID: 500761652

### Production Setup (After Deployment)

**Frontend:**
- Host: Vercel
- Domain: `https://your-project.vercel.app`
- API: Render URL
- Auto-deploy: On every Git push to main

**Backend:**
- Host: Render.com
- URL: `https://worldcup-backend.onrender.com`
- Environment: PHP 8+
- Auto-deploy: On every Git push to main

---

## 💰 Costs

### Current Cost: **$0/month** (FREE)

Both Render.com and Vercel offer generous free tiers:

**Render.com Free Tier:**
- 750 hours/month
- 512 MB RAM
- Auto-sleep after 15 min inactivity
- Cold start: ~30-60 seconds
- Perfect for betting platform (low traffic initially)

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Global CDN
- Automatic HTTPS
- Custom domains

### When to Upgrade:

**Render.com ($7/month):**
- Upgrade when you need 24/7 uptime
- Eliminates cold starts
- Better for high traffic

**Vercel ($20/month):**
- Upgrade when you exceed 100 GB bandwidth
- Better analytics
- Priority support

**Estimated upgrade time:** After ~1000 active users

---

## 🔄 How to Update After Deployment

### Update Frontend:

```bash
# Make changes locally
cd world-cup
# Edit files...

# Test locally
npm run dev

# Push to GitHub
git add .
git commit -m "Update frontend"
git push origin main

# Vercel auto-deploys in ~2 minutes
```

### Update Backend:

```bash
# Make changes locally
cd world-cup/backend
# Edit files...

# Test locally with XAMPP
php -S localhost:8000

# Push to GitHub
git add .
git commit -m "Update backend"
git push origin main

# Render auto-deploys in ~3 minutes
```

---

## 🐛 Common Issues After Deployment

### Issue: API calls fail (CORS error)

**Fix:**
- Check `VITE_API_ENDPOINT` in Vercel environment variables
- Must NOT have trailing slash
- Should be: `https://worldcup-backend.onrender.com`
- NOT: `https://worldcup-backend.onrender.com/`

### Issue: Backend returns 500 error

**Fix:**
- Check Render logs (Dashboard → Your Service → Logs)
- Verify environment variables are set
- Check PHP version (should be 8+)

### Issue: Bot not receiving messages

**Fix:**
- Verify `TELEGRAM_BOT_TOKEN` in Render environment
- Check `TELEGRAM_CHAT_ID` is correct
- Test with: `https://your-backend.onrender.com/test-bot.php`

### Issue: First request is very slow

**Explanation:**
- Render free tier "sleeps" after 15 min inactivity
- First request wakes up the server (takes 30-60 seconds)
- Subsequent requests are fast
- Upgrade to paid plan ($7/mo) for 24/7 uptime

---

## 📊 Monitoring Your App

### Free Monitoring Tools:

1. **Vercel Dashboard**
   - Deployment status
   - Build logs
   - Traffic analytics
   - Error tracking

2. **Render Dashboard**
   - Service health
   - Request logs
   - Memory usage
   - CPU usage

3. **Telegram Bot**
   - See all payment submissions
   - Monitor user activity
   - Quick way to verify system is working

### Recommended (Optional):

- **Sentry** - Error tracking (free tier)
- **Google Analytics** - User analytics (free)
- **LogRocket** - Session replay (free tier)

---

## 🎉 You're Ready!

Everything is configured and ready for production. Follow the 3-step deployment guide above to go live.

### What Happens After Deployment:

1. ✅ Users visit your Vercel URL
2. ✅ They select a country and place a bet
3. ✅ They upload TeleBirr payment screenshot
4. ✅ Screenshot goes to your Telegram bot
5. ✅ QR code appears for them to complete payment
6. ✅ You verify payment in Telegram
7. ✅ User bet is confirmed
8. ✅ 💰 Profit!

### Need Help?

- See: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions
- See: [QUICK_START.md](./QUICK_START.md) for local development
- See: [README.md](./README.md) for project overview

---

## 🚀 Deploy Command Summary

```bash
# 1. Push latest changes
git add .
git commit -m "Production ready"
git push origin main

# 2. Deploy Backend (Render.com dashboard)
# - New Web Service
# - Connect GitHub
# - Configure as above

# 3. Deploy Frontend (Vercel dashboard)
# - New Project  
# - Import GitHub repo
# - Add VITE_API_ENDPOINT env var
# - Deploy

# 4. Test everything
# Visit your Vercel URL and place a test bet

# 5. Go live! 🎊
```

---

**Good luck with your World Cup betting platform! 🏆⚽**
