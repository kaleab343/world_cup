const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 2014;

// Configuration
// @worldcupevidensbot — chosen because both admin recipients have started this bot,
// so it can deliver to both. (@Win_cup_2_bot can't reach 500761652: "chat not found".)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY';
// Chat IDs that receive bet/payment notifications.
// Each person must press "Start" on the bot first, or Telegram will block messages to them.
// BASE_CHAT_IDS are always notified; any extra IDs in the TELEGRAM_CHAT_ID env var are merged in.
// (We union rather than override so a single-ID env var on the host can't silently drop a recipient.)
const BASE_CHAT_IDS = ['500761652', '460818015', '7369001336'];
const ENV_CHAT_IDS = (process.env.TELEGRAM_CHAT_ID || '')
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
const NOTIFY_CHAT_IDS = [...new Set([...BASE_CHAT_IDS, ...ENV_CHAT_IDS])];

// User-facing bots. Their webhooks all point to /bot-webhook.php; the webhook URL's
// ?bot=<key> query selects which bot's token to reply with, so one backend serves many
// identical bots. (@placeyou_betbot has no query param, so it maps to the default.)
const USER_BOTS = {
    placeyou:     process.env.USER_BOT_TOKEN   || '8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI', // @placeyou_betbot
    worldcup2026: process.env.USER_BOT_TOKEN_2 || '8990523583:AAEPYuvjk6_bLVu5jbF1qLAuJzPelhHAzOk', // @World_Cup2026Bet_bot
};
const DEFAULT_USER_BOT = 'placeyou';
const USER_BOT_TOKEN = USER_BOTS[DEFAULT_USER_BOT]; // back-compat default for helpers

// Welcome message + image shown when a new user starts the bot (/start)
const WELCOME_IMAGE = path.join(__dirname, 'ab.jpg');
const WELCOME_TEXT = `🏆 Welcome to World Cup 2026 Bet! 🏆
እንኳን ወደ World Cup 2026 Bet በሰላም መጡ! የዓለም ዋንጫን ድባብ ከትልቅ ድል ጋር ያጣጥሙ። ⚽️💰

ለምን እኛን ይመርጣሉ?
🌍 ሁሉንም ተሳታፊ አገራት ያካተተ: ተወዳጅ አገርዎን ይደግፉ፣ ይወራረዱ!

🔥 በትንሹ ትልቅ ያሸንፉ: በ 100 ብር ብቻ እስከ 59,000 ብር የሽልማት ባለቤት ይሁኑ።

🎖 ከ 38,000 በላይ ተወራራጆች ያሉበት

⚡️ ፈጣን እና አስተማማኝ: የእርሶ ግምት የሽልማት አሸናፊ ያደርግዎታል።

⚠️ ደንቦች እና ግዴታዎች ተፈፃሚነት አላቸው።
የእድሜ ገደብ: ይህ አገልግሎት እድሜያቸው ከ18 ዓመት በላይ ለሆኑ ብቻ የተፈቀደ ነው። 🔞

ለመጀመር ዝግጁ ነዎት? አሁኑኑ ይወራረዱ፣ ያሸንፉ! 🚀`;

// Track which users have already received the welcome, so it's sent only on the
// FIRST /start. Persisted to a JSON file (best-effort; the host filesystem is
// ephemeral, so a redeploy can reset it — fine for avoiding repeat-spam).
const WELCOMED_FILE = path.join(__dirname, 'welcomed-users.json');
const welcomedUsers = (() => {
    try {
        return new Set(JSON.parse(fs.readFileSync(WELCOMED_FILE, 'utf8')));
    } catch {
        return new Set();
    }
})();
function markWelcomed(chatId) {
    welcomedUsers.add(String(chatId));
    try {
        fs.writeFileSync(WELCOMED_FILE, JSON.stringify([...welcomedUsers]));
    } catch (e) {
        console.error('Could not persist welcomed users:', e);
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper function to send to Telegram
async function sendToTelegram(phoneNumber, betId, countryName, amount, payout, screenshotBuffer, filename) {
    // Caption with bet details (same for every recipient)
    const caption = `🎯 New Bet Placed!\n\n` +
                   `📱 Phone: ${phoneNumber}\n` +
                   `🆔 Bet ID: ${betId}\n` +
                   `⚽ Country: ${countryName}\n` +
                   `💰 Amount: ${amount} Birr\n` +
                   `🏆 Potential Payout: ${payout} Birr`;

    let firstResult = null;

    // Send the screenshot to each configured recipient
    for (const chatId of NOTIFY_CHAT_IDS) {
        try {
            const formData = new FormData();

            // Add the photo
            formData.append('photo', screenshotBuffer, {
                filename: filename,
                contentType: 'image/jpeg'
            });

            formData.append('chat_id', chatId);
            formData.append('caption', caption);

            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const result = await response.json();

            if (!result.ok) {
                console.error(`Telegram send failed for chat ${chatId}:`, result.description);
            }

            // Keep the first recipient's result so payment confirmation still works
            if (firstResult === null) {
                firstResult = result;
            }
        } catch (error) {
            console.error(`Error sending to Telegram chat ${chatId}:`, error);
            if (firstResult === null) {
                firstResult = { ok: false, description: error.message };
            }
        }
    }

    return firstResult || { ok: false, description: 'No notification recipients configured' };
}

// Routes

// Health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'World Cup Backend API',
        timestamp: new Date().toISOString()
    });
});

// Debug: show what recipients/bot the LIVE server is actually running with.
// (Token is never exposed — only the bot's public username via getMe.)
app.get('/debug-config', async (req, res) => {
    let botUsername = null;
    try {
        const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const j = await r.json();
        botUsername = j.ok ? j.result.username : `error: ${j.description}`;
    } catch (e) {
        botUsername = `network error: ${e.message}`;
    }
    res.json({
        bot: botUsername,
        notifyChatIds: NOTIFY_CHAT_IDS,
        envChatIdRaw: process.env.TELEGRAM_CHAT_ID || '(unset)',
    });
});

// Test bot connection
app.get('/test-bot.php', async (req, res) => {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
        );
        const result = await response.json();
        
        res.json({
            success: true,
            bot: result,
            chatId: TELEGRAM_CHAT_ID
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Submit payment with screenshot
app.post('/submit-payment.php', upload.single('screenshot'), async (req, res) => {
    try {
        const { phoneNumber, betId, countryName, amount, payout } = req.body;
        const screenshot = req.file;
        
        // Validate required fields
        if (!phoneNumber || !betId || !countryName || !amount || !payout) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        if (!screenshot) {
            return res.status(400).json({
                success: false,
                message: 'Screenshot is required'
            });
        }
        
        // Send to Telegram
        const result = await sendToTelegram(
            phoneNumber,
            betId,
            countryName,
            amount,
            payout,
            screenshot.buffer,
            screenshot.originalname
        );
        
        if (result.ok) {
            res.json({
                success: true,
                message: 'Payment submitted successfully'
            });
        } else {
            throw new Error(result.description || 'Failed to send to Telegram');
        }
        
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to process payment'
        });
    }
});

// Bot webhook handler
app.post('/bot-webhook.php', express.json(), async (req, res) => {
    try {
        const update = req.body;
        
        // Log for debugging
        console.log('Bot update received:', JSON.stringify(update, null, 2));
        
        // Which bot is this update for? The webhook URL sets ?bot=<key>; default = placeyou.
        const botKey = (req.query.bot && USER_BOTS[req.query.bot]) ? req.query.bot : DEFAULT_USER_BOT;
        const botToken = USER_BOTS[botKey];

        const message = update.message;
        const callbackQuery = update.callback_query;

        // Handle callback queries (button clicks)
        if (callbackQuery) {
            const chatId = callbackQuery.message.chat.id;
            const callbackId = callbackQuery.id;

            // Answer callback
            await fetch(
                `https://api.telegram.org/bot${botToken}/answerCallbackQuery`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: callbackId })
                }
            );

            // Send website link
            await sendBotMessage(chatId,
                '🌐 Please visit our website to place your bet!',
                {
                    inline_keyboard: [[
                        { text: '🌐 Open Betting Website', url: 'https://world-cup-rho.vercel.app' }
                    ]]
                },
                botToken
            );

            return res.json({ ok: true });
        }

        // Handle text messages
        if (message) {
            const chatId = message.chat.id;
            const text = message.text || '';
            const userName = message.from.first_name || 'User';
            const welcomeKey = `${botKey}:${chatId}`;

            if (text === '/start') {
                // Welcome image+text only on the user's first /start (per bot); menu afterwards.
                if (!welcomedUsers.has(welcomeKey)) {
                    await sendWelcome(chatId, botToken);
                    markWelcomed(welcomeKey);
                } else {
                    await sendBetMenu(chatId, userName, botToken);
                }
            } else if (text === '⚽ Place Bet' || text === '/bet') {
                await sendBetMenu(chatId, userName, botToken);
            } else if (text === '📊 My Bets' || text === '/mybets') {
                await sendMyBets(chatId, botToken);
            } else if (text === '💰 Balance') {
                await sendBalance(chatId, botToken);
            } else if (text === '📞 Support' || text === '/help') {
                await sendSupport(chatId, botToken);
            } else {
                await sendDefaultMessage(chatId, botToken);
            }
        }
        
        res.json({ ok: true });
        
    } catch (error) {
        console.error('Bot webhook error:', error);
        res.json({ ok: true }); // Always return ok to Telegram
    }
});

// Bot helper functions
async function sendBotMessage(chatId, text, keyboard = null, botToken = USER_BOT_TOKEN) {
    const data = {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    };

    if (keyboard) {
        data.reply_markup = keyboard;
    }

    await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    );
}

// Welcome shown on /start: the welcome image with the welcome caption and an Open-App button.
async function sendWelcome(chatId, botToken = USER_BOT_TOKEN) {
    const keyboard = {
        inline_keyboard: [[
            { text: '🎮 Open Betting App', web_app: { url: 'https://world-cup-rho.vercel.app' } }
        ]]
    };

    try {
        const formData = new FormData();
        formData.append('chat_id', String(chatId));
        formData.append('photo', fs.createReadStream(WELCOME_IMAGE));
        formData.append('caption', WELCOME_TEXT);
        formData.append('reply_markup', JSON.stringify(keyboard));

        const res = await fetch(
            `https://api.telegram.org/bot${botToken}/sendPhoto`,
            { method: 'POST', body: formData }
        );
        const result = await res.json();
        if (!result.ok) {
            console.error('sendWelcome photo failed:', result.description);
            // Fall back to text-only so the user still gets the welcome
            await sendBotMessage(chatId, WELCOME_TEXT, keyboard, botToken);
        }
    } catch (error) {
        console.error('sendWelcome error:', error);
        await sendBotMessage(chatId, WELCOME_TEXT, keyboard, botToken);
    }
}

async function sendBetMenu(chatId, userName, botToken = USER_BOT_TOKEN) {
    const text = `⚽ *Welcome to World Cup 2026 Betting, ${userName}!*\n\n` +
                 `🏆 Place your bets on your favorite teams\n` +
                 `💰 Fixed bet: 100 Birr per team\n` +
                 `🎯 Win big with competitive odds!\n\n` +
                 `Click the button below to start betting:`;
    
    const keyboard = {
        inline_keyboard: [[
            { 
                text: '🎮 Open Betting App', 
                web_app: { url: 'https://world-cup-rho.vercel.app' }
            }
        ]]
    };
    
    await sendBotMessage(chatId, text, keyboard, botToken);
}

async function sendMyBets(chatId, botToken = USER_BOT_TOKEN) {
    const text = `📊 *Your Active Bets*\n\n` +
                 `Open the app to view your bets and track your winnings!\n\n` +
                 `All your betting history and active bets are available in the app.`;
    
    const keyboard = {
        inline_keyboard: [[
            { 
                text: '🎮 Open App', 
                web_app: { url: 'https://world-cup-rho.vercel.app' }
            }
        ]]
    };
    
    await sendBotMessage(chatId, text, keyboard, botToken);
}

async function sendBalance(chatId, botToken = USER_BOT_TOKEN) {
    const text = `💰 *Your Balance*\n\n` +
                 `Open the app to view your balance, winnings, and transaction history!\n\n` +
                 `Track all your bets and payouts in one place.`;
    
    const keyboard = {
        inline_keyboard: [[
            { 
                text: '🎮 Open App', 
                web_app: { url: 'https://world-cup-rho.vercel.app' }
            }
        ]]
    };
    
    await sendBotMessage(chatId, text, keyboard, botToken);
}

async function sendSupport(chatId, botToken = USER_BOT_TOKEN) {
    const text = `📞 *Support & Help*\n\n` +
                 `Need assistance? We're here to help!\n\n` +
                 `Open the app for:\n` +
                 `• How to place a bet\n` +
                 `• Payment methods\n` +
                 `• Withdrawal process\n` +
                 `• Betting rules\n` +
                 `• Contact support team`;
    
    const keyboard = {
        inline_keyboard: [[
            { 
                text: '🎮 Get Help', 
                web_app: { url: 'https://world-cup-rho.vercel.app' }
            }
        ]]
    };
    
    await sendBotMessage(chatId, text, keyboard, botToken);
}

async function sendDefaultMessage(chatId, botToken = USER_BOT_TOKEN) {
    const text = `I didn't understand that. Use the menu buttons below or type /start to begin! 😊\n\n` +
                 `Or open the app directly:`;
    
    const keyboard = {
        inline_keyboard: [[
            { 
                text: '🎮 Open App', 
                web_app: { url: 'https://world-cup-rho.vercel.app' }
            }
        ]]
    };
    
    await sendBotMessage(chatId, text, keyboard, botToken);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Telegram Bot Token: ${TELEGRAM_BOT_TOKEN ? '✅ Set' : '❌ Not set'}`);
    console.log(`💬 Notification recipients (${NOTIFY_CHAT_IDS.length}): ${NOTIFY_CHAT_IDS.join(', ') || '❌ None'}`);
});
