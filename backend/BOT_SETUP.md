# 🤖 Telegram Bot Setup Guide

Your new bot: **@placeyou_betbot**  
Bot Token: `8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI`

---

## 🎯 What This Bot Does

- ⚽ Interactive menu with "Bet" button
- 🎮 Inline keyboard buttons for team selection
- 📊 View bets, balance, and support
- 🌐 Direct links to your betting website
- 💬 Auto-responses to user commands

---

## 🚀 Quick Setup (2 Steps)

### Step 1: Set Bot Commands (1 minute)

Run this to add commands to your bot menu:

```bash
# Local (with XAMPP)
php /opt/lampp/htdocs/backend/setup-bot-menu.php

# Or via browser
http://localhost/backend/setup-bot-menu.php
```

This adds these commands:
- `/start` - Start the bot
- `/bet` - Place a bet
- `/mybets` - View your bets
- `/help` - Get help

### Step 2: Set Webhook (1 minute)

**After deploying to Render.com:**

1. Edit `backend/set-webhook.php` line 10:
   ```php
   $webhookUrl = "https://your-render-url.onrender.com/bot-webhook.php";
   ```

2. Run the script:
   ```bash
   # Via browser (visit this URL)
   https://your-render-url.onrender.com/set-webhook.php
   ```

3. You should see: `✅ Webhook set successfully!`

---

## 📁 Files Created

### `setup-bot-menu.php`
Sets up bot commands that appear in the `/` menu.

**Run once** to configure commands.

### `bot-webhook.php`
Main bot handler - responds to user messages.

**Handles:**
- `/start` command - Shows welcome message with bet menu
- `/bet` command - Shows team selection
- `⚽ Place Bet` button - Opens bet menu
- `📊 My Bets` button - Shows user's bets
- `💰 Balance` button - Shows balance
- `📞 Support` button - Shows support info
- Inline buttons for team selection

### `set-webhook.php`
Connects your bot to the webhook handler.

**Run after deployment** to activate bot responses.

---

## 🎮 Bot Features

### Main Menu Buttons (Always visible):
```
⚽ Place Bet    📊 My Bets
💰 Balance     📞 Support
```

### Inline Team Buttons:
```
🌐 Open Betting Website

🇧🇷 Brazil    🇦🇷 Argentina
🇩🇪 Germany   🇫🇷 France
🇪🇸 Spain     🇬🇧 England

📋 View All Teams
```

### Commands:
- `/start` - Welcome message + menu
- `/bet` - Place a bet
- `/mybets` - View active bets
- `/help` - Support information

---

## 🔧 Configuration

### Update Website URLs

Edit `bot-webhook.php` and replace `https://your-vercel-url.vercel.app` with your actual Vercel URL.

**Lines to update:**
- Line 75: Main website link
- Line 142: Team-specific bet page
- Line 209: All teams page

**Example:**
```php
// Before
['text' => '🌐 Open Betting Website', 'url' => 'https://your-vercel-url.vercel.app']

// After
['text' => '🌐 Open Betting Website', 'url' => 'https://worldcup-betting.vercel.app']
```

---

## 🧪 Testing

### Local Testing (with ngrok):

1. Start XAMPP:
   ```bash
   sudo /opt/lampp/lampp start
   ```

2. Start ngrok:
   ```bash
   ngrok http 80
   ```

3. Update webhook URL in `set-webhook.php`:
   ```php
   $webhookUrl = "https://your-ngrok-url.ngrok-free.dev/backend/bot-webhook.php";
   ```

4. Set webhook:
   ```bash
   php /opt/lampp/htdocs/backend/set-webhook.php
   ```

5. Test bot:
   - Open https://t.me/placeyou_betbot
   - Send `/start`
   - Click buttons

### Check Webhook Status:

Visit: `https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/getWebhookInfo`

Should show:
```json
{
  "ok": true,
  "result": {
    "url": "https://your-url.com/bot-webhook.php",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

---

## 🐛 Troubleshooting

### Bot not responding

**Check webhook:**
```bash
curl https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/getWebhookInfo
```

**Reset webhook:**
```bash
# Visit this URL
https://your-render-url.onrender.com/set-webhook.php
```

### Buttons not showing

**Re-run menu setup:**
```bash
php setup-bot-menu.php
```

### Check logs

Webhook creates `bot-log.txt` in the backend folder. Check it for incoming requests:
```bash
tail -f /opt/lampp/htdocs/backend/bot-log.txt
```

### Remove webhook (for testing)

```bash
curl "https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/deleteWebhook"
```

---

## 🔐 Security

**⚠️ Keep your bot token secure!**

### For Production:

1. **Don't commit bot token to Git:**
   ```bash
   # Create bot-config.php (not tracked by Git)
   echo "<?php define('BOT_TOKEN', '8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI'); ?>" > bot-config.php
   
   # Add to .gitignore
   echo "bot-config.php" >> .gitignore
   ```

2. **Use environment variables on Render:**
   - Add: `BOT_TOKEN` = `8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI`
   - Update PHP files: `$botToken = getenv('BOT_TOKEN');`

3. **Verify webhook requests** (optional - add to bot-webhook.php):
   ```php
   // Verify request is from Telegram
   $secret = hash('sha256', $botToken);
   if (!isset($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN']) || 
       $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] !== $secret) {
       http_response_code(403);
       exit;
   }
   ```

---

## 📝 Customization

### Add More Teams

Edit `sendBetMenu()` in `bot-webhook.php`:

```php
[
    ['text' => '🇮🇹 Italy', 'callback_data' => 'bet_italy'],
    ['text' => '🇵🇹 Portugal', 'callback_data' => 'bet_portugal']
]
```

### Change Welcome Message

Edit line 53-56 in `bot-webhook.php`:

```php
$text = "⚽ *Welcome to World Cup 2026 Betting, {$userName}!*\n\n";
$text .= "Your custom message here\n";
```

### Add New Commands

1. Add to `setup-bot-menu.php`:
   ```php
   [
       "command" => "odds",
       "description" => "View current odds"
   ]
   ```

2. Handle in `bot-webhook.php`:
   ```php
   elseif ($text == '/odds') {
       sendOdds($chatId, $botToken);
   }
   ```

---

## 🚀 Production Deployment

### After deploying backend to Render:

1. **Update webhook URL:**
   ```php
   // In set-webhook.php
   $webhookUrl = "https://worldcup-backend.onrender.com/bot-webhook.php";
   ```

2. **Set webhook:**
   Visit: `https://worldcup-backend.onrender.com/set-webhook.php`

3. **Update website URLs:**
   Replace all `https://your-vercel-url.vercel.app` with your actual Vercel URL

4. **Test bot:**
   - Open https://t.me/placeyou_betbot
   - Send `/start`
   - Try all buttons

---

## 📊 Bot Analytics

Track bot usage by logging to database or file:

```php
// Add to bot-webhook.php
function logActivity($chatId, $action) {
    $log = date('Y-m-d H:i:s') . " - User: {$chatId} - Action: {$action}\n";
    file_put_contents('bot-analytics.txt', $log, FILE_APPEND);
}

// Use it
logActivity($chatId, 'clicked_place_bet');
```

---

## 🎉 You're Done!

Your bot is ready with:
- ✅ Interactive menu
- ✅ Inline buttons
- ✅ Team selection
- ✅ Command handlers
- ✅ Webhook integration

Test it: https://t.me/placeyou_betbot

Need help? Check the troubleshooting section above!
