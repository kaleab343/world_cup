#!/bin/bash

# Start PHP development server for backend
# Run this in one terminal, then run ngrok in another

echo "🚀 Starting PHP Development Server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Server will run at: http://localhost:8000"
echo ""
echo "⚠️  After starting, open a NEW terminal and run:"
echo "   ngrok http 8000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

php -S localhost:8000
