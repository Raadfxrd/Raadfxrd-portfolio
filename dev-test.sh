#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🧪 Portfolio Testing Environment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# Check if Mailpit is installed
if ! command -v mailpit &> /dev/null; then
    echo -e "${YELLOW}⚠️  Mailpit is not installed.${NC}"
    echo "Installing Mailpit via Homebrew..."
    brew install mailpit
fi

# Start Mailpit in the background
echo -e "${BLUE}📧 Starting Mailpit...${NC}"
echo "   SMTP: localhost:2525"
echo "   Web UI: http://localhost:8025"
echo

# Kill any existing Mailpit/MailHog processes and wait for ports to be freed
pkill -f mailpit 2>/dev/null
pkill -f mailhog 2>/dev/null
killall Mailpit 2>/dev/null
killall MailHog 2>/dev/null
sleep 1

# Wait for ports to be completely free
echo "Waiting for ports to be available..."
for i in {1..10}; do
    if ! lsof -i :2525 > /dev/null 2>&1 && ! lsof -i :8025 > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Start Mailpit with custom ports
mailpit --smtp 127.0.0.1:2525 --listen 127.0.0.1:8025 > /tmp/mailpit.log 2>&1 &
MAILPIT_PID=$!

# Wait for Mailpit to be fully ready (check if ports are listening)
echo "Waiting for Mailpit to start..."
READY=false
for i in {1..15}; do
    if lsof -i :2525 > /dev/null 2>&1 && lsof -i :8025 > /dev/null 2>&1; then
        READY=true
        break
    fi
    sleep 1
done

# Check if Mailpit started successfully
if [ "$READY" = true ] && ps -p $MAILPIT_PID > /dev/null; then
    echo -e "${GREEN}✓ Mailpit is running (PID: $MAILPIT_PID)${NC}"
    echo -e "${GREEN}✓ SMTP server ready on port 2525${NC}"
    echo -e "${GREEN}✓ Web UI ready at http://localhost:8025${NC}"
else
    echo -e "${YELLOW}⚠️  Mailpit may not have started correctly${NC}"
    if [ -f /tmp/mailpit.log ]; then
        echo "Check /tmp/mailpit.log for errors"
        tail -10 /tmp/mailpit.log
    fi
fi

echo
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 Starting Nuxt Dev Server...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# Set environment variable to skip reCAPTCHA in development (optional)
export SKIP_RECAPTCHA=false

# Start Nuxt dev server
npm run dev

# Cleanup function
cleanup() {
    echo
    echo -e "${YELLOW}Shutting down...${NC}"

    # Kill Mailpit
    if [ ! -z "$MAILPIT_PID" ]; then
        kill $MAILPIT_PID 2>/dev/null
    fi
    pkill -f mailpit 2>/dev/null
    killall Mailpit 2>/dev/null

    echo -e "${GREEN}✓ Mailpit stopped${NC}"

    # Clean up log file
    rm -f /tmp/mailpit.log

    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM
