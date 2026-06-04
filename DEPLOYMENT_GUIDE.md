# 🚀 World Cup Betting Platform - Deployment Guide

Complete guide to deploy your World Cup betting platform with backend on **Render.com** and frontend on **Vercel**.

---

## 📋 Prerequisites

- GitHub account
- Render.com account (sign up at https://render.com)
- Vercel account (sign up at https://vercel.com)
- Telegram Bot Token: `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
- Telegram Chat ID: `500761652`

---

## 🔧 Part 1: Backend Deployment (Render.com)

### Step 1: Push Backend to GitHub

Your backend folder is already in the repository at `world-cup/backend/`.

### Step 2: Create Render Web Service

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `kaleab343/world_cup`
5. Configure the service:

   **Basic Settings:**
   - **Name:** `worldcup-backend`
   - **Region:** Choose closest to Ethiopia (e.g., Frankfurt, Singapore)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   
   **Build & Deploy:**
   - **Runtime:** `PHP`
   - **Build Command:** 
     ```bash
     composer install --no-dev || echo "No composer dependencies"
     ```
   - **Start Command:**
     ```bash
     php -S 0.0.0.0:$PORT
     ```

6. **Environment Variables** (Click "Add Environment Variable"):
   - `TELEGRAM_BOT_TOKEN` = `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
   - `TELEGRAM_CHAT_ID` = `500761652`

7. Click **"Create Web Service"**

8. Wait for deployment (takes 2-5 minutes)

9. Your backend URL will be: `https://worldcup-backend.onrender.com` (or similar)

### Step 3: Test Backend

Once deployed, test your backend:

```bash
# Test bot connectivity
curl https://your-backend.onrender.com/test-bot.php

# Should return JSON with bot info
```

---

## 🎨 Part 2: Frontend Deployment (Vercel)

### Step 1: Update Environment Variable

1. Copy `.env.example` to `.env`:
   ```bash
   cd world-cup
   cp .env.example .env
   ```

2. Edit `.env` and replace with your Render URL:
   ```env
   VITE_API_ENDPOINT=https://worldcup-backend.onrender.com
   ```
   *(Replace `worldcup-backend` with your actual Render service name)*

3. **Important:** Don't commit `.env` to Git (it's already in `.gitignore`)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Import your repository: `kaleab343/world_cup`
4. Configure project:
   
   **Framework Preset:** Vite
   
   **Root Directory:** `world-cup` (or `./`)
   
   **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   
   **Environment Variables:**
   - Add: `VITE_API_ENDPOINT` = `https://worldcup-backend.onrender.com`
   
5. Click **"Deploy"**

6. Wait 2-3 minutes for build to complete

7. Your site will be live at: `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd world-cup

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? world-cup
# - In which directory is your code located? ./
# - Want to override settings? Yes
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Development Command: npm run dev
```

### Step 3: Add Environment Variable (CLI method)

If using CLI, add environment variable:

```bash
vercel env add VITE_API_ENDPOINT production
# Paste: https://worldcup-backend.onrender.com

# Redeploy
vercel --prod
```

---

## ✅ Post-Deployment Verification

### Backend Checks:

1. **Test Bot Connection:**
   ```bash
   curl https://your-backend.onrender.com/test-bot.php
   ```
   Should return bot information

2. **Check Render Logs:**
   - Go to Render Dashboard
   - Click your service
   - View "Logs" tab
   - Look for PHP server running message

### Frontend Checks:

1. **Visit Your Site:**
   Open `https://your-project.vercel.app`

2. **Test Payment Flow:**
   - Select a country
   - Enter bet amount (100 Birr)
   - Click "Place Bet"
   - Go to payment page
   - Upload a screenshot
   - Submit payment
   - Verify screenshot arrives in Telegram
   - Verify QR modal appears

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Click your project
   - View "Deployments" tab
   - Check build logs for errors

---

## 🔥 Common Issues & Fixes

### Backend Issues:

**Issue:** 500 Internal Server Error
**Fix:** 
- Check Render logs for PHP errors
- Verify environment variables are set
- Ensure `config.php` can read environment variables

**Issue:** CORS errors in browser console
**Fix:**
- Verify `.htaccess` is present in backend folder
- Check CORS headers in `config.php`

**Issue:** File upload fails
**Fix:**
- Render has read-only filesystem
- Use `/tmp` directory for temporary files
- Update `submit-payment.php` if needed

**Issue:** Bot not receiving messages
**Fix:**
- Verify `TELEGRAM_BOT_TOKEN` environment variable
- Check `TELEGRAM_CHAT_ID` is correct
- Test bot with `test-bot.php` endpoint

### Frontend Issues:

**Issue:** API calls fail (404 or CORS)
**Fix:**
- Check `VITE_API_ENDPOINT` environment variable in Vercel
- Must be set without trailing slash
- Redeploy after changing environment variables

**Issue:** Build fails on Vercel
**Fix:**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run type-check

# Fix any errors before deploying
```

**Issue:** Page shows blank screen
**Fix:**
- Check browser console for errors
- Verify routing is working (404 pages)
- Check `vercel.json` rewrites are correct

---

## 🎯 Environment Variables Reference

### Backend (Render.com):
```
TELEGRAM_BOT_TOKEN=8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY
TELEGRAM_CHAT_ID=500761652
```

### Frontend (Vercel):
```
VITE_API_ENDPOINT=https://worldcup-backend.onrender.com
```

---

## 💰 Pricing (Free Tiers)

### Render.com Free Tier:
- ✅ 750 hours/month (enough for hobby projects)
- ⚠️ Spins down after 15 minutes of inactivity
- ⏱️ Cold starts take 30-60 seconds
- 🔄 Automatic deploys from Git

### Vercel Free Tier:
- ✅ Unlimited bandwidth
- ✅ 100 deployments/day
- ✅ Custom domains
- ✅ Automatic HTTPS
- ⚡ Global CDN

**Total Cost: $0/month** 🎉

---

## 🔄 Updating Your App

### Update Backend:

1. Make changes to backend code locally
2. Push to GitHub:
   ```bash
   git add world-cup/backend/
   git commit -m "Update backend"
   git push origin main
   ```
3. Render auto-deploys from GitHub

### Update Frontend:

1. Make changes to frontend code locally
2. Push to GitHub:
   ```bash
   git add world-cup/src/
   git commit -m "Update frontend"
   git push origin main
   ```
3. Vercel auto-deploys from GitHub

---

## 🚨 Before Going Live

### Production Checklist:

- [ ] Replace `TELEBIRR_NUMBER` with real TeleBirr number in `PaymentPage.tsx`
- [ ] Update `TELEGRAM_SUPPORT` with real Telegram support group link
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics or monitoring
- [ ] Test complete payment flow end-to-end
- [ ] Verify all translations (Amharic/English)
- [ ] Test on mobile devices
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Create backup of payment data
- [ ] Document admin processes
- [ ] Set up rate limiting on API
- [ ] Add proper authentication if needed

---

## 📱 Custom Domain (Optional)

### For Frontend (Vercel):

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `worldcup.yourdomain.com`)
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### For Backend (Render):

1. Go to Render Dashboard → Your Service
2. Click "Settings" → "Custom Domain"
3. Add domain (e.g., `api.yourdomain.com`)
4. Update DNS records
5. Wait for SSL certificate

---

## 🆘 Support

### Issues:
- GitHub: https://github.com/kaleab343/world_cup/issues
- Telegram: (add your support group)

### Documentation:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Telegram Bot API: https://core.telegram.org/bots/api

---

## 🎊 Success!

Your World Cup betting platform is now live! 

**Frontend:** `https://your-project.vercel.app`  
**Backend:** `https://worldcup-backend.onrender.com`

Share your site and start accepting bets! 🏆⚽
