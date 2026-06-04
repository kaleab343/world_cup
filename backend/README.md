# World Cup Betting Backend

PHP backend to forward payment screenshots to Telegram bot.

## Setup Instructions

### 1. Get Your Telegram Chat ID

1. Start a conversation with your bot: https://t.me/worldcupevidensbot
2. Send any message to the bot (e.g., "/start")
3. Upload `backend` folder to your PHP server
4. Visit `https://your-domain.com/backend/get-chat-id.php` in your browser
5. Copy your Chat ID from the page

### 2. Configure the Backend

Edit `config.php` and replace:
```php
define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID'); // Replace with the Chat ID from step 1
```

### 3. Server Requirements

- PHP 7.0 or higher
- cURL extension enabled
- File upload enabled
- Write permissions for uploads folder

### 4. Update Frontend

In your React app, update the API endpoint in `PaymentPage.tsx`:

```typescript
const API_ENDPOINT = 'https://your-domain.com/backend/submit-payment.php';
```

### 5. Test the Integration

1. Place a test bet
2. Upload a screenshot
3. Check if the message appears in your Telegram bot chat

## API Endpoint

**POST** `/backend/submit-payment.php`

**Form Data:**
- `phoneNumber` (string) - User's TeleBirr phone number
- `betId` (string) - Bet ID
- `countryName` (string) - Country name
- `amount` (string) - Bet amount in Birr
- `payout` (string) - Potential payout in Birr
- `screenshot` (file) - Payment screenshot image

**Response:**
```json
{
  "success": true,
  "message": "Payment submitted successfully"
}
```

## Security Notes

- Keep your bot token secure
- Add rate limiting for production
- Validate file types (images only)
- Consider adding authentication
- Use HTTPS in production

## Troubleshooting

- If images don't send, check file permissions on uploads folder
- If CORS errors, ensure .htaccess is configured properly
- Check PHP error logs for detailed errors
