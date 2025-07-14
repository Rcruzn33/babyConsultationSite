# 🔧 Git Commands to Update Your replit-agent Branch

## Method 1: Switch to replit-agent branch locally and update files

### Step 1: Switch to your replit-agent branch
```bash
git checkout replit-agent
```

### Step 2: Copy the files manually
Replace these files with the content from `RENDER_DEPLOYMENT_COMPLETE.md`:

1. **package.json** - Replace with the new version
2. **vite.config.ts** - Replace with simplified version  
3. **server/db.ts** - Update for PostgreSQL SSL
4. **init-db.js** - Create this new file
5. **postcss.config.js** - Simplify to basic config
6. **tailwind.config.ts** - Update with baby sleep colors

### Step 3: Commit and push changes
```bash
git add .
git commit -m "Fix Render deployment - resolve vite not found error"
git push origin replit-agent
```

## Method 2: Direct file updates (if you want me to create them locally)

Since I can't directly modify your git branches, you can:

1. **Copy files from this Replit** - I'll create all the files here
2. **Download them** - Use the file browser to download each file
3. **Upload to GitHub** - Use GitHub's web interface to upload to replit-agent branch

## Method 3: GitHub Web Interface (Easiest)

1. Go to your GitHub repository
2. Switch to `replit-agent` branch
3. Click on each file (package.json, vite.config.ts, etc.)
4. Click "Edit" button
5. Replace content with versions from `RENDER_DEPLOYMENT_COMPLETE.md`
6. Commit each change

## SSH Connection to GitHub (if needed)

### Generate SSH Key (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Add SSH key to GitHub:
1. Copy your public key:
```bash
cat ~/.ssh/id_ed25519.pub
```
2. Go to GitHub → Settings → SSH Keys → Add new key
3. Paste the public key

### Test SSH connection:
```bash
ssh -T git@github.com
```

## Quick Fix Commands (All in one)

```bash
# Switch to replit-agent branch
git checkout replit-agent

# Update files (you'll need to edit these manually)
# Then commit and push
git add .
git commit -m "Fix Render deployment - vite build issues resolved"
git push origin replit-agent
```

## What needs to be updated:

The main issue is **"vite: not found"** because:
1. Vite isn't in your dependencies
2. Build script doesn't install dependencies properly
3. Missing proper configuration

The files I created fix all these issues. Your Render deployment will work once you update your `replit-agent` branch with these files.

**Easiest approach**: Use GitHub's web interface to edit files directly on the `replit-agent` branch.