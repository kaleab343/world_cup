# Deployment Guide

## Backend on Render.com

### Step 1: Prepare Repository
1. Create a new GitHub repository for backend only
2. Copy the `backend` folder contents to root of new repo
3. Push to GitHub

OR use the main repo and specify the `backend` folder in Render.

### Step 2: Deploy on Render.com

1. **Go to** https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect** your GitHub repository
5. **Configure:**
   - **Name:** `worldcup-backend`
   - **Root Directory:** `backend` (if using main repo)
   - **Environment:** `PHP`
   - **Build Command:** `composer install --no-dev || echo "No dependencies"`
   - **Start Command:** `php -S 0.0.0.0:$PORT`
   
6. **Add Environment Variables:**
   - `TELEGRAM_BOT_TOKEN` = `8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY`
   - `TELEGRAM_CHAT_ID` = `500761652`

7. **Click "Create Web Service"**

8. **Your backend URL will be:** `https://worldcup-backend.onrender.com`

### Step 3: Test Backend
Visit: `https://your-backend.onrender.com/test-bot.php`

---

## Frontend on Vercel

### Step 1: Update API Endpoint

Edit `src/pages/PaymentPage.tsx` line 16:
```typescript
const API_ENDPOINT = "https://your-backend.onrender.com/submit-payment.php";
```

Replace `your-backend.onrender.com` with your actual Render URL.

### Step 2: Deploy on Vercel

1. **Go to** https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New"** → **"Project"**
4. **Import** your GitHub repository
5. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (or leave blank)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   
6. **Environment Variables:** (None needed for now)

7. **Click "Deploy"**

8. **Your frontend URL will be:** `https://your-project.vercel.app`

---

## Quick Deploy Commands

### Option 1: Manual Deployment

**Backend (Render.com):**
1. Push `backend` folder to GitHub
2. Connect to Render.com
3. Deploy

**Frontend (Vercel):**
```bash
npm install -g vercel
cd world-cup
vercel --prod
```

### Option 2: Environment Variable Approach

Create `.env` file in frontend:
```env
VITE_API_ENDPOINT=https://your-backend.onrender.com
```

Update PaymentPage.tsx:
```typescript
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT + "/submit-payment.php";
```

---

## Post-Deployment Checklist

### Backend:
- [ ] Render service is live
- [ ] Test endpoint: `/test-bot.php` returns data
- [ ] Environment variables set correctly
- [ ] Bot receives test messages

### Frontend:
- [ ] Vercel deployment successful
- [ ] API_ENDPOINT points to Render URL
- [ ] Can place bets
- [ ] Screenshots upload to bot
- [ ] QR code displays after submission

---

## Troubleshooting

### Backend Issues:

**Problem:** 500 Internal Server Error
**Fix:** Check Render logs, ensure PHP version is compatible

**Problem:** CORS errors
**Fix:** Verify config.php has correct CORS headers

**Problem:** File uploads fail
**Fix:** Check Render file system permissions (use /tmp for uploads)

### Frontend Issues:

**Problem:** API calls fail
**Fix:** Update API_ENDPOINT with correct Render URL

**Problem:** Build fails
**Fix:** Check Node.js version, run `npm install` locally first

---

## Costs

- **Render.com Free Tier:** 
  - 750 hours/month
  - Spins down after inactivity
  - Wakes up on first request (slower)

- **Vercel Free Tier:**
  - Unlimited bandwidth
  - 100 GB-hours
  - Automatic HTTPS

Both are FREE for this project! 🎉

---

## Alternative: Keep Backend on Render URL

If you want to keep using ngrok for testing:
1. Deploy frontend to Vercel
2. Update API_ENDPOINT to ngrok URL temporarily
3. Later switch to Render when ready

---

## Production Checklist

Before going live:
- [ ] Replace TELEBIRR_NUMBER with real number
- [ ] Update TELEGRAM_SUPPORT with real Telegram group
- [ ] Set up custom domain (optional)
- [ ] Enable error monitoring
- [ ] Add rate limiting to API
- [ ] Implement proper authentication
- [ ] Backup strategy for payments data
