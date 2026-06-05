# Update Telegram Bot Menu Button

The bot menu button is currently pointing to the old ngrok URL and needs to be updated to point to Vercel.

## Option 1: Use Browser (Easiest)

Open this URL in your browser:

```
https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/setChatMenuButton?menu_button={"type":"web_app","text":"🎮 Open Betting App","web_app":{"url":"https://world-cup-rho.vercel.app"}}
```

You should see a response like: `{"ok":true,"result":true}`

## Option 2: Use curl command

Run this in your terminal:

```bash
curl -X POST "https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d '{"menu_button":{"type":"web_app","text":"🎮 Open Betting App","web_app":{"url":"https://world-cup-rho.vercel.app"}}}'
```

## Option 3: Use the Node.js script

From the `backend` folder:

```bash
node setup-mini-app.js
```

## After Update

1. Close and reopen the Telegram bot chat
2. Click the menu button (≡) next to the message input
3. The app should now open the Vercel URL instead of ngrok

## Verify Current Settings

To check what URL the bot is currently using:

```
https://api.telegram.org/bot8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI/getChatMenuButton
```
