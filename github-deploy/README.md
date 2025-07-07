# Baby Sleep Consulting Website

A comprehensive baby sleep consulting platform built with React, Express.js, and PostgreSQL.

## Features

- **Professional Website**: Modern, responsive design with custom branding
- **Admin Dashboard**: Complete content management system
- **Contact Management**: Handle inquiries and consultation requests
- **Blog System**: Dynamic blog with content management
- **Email Notifications**: Automated email responses via SendGrid
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Mobile-First Design**: Optimized for all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: SendGrid integration
- **Authentication**: Session-based auth
- **Deployment**: GitHub Pages ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- SendGrid API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/baby-sleep-consulting.git
cd baby-sleep-consulting
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
npm run db:push
```

5. Create admin user
```bash
node create-admin.js
```

6. Start the development server
```bash
npm run dev
```

## Deployment

See `GITHUB_SETUP_GUIDE.md` for detailed deployment instructions.

### Quick Deploy to GitHub Pages

1. Build the project
```bash
npm run build
```

2. Deploy static files to GitHub Pages
3. For full functionality, deploy backend to external service

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SENDGRID_API_KEY`: SendGrid API key for emails
- `SESSION_SECRET`: Session encryption secret
- `NODE_ENV`: Environment (development/production)

## Project Structure

```
├── client-src/          # React frontend source
├── server/             # Express backend
├── shared/             # Shared types and schemas
├── attached_assets/    # Images and static assets
├── create-admin.js     # Admin user creation script
└── server.js          # Production server entry point
```

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please contact us through the website contact form.