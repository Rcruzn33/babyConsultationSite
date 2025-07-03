# HelioHost Deployment Instructions

## Files Prepared
- server.js (HelioHost-compatible Node.js server)
- .htaccess (Apache configuration)
- package.json (Production dependencies)
- .env.template (Environment variables template)

## Next Steps

1. **Create HelioHost Account**
   - Sign up at https://heliohost.org/
   - Wait for account activation

2. **Prepare Database**
   - Option A: Use external PostgreSQL (Neon, Supabase)
   - Option B: Convert to HelioHost MySQL

3. **Upload Files**
   - Upload all files to public_html directory
   - Copy .env.template to .env and configure

4. **Install Dependencies**
   - Via cPanel Terminal: `npm install --production`
   - Or upload node_modules if pre-installed

5. **Configure Environment**
   - Update .env with your actual values
   - Set up database connection
   - Configure SendGrid API key

6. **Test Deployment**
   - Visit your HelioHost domain
   - Test admin login
   - Verify all functionality

## Important Notes
- Node.js must be enabled in cPanel
- Database schema may need MySQL conversion
- Static assets are served from /attached_assets/
- Session storage uses memory (consider database sessions for production)

## Support
- HelioHost Community Forum
- Documentation at heliohost.org
- Check server logs for debugging
