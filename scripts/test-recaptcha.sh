#!/bin/bash

echo "🔍 Testing reCAPTCHA Configuration..."
echo ""

# Get keys from .env
SITE_KEY=$(grep "NUXT_PUBLIC_RECAPTCHA_SITE_KEY" .env | cut -d '=' -f2)
SECRET_KEY=$(grep "NUXT_RECAPTCHA_SECRET_KEY" .env | cut -d '=' -f2)

echo "Site Key: $SITE_KEY"
echo "Secret Key: ${SECRET_KEY:0:20}..." # Only show first 20 chars
echo ""

# Test if site key loads
echo "📡 Testing if site key loads from Google..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://www.google.com/recaptcha/api.js?render=$SITE_KEY")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Site key loads successfully! (HTTP $HTTP_CODE)"
    echo ""
    echo "Your reCAPTCHA should work. If badge is missing:"
    echo "  1. Clear browser cache"
    echo "  2. Hard reload (Cmd+Shift+R)"
    echo "  3. Check browser console for errors"
else
    echo "❌ Site key failed to load (HTTP $HTTP_CODE)"
    echo ""
    echo "This means your site key is:"
    echo "  • Invalid or expired"
    echo "  • Deleted from Google reCAPTCHA admin"
    echo "  • For the wrong reCAPTCHA version (v2 vs v3)"
    echo ""
    echo "📋 To fix:"
    echo "  1. Visit: https://www.google.com/recaptcha/admin"
    echo "  2. Create NEW reCAPTCHA v3 site"
    echo "  3. Add 'localhost' to domains"
    echo "  4. Update .env with new keys"
    echo ""
    echo "OR temporarily skip reCAPTCHA:"
    echo "  Set SKIP_RECAPTCHA=true in .env"
fi

