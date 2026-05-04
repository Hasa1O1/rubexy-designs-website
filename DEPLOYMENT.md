# Deployment Guide

This project is currently configured as a Render static site. Supabase will provide backend services as the CMS is added.

## Render Static Site

Use the existing `render.yaml` file. It builds the Vite app and serves `dist` with a fallback to `index.html` for React Router routes.

Render settings:

```yaml
Build Command: npm install && npm run build
Publish Directory: dist
```

## Environment Variables

The current cleaned frontend does not require backend environment variables to build.

After the Supabase CMS client is added, configure these in Render:

```text
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Database

Create the CMS tables from the Supabase Dashboard:

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Open [supabase/schema.sql](</c:/Users/Emmanuel Hasalama/Documents/Programming/Rubexy website/supabase/schema.sql>).
4. Copy the SQL into the Supabase SQL Editor.
5. Click **Run**.

The schema creates:

- `site_content`: editable site text and image references. The `key` column stores names like `home.hero.title`; `value` stores the text or image URL; `type` is either `text` or `image`.
- `portfolio_items`: portfolio cards with a `title` and `image_url`.

## Admin Login

Create one Supabase Auth user with this email:

```text
rubexydesigns@gmail.com
```

The frontend admin login route is:

```text
/admin-login
```

## Supabase Storage

Create the public `images` bucket and storage policies from the Supabase Dashboard:

1. Open **SQL Editor**.
2. Open [supabase/storage.sql](</c:/Users/Emmanuel Hasalama/Documents/Programming/Rubexy website/supabase/storage.sql>).
3. Copy the SQL into the Supabase SQL Editor.
4. Click **Run**.

The SQL creates an `images` bucket, allows public image reads, and allows uploads/updates/deletes only for `rubexydesigns@gmail.com`.

## Local Checks

Run these before deploying:

```bash
npm run build
npm run typecheck
npm run lint
```

## Notes

The old Vercel serverless API routes were removed. Contact and quote forms currently use client-side validation and open an email draft until a deliberate form backend is added.
