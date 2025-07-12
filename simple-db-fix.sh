#!/bin/bash

echo "=== Simple Database Fix ==="

# Stop PostgreSQL completely
sudo systemctl stop postgresql

# Remove existing data directory and start fresh
sudo rm -rf /var/lib/postgresql/16/main
sudo -u postgres /usr/lib/postgresql/16/bin/initdb -D /var/lib/postgresql/16/main

# Start PostgreSQL
sudo systemctl start postgresql

# Wait for startup
sleep 5

# Create database and user using peer authentication (default)
sudo -u postgres createdb baby_sleep_db
sudo -u postgres psql -c "CREATE USER baby_sleep_user WITH PASSWORD 'SecureBabyPass2025!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;"
sudo -u postgres psql -c "ALTER USER baby_sleep_user CREATEDB;"

# Update the environment to use peer authentication
cd /var/www/baby-sleep-app
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres@localhost:5432/baby_sleep_db
PORT=3000
NODE_ENV=production
SESSION_SECRET=baby-sleep-secret-key-2025
EOF

echo "Database setup complete - trying db:push"
npm run db:push