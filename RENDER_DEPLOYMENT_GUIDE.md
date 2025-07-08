# Fix Render Deployment - Move Build Dependencies

## Problem Identified
The build is failing because Vite is in devDependencies but Render needs it in main dependencies.

## Solution: Update package.json

### Step 1: Go to GitHub
1. Visit: https://github.com/Rcruzn33/babyConsultationSite
2. Click on `package.json` file
3. Click the pencil icon to edit

### Step 2: Move Build Dependencies
In the `"dependencies"` section, add these lines at the end (before the closing brace):

```json
    "vite": "^5.4.14",
    "@vitejs/plugin-react": "^4.3.2",
    "esbuild": "^0.25.0",
    "tsx": "^4.19.1",
    "typescript": "5.6.3"
```

### Step 3: Remove from devDependencies
Remove these same lines from the `"devDependencies"` section:
- `"vite": "^5.4.14"`
- `"@vitejs/plugin-react": "^4.3.2"`
- `"esbuild": "^0.25.0"`
- `"tsx": "^4.19.1"`
- `"typescript": "5.6.3"`

### Step 4: Commit Changes
- Scroll down and commit with message: "Fix: Move build dependencies to main dependencies"

### Step 5: Redeploy on Render
1. Go back to Render
2. Click "Manual Deploy" 
3. Build should now succeed

## Why This Fixes the Issue
- Render installs only main dependencies by default
- Vite, TypeScript, and esbuild are needed for the build process
- Moving them to main dependencies ensures they're available during build

## Alternative: Change Render Build Command
If you prefer to keep dependencies as they are, you can change the build command in Render to:
```bash
npm install --include=dev && npm run build
```

But moving the dependencies is the cleaner solution.