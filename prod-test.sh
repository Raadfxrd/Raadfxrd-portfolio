#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 Portfolio Production Testing Environment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# Load .env file
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    exit 1
fi

# Source the .env file
set -a
source .env
set +a

# Verify production credentials
echo -e "${BLUE}📋 Checking Production Configuration...${NC}"
echo

MISSING_VARS=()

# Check Supabase Database
if [ -z "$DATABASE_URL" ]; then
    MISSING_VARS+=("DATABASE_URL")
else
    echo -e "${GREEN}✓ Supabase Database: Configured${NC}"
    # Extract and display database host (without showing full connection string)
    if [[ $DATABASE_URL =~ @([^:]+): ]]; then
        echo -e "   Host: ${BASH_REMATCH[1]}"
    fi
fi

# Check Resend API Key
if [ -z "$RESEND_API_KEY" ]; then
    MISSING_VARS+=("RESEND_API_KEY")
else
    echo -e "${GREEN}✓ Resend API: Configured${NC}"
    # Show just the prefix for security
    echo -e "   Key: ${RESEND_API_KEY:0:8}...${RESEND_API_KEY: -4}"
fi

# Check USE_RESEND setting
if [ "$USE_RESEND" = "true" ]; then
    echo -e "${GREEN}✓ Email Provider: Resend (Production)${NC}"
else
    echo -e "${YELLOW}⚠️  USE_RESEND is not set to 'true'${NC}"
    echo -e "${YELLOW}   Emails will use SMTP configuration instead of Resend${NC}"
fi

# Check Admin User Configuration
if [ -z "$ADMIN_USERNAME" ] || [ -z "$ADMIN_PASSWORD" ] || [ -z "$ADMIN_EMAIL" ]; then
    echo -e "${YELLOW}⚠️  Admin credentials incomplete${NC}"
    [ -z "$ADMIN_USERNAME" ] && MISSING_VARS+=("ADMIN_USERNAME")
    [ -z "$ADMIN_PASSWORD" ] && MISSING_VARS+=("ADMIN_PASSWORD")
    [ -z "$ADMIN_EMAIL" ] && MISSING_VARS+=("ADMIN_EMAIL")
else
    echo -e "${GREEN}✓ Admin User: ${ADMIN_USERNAME}${NC}"
fi

# Check reCAPTCHA
if [ -z "$NUXT_RECAPTCHA_SECRET_KEY" ] || [ -z "$NUXT_PUBLIC_RECAPTCHA_SITE_KEY" ]; then
    echo -e "${YELLOW}⚠️  reCAPTCHA not configured${NC}"
else
    echo -e "${GREEN}✓ reCAPTCHA: Configured${NC}"
fi

# Check GitHub Token
if [ -z "$NUXT_PUBLIC_GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  GitHub Token not set (limited API rate)${NC}"
else
    echo -e "${GREEN}✓ GitHub Token: Configured${NC}"
fi

# Check JWT Secret
if [ -z "$JWT_SECRET" ]; then
    MISSING_VARS+=("JWT_SECRET")
else
    echo -e "${GREEN}✓ JWT Secret: Configured${NC}"
fi

echo

# Display missing variables if any
if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo -e "${RED}   - $var${NC}"
    done
    echo
    echo -e "${YELLOW}Please add these to your .env file before continuing.${NC}"
    exit 1
fi

# Warning about production mode
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}⚠️  PRODUCTION MODE WARNING${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo
echo -e "${YELLOW}This script runs in PRODUCTION mode with:${NC}"
echo -e "  • ${YELLOW}Real Supabase Database${NC}"
echo -e "  • ${YELLOW}Real Resend Email Service${NC}"
echo -e "  • ${YELLOW}reCAPTCHA Validation Enabled${NC}"
echo
echo -e "${RED}Actions performed will affect PRODUCTION data!${NC}"
echo -e "${RED}Emails sent will be delivered to REAL recipients!${NC}"
echo
read -p "$(echo -e ${YELLOW}Do you want to continue? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Cancelled by user.${NC}"
    exit 0
fi

echo
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  📊 Production Environment Details${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo
echo -e "${BLUE}Database:${NC}"
echo -e "  • Provider: Supabase (PostgreSQL)"
echo -e "  • Connection: Via DATABASE_URL"
echo
echo -e "${BLUE}Email Service:${NC}"
echo -e "  • Provider: Resend"
echo -e "  • From: ${SMTP_FROM}"
echo -e "  • Contact: ${CONTACT_EMAIL}"
echo
echo -e "${BLUE}Security:${NC}"
echo -e "  • reCAPTCHA: Enabled (v3)"
echo -e "  • JWT Auth: Enabled"
echo
echo -e "${BLUE}Testing Features Available:${NC}"
echo -e "  • ✉️  Contact Form (sends real emails via Resend)"
echo -e "  • 📝 Newsletter Subscription (saves to Supabase)"
echo -e "  • 🔐 Admin Login (authenticates against Supabase)"
echo -e "  • 📰 Blog CMS (reads/writes to Supabase)"
echo

# Export production environment variables
export USE_RESEND=true
export SKIP_RECAPTCHA=false

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 Starting Nuxt Dev Server (Production Services)...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo
echo -e "${YELLOW}💡 Tips:${NC}"
echo -e "   • Contact form emails will be sent via Resend"
echo -e "   • Newsletter subscriptions will be saved to Supabase"
echo -e "   • Admin login: ${ADMIN_USERNAME}"
echo -e "   • Hot-reload is ENABLED (development mode)"
echo -e "   • Press Ctrl+C to stop the server"
echo

# Start Nuxt dev server with production services enabled
npm run dev

# Cleanup function
cleanup() {
    echo
    echo -e "${YELLOW}Shutting down...${NC}"
    echo -e "${GREEN}✓ Server stopped${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM
