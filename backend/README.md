# World Cup Backend - Node.js API

Node.js/Express backend for the World Cup betting platform with Telegram bot integration.

## 🚀 Features

- Payment screenshot submission to Telegram
- Telegram bot webhook handler
- Bot menu and commands setup
- CORS enabled for frontend integration
- File upload handling with Multer

## 📦 Installation

```bash
cd backend
npm install
```

## 🔧 Configuration

Set environment variables:

```bash
export TELEGRAM_BOT_TOKEN="8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY"
export TELEGRAM_CHAT_ID="500761652"
export PORT="3000"
```

## 🎯 Usage

### Start Server

```bash
npm start
```

Server runs on `http://localhost:3000`

### Test Bot Connection

```bash
npm run test-bot
```

This will:
- Check bot info
- Check webhook status
- Send a test message to the chat

### Setup Bot Menu

```bash
npm run setup-menu
```

Adds commands to the bot:
- `/start` - Welcome message
- `/bet` - Place a bet
- `/mybets` - View bets
- `/help` - Get help

### Set Webhook

```bash
# With default ngrok URL
npm run set-webhook

# With custom URL
node set-webhook.js https://your-url.com/bot-webhook.php
```

## 📡 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "status": "ok",
  "message": "World Cup Backend API",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### `GET /test-bot.php`
Test bot connection (kept .php extension for compatibility)
```json
{
  "success": true,
  "bot": { ... },
  "chatId": "500761652"
}
```

### `POST /submit-payment.php`
Submit payment with screenshot

**Form Data:**
- `phoneNumber` - User's TeleBirr phone number
- `betId` - Unique bet ID
- `countryName` - Country name
- `amount` - Bet amount (Birr)
- `payout` - Potential payout (Birr)
- `screenshot` - Image file

**Response:**
```json
{
  "success": true,
  "message": "Payment submitted successfully"
}
```

### `POST /bot-webhook.php`
Telegram bot webhook endpoint (kept .php extension for compatibility)

Handles:
- `/start` command
- `/bet` command
- `/mybets` command
- `/help` command
- Button callbacks

## 🔗 Telegram Bot

Bot: **@placeyou_betbot**

**Menu Buttons:**
- ⚽ Place Bet
- 📊 My Bets
- 💰 Balance
- 📞 Support

All buttons redirect users to the betting website.

## 🌐 Deployment on Render.com

### Render Configuration:

1. **Environment:** Node
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. **Environment Variables:**
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### Deploy Steps:

1. Push to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set Root Directory to `backend`
5. Add environment variables
6. Deploy

Your backend will be at: `https://worldcup-backend.onrender.com`

## 🧪 Local Testing with ngrok

1. Start the server:
```bash
npm start
```

2. In another terminal, start ngrok:
```bash
ngrok http 3000
```

3. Set webhook with ngrok URL:
```bash
node set-webhook.js https://your-ngrok-url.ngrok-free.dev/bot-webhook.php
```

4. Test the bot on Telegram

## 📝 Scripts

```bash
npm start           # Start production server
npm run dev         # Start development server
npm run test-bot    # Test bot connection
npm run setup-menu  # Setup bot commands
npm run set-webhook # Set webhook URL
```

## 🗂️ File Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── test-bot.js           # Bot connection tester
├── setup-bot-menu.js     # Bot menu setup
├── set-webhook.js        # Webhook configurator
├── render.yaml           # Render deployment config
└── README.md             # This file
```

## 🔒 Security

- Bot token is stored in environment variables
- CORS is enabled for frontend access
- File uploads are limited to 10MB
- All uploads are sent directly to Telegram (not stored)

## 🐛 Troubleshooting

### Bot not responding
```bash
# Check webhook status
npm run test-bot

# Reset webhook
node set-webhook.js https://your-url.com/bot-webhook.php
```

### Payment submission fails
- Check Telegram bot token is correct
- Verify chat ID is correct
- Check file size is under 10MB
- Ensure ngrok/Render URL is accessible

### Server won't start
- Check Node.js version (requires 18+)
- Run `npm install` to install dependencies
- Check PORT environment variable

## 📚 Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **multer** - File upload handling
- **node-fetch** - HTTP requests
- **form-data** - Form data construction

## 🎉 Success!

Once deployed, your backend will:
- ✅ Accept payment submissions from frontend
- ✅ Forward screenshots to Telegram
- ✅ Handle bot commands and interactions
- ✅ Redirect users to betting website

---

**Built with Node.js + Express** 🚀
