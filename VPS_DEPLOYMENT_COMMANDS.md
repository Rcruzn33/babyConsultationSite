# VPS Deployment Commands

Run these commands in your SSH terminal (connected to 31.97.99.104):

## Step 1: Stop current basic application
```bash
pm2 delete baby-sleep-app
```

## Step 2: Navigate to directory and clean up
```bash
cd /var/www/baby-sleep-app
rm -rf server shared client package.json package-lock.json
```

## Step 3: Extract the complete application
```bash
tar -xzf complete-baby-sleep-app.tar.gz
```

## Step 4: Install all dependencies
```bash
npm install
```

## Step 5: Build the complete application
```bash
npm run build
```

## Step 6: Start the complete application
```bash
pm2 start npm --name baby-sleep-app -- start
pm2 save
```

## Step 7: Update Nginx configuration (if needed)
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Expected Result
After these steps, your website at http://31.97.99.104 will show:
- Beautiful baby sleep consulting homepage
- Professional services page
- Complete admin dashboard
- All React components and styling
- Identical to your Replit version

## If there are any errors
Run this to check logs:
```bash
pm2 logs baby-sleep-app
```