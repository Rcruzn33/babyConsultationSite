# Fix VPS Installation Issues

## Current Problem
The package manager has broken dependencies. We need to clean and reinstall properly.

## Step 1: Fix Package Manager Issues
Run these commands to clean and fix the package system:

```bash
# Clean package cache
sudo apt clean
sudo apt autoclean

# Fix broken packages
sudo apt --fix-broken install

# Update package lists
sudo apt update
```

## Step 2: Install Node.js Using NodeSource Repository
Since the default Ubuntu Node.js has issues, use the official NodeSource repository:

```bash
# Install curl if not present
sudo apt install curl -y

# Add NodeSource repository for Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt install nodejs -y
```

## Step 3: Verify Node.js Installation
Check if Node.js is properly installed:

```bash
node --version
npm --version
```

You should see something like:
- Node.js: v20.x.x
- npm: 10.x.x

## Step 4: Install PostgreSQL (Alternative Method)
If PostgreSQL installation failed, try this approach:

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
sudo systemctl status postgresql
```

## Step 5: Continue with Database Setup
Once PostgreSQL is running, continue with database creation:

```bash
# Switch to postgres user
sudo -u postgres psql

# In the PostgreSQL shell, run these commands:
CREATE DATABASE baby_sleep_db;
CREATE USER baby_sleep_user WITH PASSWORD 'SecureBabyPass2025!';
GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;
\q
```

## Step 6: Clone Your Repository
```bash
cd /var/www
git clone https://github.com/Rcruzn33/babyConsultationSite.git baby-sleep-app
cd baby-sleep-app
```

## Step 7: Install Project Dependencies
```bash
npm install
```

If you encounter any permission issues, try:
```bash
sudo chown -R $(whoami) /var/www/baby-sleep-app
npm install
```

## Alternative: Use Docker (If Above Fails)
If you continue having issues, we can deploy using Docker:

```bash
# Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group
sudo usermod -aG docker $USER
```

Let me know which approach works for you!