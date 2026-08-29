# Krech.Co — custom CMS

A Next.js site with a built-in `/admin` dashboard for editing everything on the homepage
(hero, about, video, testimonials, services, footer) and managing clients/projects,
including optional internal case-study pages.

## Local development

```bash
npm install
npx prisma migrate dev   # first time only, creates prisma/dev.db
node prisma/seed.js      # first time only, loads the real starting content
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin` for the CMS.

Local admin login (dev only — see "Going live" below for a real password):
- Email: value of `ADMIN_EMAIL` in `.env.local`
- Password: `changeme123`

### ⚠️ `$` in `.env.local`

Next.js expands `$VAR`-style references in `.env` files. The bcrypt password hash contains
literal `$` characters (e.g. `$2b$10$...`), so every `$` in `ADMIN_PASSWORD_HASH` **must be
escaped as `\$`** or Next will silently mangle it and login will fail with no useful error.
See the existing `.env.local` for the correct format.

## Generating a new admin password hash

```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

Paste the result into `ADMIN_PASSWORD_HASH` in `.env.local` (or your host's env vars),
escaping every `$` as `\$`.

## Going live (free tier)

This app needs three things to run in production, all free:

1. **Hosting — Vercel**
   - Create a free account at vercel.com (GitHub sign-in is easiest)
   - Import this GitHub repo as a new Vercel project
   - Vercel auto-detects Next.js — no config needed

2. **Database — Neon or Vercel Postgres (free tier)**
   - Create a free Postgres database (Neon: neon.tech, or add "Postgres" from Vercel's
     Storage tab on your project)
   - Copy the connection string it gives you
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`
   - Set `DATABASE_URL` in Vercel's Project Settings → Environment Variables to that
     connection string
   - Run `npx prisma migrate deploy` once (locally, pointed at the prod `DATABASE_URL`, or
     via Vercel's deploy hooks) to create the tables, then run `node prisma/seed.js`
     the same way to load starting content

3. **File uploads — Vercel Blob (free tier)**
   - Vercel's filesystem is read-only at runtime, so local-disk uploads
     (`lib/upload.js`) only work in local dev
   - Add Vercel Blob from your project's Storage tab (free tier), which gives you a
     `BLOB_READ_WRITE_TOKEN` env var automatically
   - Update `lib/upload.js` to call `put()` from `@vercel/blob` instead of writing to
     `public/uploads` — that's the only file that needs to change

4. **Environment variables to set in Vercel**
   - `DATABASE_URL` — from step 2
   - `SESSION_SECRET` — any random string 32+ characters long
   - `ADMIN_EMAIL` — your login email
   - `ADMIN_PASSWORD_HASH` — from "Generating a new admin password hash" above (remember
     to escape `$` as `\$` if you ever put it in a `.env` file locally — Vercel's own
     dashboard does **not** do `$` expansion, so no escaping needed when pasted there)

5. **Domain**
   - In Vercel, add `www.krech.co` as a custom domain on the project
   - Update your DNS at your domain registrar to point at Vercel instead of GitHub Pages
     (Vercel's domain settings screen tells you exactly which records to add)

## Project structure

- `app/(site)/` — public site (homepage, `/projects/[slug]` case studies)
- `app/admin/` — the CMS dashboard (auth-protected)
- `app/api/admin/` — API routes the admin dashboard calls to save data
- `prisma/schema.prisma` — data model (Settings, Project, Testimonial, Service)
- `lib/upload.js` — file upload handling (swap point for Vercel Blob, see above)
- `lib/session.js` — login session handling
- `public/uploads/` — the site's currently-migrated images/video (committed to git);
  new uploads through the admin panel land here too in local dev
