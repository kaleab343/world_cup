# ⚡ Quick Start Guide

## Local Development

### Prerequisites
- Node.js 18+ or Bun
- XAMPP (Apache + PHP)
- ngrok account

### 1. Clone Repository

```bash
git clone https://github.com/kaleab343/world_cup.git
cd world_cup/world-cup
```

### 2. Install Frontend Dependencies

```bash
npm install
# or
bun install
```

### 3. Set Up Backend

```bash
# Copy backend to XAMPP
sudo cp -r backend /opt/lampp/htdocs/

# Start XAMPP
sudo /opt/lampp/lampp start

# Configure Chat ID
cd ~/Desktop/personal/world\ cup/world-cup
./get-chat-id.sh
```

### 4. Set Up ngrok Tunnel

```bash
# Start ngrok (in new terminal)
ngrok http 80

# Copy the HTTPS URL (e.g., https://abc-def-ghi.ngrok-free.dev)
```

### 5. Configure Environment

Edit `.env`:
```env
VITE_API_ENDPOINT=https://your-ngrok-url.ngrok-free.dev/backend
```

### 6. Start Frontend

```bash
npm run dev
# or
bun run dev
```

Visit: http://localhost:2026

---

## Production Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

**Quick Deploy:**

1. **Backend → Render.com:**
   - New Web Service
   - Connect GitHub repo
   - Root directory: `backend`
   - Environment: PHP
   - Add env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

2. **Frontend → Vercel:**
   - New Project
   - Import GitHub repo
   - Root directory: `world-cup`
   - Framework: Vite
   - Add env var: `VITE_API_ENDPOINT`

---

## Project Structure

```
world-cup/
├── backend/              # PHP backend
│   ├── config.php        # Bot configuration
│   ├── submit-payment.php # Payment API
│   └── test-bot.php      # Bot test endpoint
├── src/
│   ├── pages/            # React pages
│   │   ├── HomePage.tsx
│   │   ├── CountryPage.tsx
│   │   ├── PaymentPage.tsx
│   │   └── ...
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── lib/              # Utilities
│   │   ├── i18n.ts      # Translations
│   │   └── bets.ts      # Bet logic
│   └── data/            # Country data
├── .env                 # Environment variables (local)
├── .env.example         # Example environment variables
├── vercel.json          # Vercel config
└── package.json         # Dependencies
```

---

## Key Features

- ✅ Bilingual (English/Amharic)
- ✅ TeleBirr payment integration
- ✅ Telegram bot notifications
- ✅ QR code generation
- ✅ Screenshot upload
- ✅ Mobile responsive
- ✅ Animated flag backgrounds

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server (port 2026)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests (if configured)

# Backend
cd /opt/lampp/htdocs/backend
php -S localhost:8000    # Test backend locally

# Check bot
curl http://localhost:80/backend/test-bot.php
```

---

## Configuration Files

- `.env` - Local environment variables
- `vercel.json` - Vercel deployment config
- `backend/render.yaml` - Render deployment config
- `backend/config.php` - PHP backend config
- `vite.config.ts` - Vite configuration

---

## Environment Variables

### Local Development (.env)
```env
VITE_API_ENDPOINT=https://your-ngrok-url.ngrok-free.dev/backend
```

### Production
**Frontend (Vercel):**
```env
VITE_API_ENDPOINT=https://worldcup-backend.onrender.com
```

**Backend (Render):**
```env
TELEGRAM_BOT_TOKEN=8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY
TELEGRAM_CHAT_ID=500761652
```

---

## Troubleshooting

### Port 2026 already in use
```bash
# Kill process on port 2026
sudo lsof -ti:2026 | xargs kill -9

# Or use different port in vite.config.ts
```

### Backend not receiving uploads
```bash
# Check XAMPP status
sudo /opt/lampp/lampp status

# Restart Apache
sudo /opt/lampp/lampp restart

# Check PHP errors
tail -f /opt/lampp/logs/error_log
```

### ngrok tunnel closed
```bash
# Restart ngrok
ngrok http 80

# Update .env with new URL
# Restart dev server
```

---

## Next Steps

1. ✅ Test locally
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Update TeleBirr number
5. ✅ Create Telegram support group
6. ✅ Test complete flow
7. ✅ Go live! 🚀

---

## Support

- **GitHub:** https://github.com/kaleab343/world_cup
- **Telegram Bot:** @worldcupevidensbot
