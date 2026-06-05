/**
 * Notification delivery test.
 *
 * For every known bot token, identifies the bot (getMe) and tries to send a
 * test message to every chat ID. Prints a matrix so we can see exactly which
 * bot can reach which person — and which combinations Telegram blocks.
 *
 * Run:  node backend/test-notify.js
 */

// All bot tokens found across the project (server.js default, render.yaml, menu-button script)
const TOKENS = [
    { label: 'server.js default', token: '8840845626:AAE9Mj9zenR88dy8IZ220bH_4HeEOGz-lSA' },
    { label: 'render.yaml (live?)', token: '8630430801:AAEXDFGSFc3L2HNefbfHuf43gFk1-ewXQxY' },
    { label: 'menu-button bot',    token: '8812319589:AAEi-2_dN3SqPzcGpKuAi0spe7ZfQLpATWI' },
];

// The two people who should receive notifications
const CHAT_IDS = [
    { label: 'OLD (works)', id: '500761652' },
    { label: 'NEW (missing)', id: '460818015' },
];

async function tg(token, method, body) {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
}

(async () => {
    for (const { label, token } of TOKENS) {
        console.log('\n' + '='.repeat(60));

        // Identify the bot
        let me;
        try {
            me = await tg(token, 'getMe');
        } catch (e) {
            console.log(`❌ ${label}: network error — ${e.message}`);
            continue;
        }

        if (!me.ok) {
            console.log(`❌ ${label}: invalid token — ${me.description}`);
            continue;
        }

        console.log(`🤖 ${label}: @${me.result.username} (id ${me.result.id})`);

        // Try sending to each chat ID
        for (const { label: who, id } of CHAT_IDS) {
            try {
                const r = await tg(token, 'sendMessage', {
                    chat_id: id,
                    text: `🧪 Delivery test from @${me.result.username} → ${who} (${id})`,
                });
                if (r.ok) {
                    console.log(`   ✅ ${who} (${id}): DELIVERED`);
                } else {
                    console.log(`   ❌ ${who} (${id}): ${r.description}`);
                }
            } catch (e) {
                console.log(`   ❌ ${who} (${id}): network error — ${e.message}`);
            }
        }
    }
    console.log('\n' + '='.repeat(60));
    console.log('Done. A bot can only message someone who has pressed "Start" on THAT bot.');
})();
