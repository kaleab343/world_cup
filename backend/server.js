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
const BASE_CHAT_IDS = ['500761652', '460818015'];
const ENV_CHAT_IDS = (process.env.TELEGRAM_CHAT_ID || '')
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);
const NOTIFY_CHAT_IDS = [...new Set([...BASE_CHAT_IDS, ...ENV_CHAT_IDS])];

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
        
        const message = update.message;
        const callbackQuery = update.callback_query;
        
        // Handle callback queries (button clicks)
        if (callbackQuery) {
            const chatId = callbackQuery.message.chat.id;
            const callbackId = callbackQuery.id;
            
            // Answer callback
            await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
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
                }
            );
            
            return res.json({ ok: true });
        }
        
        // Handle text messages
        if (message) {
            const chatId = message.chat.id;
            const text = message.text || '';
            const userName = message.from.first_name || 'User';
            
            if (text === '/start' || text === '⚽ Place Bet' || text === '/bet') {
                await sendBetMenu(chatId, userName);
            } else if (text === '📊 My Bets' || text === '/mybets') {
                await sendMyBets(chatId);
            } else if (text === '💰 Balance') {
                await sendBalance(chatId);
            } else if (text === '📞 Support' || text === '/help') {
                await sendSupport(chatId);
            } else {
                await sendDefaultMessage(chatId);
            }
        }
        
        res.json({ ok: true });
        
    } catch (error) {
        console.error('Bot webhook error:', error);
        res.json({ ok: true }); // Always return ok to Telegram
    }
});

// Bot helper functions
async function sendBotMessage(chatId, text, keyboard = null) {
    const data = {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    };
    
    if (keyboard) {
        data.reply_markup = keyboard;
    }
    
    await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    );
}

async function sendBetMenu(chatId, userName) {
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
    
    await sendBotMessage(chatId, text, keyboard);
}

async function sendMyBets(chatId) {
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
    
    await sendBotMessage(chatId, text, keyboard);
}

async function sendBalance(chatId) {
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
    
    await sendBotMessage(chatId, text, keyboard);
}

async function sendSupport(chatId) {
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
    
    await sendBotMessage(chatId, text, keyboard);
}

async function sendDefaultMessage(chatId) {
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
    
    await sendBotMessage(chatId, text, keyboard);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Telegram Bot Token: ${TELEGRAM_BOT_TOKEN ? '✅ Set' : '❌ Not set'}`);
    console.log(`💬 Notification recipients (${NOTIFY_CHAT_IDS.length}): ${NOTIFY_CHAT_IDS.join(', ') || '❌ None'}`);
});
