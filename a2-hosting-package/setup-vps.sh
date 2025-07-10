#!/bin/bash

# A2 Hosting VPS Setup Script
# Automated setup for A2 Hosting VPS

echo "=== A2 Hosting VPS Setup ==="
echo "This script will set up your baby sleep consulting website on A2 Hosting VPS"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)" 
   exit 1
fi

echo "Step 1: Updating system packages..."
apt update && apt upgrade -y

echo "Step 2: Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

echo "Step 3: Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

echo "Step 4: Installing additional software..."
npm install -g pm2
apt install -y nginx unzip wget curl

echo "Step 5: Configuring PostgreSQL..."
DB_PASSWORD=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

sudo -u postgres psql -c "CREATE DATABASE baby_sleep_db;"
sudo -u postgres psql -c "CREATE USER baby_sleep_user WITH PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;"

echo "Step 6: Setting up application directory..."
mkdir -p /var/www/baby-sleep-app
cd /var/www/baby-sleep-app

echo "Step 7: Creating environment configuration..."
cat > .env << EOF
NODE_ENV=production
DATABASE_URL=postgresql://baby_sleep_user:$DB_PASSWORD@localhost:5432/baby_sleep_db
SESSION_SECRET=$SESSION_SECRET
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
