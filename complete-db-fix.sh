#!/bin/bash

echo "=== Complete PostgreSQL Fix ==="

# Check if PostgreSQL is running
sudo systemctl status postgresql --no-pager

# Stop PostgreSQL
sudo systemctl stop postgresql

# Check PostgreSQL configuration
echo "Checking PostgreSQL configuration..."
sudo find /etc/postgresql -name "postgresql.conf" -exec grep -l "listen_addresses" {} \;

# Enable listening on all addresses
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
sudo sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf

# Check port configuration
sudo sed -i "s/#port = 5432/port = 5432/" /etc/postgresql/*/main/postgresql.conf

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Wait for PostgreSQL to start
sleep 3

# Check if it's running
sudo systemctl status postgresql --no-pager

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS baby_sleep_db;"
sudo -u postgres psql -c "DROP USER IF EXISTS baby_sleep_user;"
sudo -u postgres psql -c "CREATE DATABASE baby_sleep_db;"
sudo -u postgres psql -c "CREATE USER baby_sleep_user WITH PASSWORD 'SecureBabyPass2025!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE baby_sleep_db TO baby_sleep_user;"
sudo -u postgres psql -c "ALTER USER baby_sleep_user CREATEDB;"

# Grant schema permissions
sudo -u postgres psql -d baby_sleep_db -c "GRANT ALL ON SCHEMA public TO baby_sleep_user;"
sudo -u postgres psql -d baby_sleep_db -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO baby_sleep_user;"
sudo -u postgres psql -d baby_sleep_db -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO baby_sleep_user;"

# Test connection
echo "Testing database connection..."
PGPASSWORD='SecureBabyPass2025!' psql -h localhost -U baby_sleep_user -d baby_sleep_db -c "SELECT version();"

echo "PostgreSQL setup complete!"