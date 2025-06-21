# Baby Sleep Consulting Website - Database Setup Guide

## Overview

This website uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database stores contact form submissions, consultation bookings, blog posts, and testimonials.

## Database Schema

The database includes the following tables:

### 1. **users** - Admin user accounts
- `id` (serial, primary key)
- `username` (text, unique)
- `password` (text)

### 2. **contacts** - Contact form submissions
- `id` (serial, primary key)
- `name` (varchar 255)
- `email` (varchar 255)
- `phone` (varchar 50, optional)
- `subject` (varchar 255)
- `message` (text)
- `created_at` (timestamp)
- `responded` (boolean, default false)

### 3. **consultations** - Consultation booking requests
- `id` (serial, primary key)
- `parent_name` (varchar 255)
- `email` (varchar 255)
- `phone` (varchar 50, optional)
- `child_age` (varchar 100)
- `sleep_challenges` (text)
- `consultation_type` (varchar 100)
- `preferred_date` (timestamp, optional)
- `status` (varchar 50, default 'pending')
- `created_at` (timestamp)
- `notes` (text, optional)

### 4. **blog_posts** - Blog content management
- `id` (serial, primary key)
- `title` (varchar 255)
- `slug` (varchar 255, unique)
- `excerpt` (text)
- `content` (text)
- `published` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### 5. **testimonials** - Customer testimonials
- `id` (serial, primary key)
- `parent_name` (varchar 255)
- `child_age` (varchar 100, optional)
- `testimonial` (text)
- `rating` (integer)
- `approved` (boolean, default false)
- `created_at` (timestamp)

## Environment Variables Required

```
DATABASE_URL=postgresql://username:password@host:port/database
PGHOST=your_postgres_host
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=your_database_name
```

## Migration Commands

To set up the database schema:

```bash
# Push schema changes to database
npm run db:push

# Generate migration files (if needed)
npm run db:generate

# View current database state
npm run db:studio
```

## API Endpoints

### Contact Management
- `POST /api/contacts` - Create new contact submission
- `GET /api/contacts` - Retrieve all contacts (admin)
- `PATCH /api/contacts/:id` - Update contact status

### Consultation Management
- `POST /api/consultations` - Create consultation booking
- `GET /api/consultations` - Retrieve all consultations (admin)
- `PATCH /api/consultations/:id` - Update consultation status

### Blog Management
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `POST /api/blog` - Create new blog post (admin)

### Testimonials
- `GET /api/testimonials` - Get testimonials
- `POST /api/testimonials` - Submit new testimonial
- `PATCH /api/testimonials/:id/approve` - Approve testimonial (admin)

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View and manage contact form submissions
- Track consultation bookings and update their status
- Manage blog posts and testimonials
- Approve/reject testimonials before they appear on the website

## Database Access Options

### Option 1: Direct Database Access (Recommended for cost)
Use any PostgreSQL client like:
- pgAdmin (GUI)
- psql (command line)
- DBeaver (cross-platform GUI)
- TablePlus (macOS/Windows)

Connect using the DATABASE_URL or individual connection parameters.

### Option 2: Drizzle Studio (Development)
```bash
npm run db:studio
```
Opens a web-based database browser at http://localhost:4983

### Option 3: Code-based Management
The storage interface in `server/storage.ts` provides type-safe methods for all database operations.

## Backup and Migration

### Backup Database
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore Database
```bash
psql $DATABASE_URL < backup.sql
```

### Transfer to New Host
1. Export data: `pg_dump --data-only $OLD_DATABASE_URL > data.sql`
2. Set up schema on new host: `npm run db:push`
3. Import data: `psql $NEW_DATABASE_URL < data.sql`

## Cost Optimization

PostgreSQL hosting options (low to high cost):
1. **Neon** - Serverless PostgreSQL with generous free tier
2. **Supabase** - Free tier with 500MB storage
3. **Railway** - $5/month for small databases
4. **DigitalOcean Managed Databases** - $15/month
5. **AWS RDS** - Variable pricing

## Security Notes

- All database operations use parameterized queries (SQL injection protection)
- Environment variables store sensitive credentials
- Admin endpoints should be protected with authentication in production
- Consider implementing rate limiting for public endpoints

## Troubleshooting

### Common Issues:
1. **Connection failed**: Check DATABASE_URL format and network access
2. **Table doesn't exist**: Run `npm run db:push` to create tables
3. **Permission denied**: Verify database user has CREATE/INSERT/UPDATE permissions
4. **SSL required**: Add `?sslmode=require` to DATABASE_URL if needed

### Development vs Production:
- Development: Can use `db:push` for schema changes
- Production: Use proper migrations for schema updates to avoid data loss

## File Structure

```
server/
├── storage.ts          # Database interface and PostgreSQL implementation
├── routes.ts           # API endpoints
└── index.ts           # Server setup

shared/
└── schema.ts          # Database schema and Zod validation

client/src/pages/
└── Admin.tsx          # Admin dashboard for data management
```

This setup provides a robust, scalable database solution that can be easily transferred between hosting providers while maintaining data integrity and type safety.