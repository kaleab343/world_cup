# ⚽ World Cup Betting Platform

A modern, bilingual (English/Amharic) betting platform for the FIFA World Cup 2026 with TeleBirr payment integration and Telegram bot notifications.

## 🌟 Features

- 🌍 **32 FIFA World Cup 2026 Countries** - Place bets on your favorite teams
- 💰 **TeleBirr Payment Integration** - Secure payments via Ethiopian TeleBirr
- 🤖 **Telegram Bot Notifications** - Instant payment confirmations
- 📱 **QR Code Generation** - Easy payment with QR codes
- 🌐 **Bilingual Interface** - Full support for English and Amharic (አማርኛ)
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🎨 **Beautiful Animations** - Smooth flag animations and transitions
- 💵 **Ethiopian Birr (ብር)** - All amounts in local currency

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/kaleab343/world_cup.git
cd world_cup/world-cup

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

Visit: http://localhost:2026

See [QUICK_START.md](./QUICK_START.md) for detailed local setup including backend configuration.

## 📦 Production Deployment

Deploy backend to Render.com and frontend to Vercel (both FREE):

1. **Backend → Render.com** (PHP)
2. **Frontend → Vercel** (React + Vite)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **shadcn/ui** - UI components
- **qrcode.react** - QR code generation

### Backend
- **PHP 8+** - Server-side language
- **Telegram Bot API** - Notifications
- **Render.com** - Hosting (free tier)

### Integrations
- **TeleBirr** - Payment processing
- **Telegram Bot** - @worldcupevidensbot
- **ngrok** - Local development tunneling

## 📁 Project Structure

```
world-cup/
├── backend/                  # PHP backend
│   ├── config.php           # Bot configuration
│   ├── submit-payment.php   # Payment API endpoint
│   ├── test-bot.php         # Bot testing
│   └── render.yaml          # Render config
├── src/
│   ├── pages/               # Application pages
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── CountryPage.tsx  # Bet placement
│   │   ├── PaymentPage.tsx  # Payment flow
│   │   └── ...
│   ├── components/          # Reusable components
│   ├── contexts/            # React contexts (Language)
│   ├── lib/                 # Utilities
│   │   ├── i18n.ts         # Translations
│   │   └── bets.ts         # Bet management
│   └── data/               # Static data
├── .env                     # Environment variables (local)
├── .env.example             # Example environment config
├── vercel.json              # Vercel deployment config
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
└── QUICK_START.md           # Quick setup guide
```

## 🌍 Supported Countries

All 32 FIFA World Cup 2026 qualified nations including:
- 🇧🇷 Brazil
- 🇦🇷 Argentina  
- 🇩🇪 Germany
- 🇫🇷 France
- 🇪🇸 Spain
- And 27 more...

## 💻 Development

```bash
# Install dependencies
npm install

# Start dev server (port 2026)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
```env
VITE_API_ENDPOINT=https://your-backend-url.onrender.com
```

**Backend (Render.com):**
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Update TeleBirr Details

Edit `src/pages/PaymentPage.tsx`:
```typescript
const TELEBIRR_NUMBER = "+251912345678"; // Your TeleBirr number
const TELEGRAM_SUPPORT = "https://t.me/your_support_group";
```

## 🎯 User Flow

1. 🏠 **Home Page** - View all countries with animated flags
2. 🎯 **Select Country** - Choose a team to bet on
3. 💰 **Place Bet** - Fixed 100 Birr bet amount
4. 💳 **Payment** - Upload TeleBirr payment screenshot
5. 📱 **QR Code** - Receive QR code after successful submission
6. ✅ **Confirmation** - Bet confirmed, await match results

## 🤖 Telegram Bot

- **Bot Username:** @worldcupevidensbot
- **Purpose:** Receives payment screenshots for verification
- **Setup:** See [backend/README.md](./backend/README.md)

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details

## 👥 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 🆘 Support

- **GitHub Issues:** https://github.com/kaleab343/world_cup/issues
- **Telegram:** Contact via support group (set up your own)

## 🎉 Acknowledgments

- FIFA for World Cup 2026
- TeleBirr payment system
- Telegram Bot API
- All contributors

---

**Built with ❤️ for Ethiopian football fans**
