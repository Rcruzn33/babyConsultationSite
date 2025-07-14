# RENDER NODE VERSION FIX

## The New Error
The build is now failing with "Invalid node version specification 'null'" - this means Render doesn't know what Node.js version to use.

## QUICK FIX - Add These Files to Your GitHub Repository:

### 1. Create `.nvmrc` file (Node Version Manager file):
```
20
```

### 2. Create `.node-version` file:
```
20.0.0
```

### 3. Update your `package.json` to specify Node version:
```json
{
  "name": "baby-sleep-app",
  "version": "1.0.0",
  "main": "simple-server.js",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node simple-server.js",
    "build": "echo 'No build needed'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "pg": "^8.11.3"
  }
}
```

### 4. Alternative - Set Node Version in Render Environment Variables:
Go to your Render service settings and add:
- Variable Name: `NODE_VERSION`
- Value: `20`

## Why This Happens
Render needs to know which Node.js version to use for your application. The error suggests your repository doesn't have this information specified.

## After the Fix
1. Commit these changes to GitHub
2. Render will use Node.js 20 to build and run your app
3. The simple server should deploy successfully
4. You can then test login with `admin`/`password123`

The Node version specification should resolve the current build error and allow the deployment to proceed.