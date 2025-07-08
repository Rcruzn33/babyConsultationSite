# How to Delete All Files and Re-upload to GitHub

## Method 1: Delete via GitHub Web Interface

1. Go to: https://github.com/Rcruzn33/babyConsultationSite
2. Click on each file/folder individually
3. Click the trash icon to delete
4. Commit each deletion
5. Once empty, upload all files from `github-deploy` folder

## Method 2: Delete Repository and Recreate (Fastest)

1. Go to repository settings: https://github.com/Rcruzn33/babyConsultationSite/settings
2. Scroll to bottom → "Delete this repository"
3. Type repository name to confirm
4. Create new repository with same name
5. Upload all files from `github-deploy` folder

## Method 3: Use Git Commands (If you have git locally)

```bash
# Clone the repository
git clone https://github.com/Rcruzn33/babyConsultationSite.git
cd babyConsultationSite

# Remove all files
rm -rf *
rm -rf .*  # Remove hidden files too

# Copy files from github-deploy folder
# (copy all files from the github-deploy folder here)

# Commit and push
git add .
git commit -m "Clean repository with correct structure"
git push origin main
```

## What to Upload from github-deploy Folder

✅ All files and folders from the `github-deploy` directory including:
- `client/` (with src/ subfolder)
- `server/`
- `shared/`
- `attached_assets/`
- `package.json`
- All .ts, .js, .json config files

## After Clean Upload

Set these Render settings:
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment Variables: DATABASE_URL, SESSION_SECRET, NODE_ENV=production

Your deployment should then work correctly.