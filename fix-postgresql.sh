#!/bin/bash

# Fix PostgreSQL authentication issues

echo "=== Fixing PostgreSQL Authentication ==="

# Stop PostgreSQL to make changes
sudo systemctl stop postgresql

# Edit pg_hba.conf to allow password authentication
sudo sed -i 's/local   all             all                                     peer/local   all             all                                     md5/' /etc/postgresql/*/main/pg_hba.conf
sudo sed -i 's/host    all             all             127.0.0.1\/32            scram-sha-256/host    all             all             127.0.0.1\/32            md5/' /etc/postgresql/*/main/pg_hba.conf

# Start PostgreSQL
sudo systemctl start postgresql

# Drop and recreate user with proper permissions
sudo -u postgres psql -c "DROP USER IF EXISTS baby_sleep_user;"
sudo -u postgres psql -c "DROP DATABASE IF EXISTS baby_sleep_db;"

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE baby_sleep_db;"
sudo -u postgres psql -c "CREATE USER baby_sleep_user WITH PASSWORD 'SecureBabyPass2025!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;"
sudo -u postgres psql -c "ALTER USER baby_sleep_user CREATEDB;"

# Grant schema permissions
sudo -u postgres psql -d baby_sleep_db -c "GRANT ALL ON SCHEMA public TO baby_sleep_user;"

echo "=== PostgreSQL setup complete ==="
echo "Testing connection..."

# Test connection
PGPASSWORD='SecureBabyPass2025!' psql -h localhost -U baby_sleep_user -d baby_sleep_db -c "SELECT version();"

echo "If connection test passed, run: npm run db:push"