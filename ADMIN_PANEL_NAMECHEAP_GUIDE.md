# Admin Panel Setup Guide (Beginner Friendly)

This project is a **React + Vite** website. The easiest way to add an admin panel without rewriting your whole site is to use a hosted backend (Supabase) and then add a protected `/admin` page in this app.

---

## 0) What you will build

You’ll end up with:
- A login page for admins
- A protected admin dashboard (`/admin`)
- Portfolio items stored in a database instead of hardcoded files
- Image uploads for portfolio entries
- Public site reads portfolio items from the database

Hosting plan:
- Website files on **Namecheap** (or Namecheap-managed static hosting)
- Database + auth on **Supabase** (hosted)

> Why this way: shared hosting usually doesn’t run modern Node apps well, but your current site can be built as static files and hosted almost anywhere.

---

## 1) Prerequisites

1. Create accounts:
   - GitHub
   - Supabase
   - Namecheap
2. Install on your computer:
   - Node.js LTS
   - Git
   - VS Code
3. Run project locally:
   ```bash
   npm install
   npm run dev
   ```

---

## 2) Create Supabase project

1. In Supabase, create a new project.
2. Open **SQL Editor** and run:

```sql
create table portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  summary text,
  image_url text,
  published boolean default false,
  created_at timestamp with time zone default now()
);
```

3. Turn on **Row Level Security (RLS)** for `portfolio_items`.
4. Add policies:
   - Public can read only `published = true`
   - Authenticated admin can insert/update/delete

Example policies:

```sql
create policy "public can read published"
on portfolio_items for select
using (published = true);

create policy "admins can manage"
on portfolio_items for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
```

5. In **Authentication**:
   - Disable open signups (optional but recommended)
   - Create one admin user manually.

---

## 3) Add Supabase client to this app

1. Install SDK:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Create `.env`:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Add `src/lib/supabase.ts`:
   ```ts
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```

---

## 4) Create login + protected admin route

1. Add pages:
   - `src/pages/AdminLogin.tsx`
   - `src/pages/AdminDashboard.tsx`

2. Add an auth guard component:
   - `src/components/AdminGuard.tsx`
   - If no user session, redirect to `/admin/login`.

3. In `src/App.tsx` routes, add:
   - `/admin/login`
   - `/admin` (wrapped with `AdminGuard`)

---

## 5) Build simple CRUD for portfolio

In dashboard:
1. Form fields: title, slug, category, summary, image URL, published.
2. Buttons:
   - Create item
   - Update item
   - Delete item
3. Table/list all items for admin view.

Supabase examples:

```ts
await supabase.from('portfolio_items').insert([{ title, slug, published: false }])
await supabase.from('portfolio_items').update({ title }).eq('id', id)
await supabase.from('portfolio_items').delete().eq('id', id)
```

---

## 6) Connect public Portfolio page to database

1. Update `src/pages/Portfolio.tsx` to fetch from `portfolio_items` where `published = true`.
2. Show loading + error states.
3. Keep existing local content as fallback while migrating.

---

## 7) Add image uploads (optional but useful)

1. In Supabase Storage, create bucket `portfolio-images`.
2. Allow read access for public images.
3. In admin dashboard, upload images and save public URL to `image_url`.

---

## 8) Security checklist (important)

- Do not hardcode secrets in code.
- Keep only `VITE_SUPABASE_ANON_KEY` in frontend.
- Never expose service role key in frontend.
- Use strong admin password + 2FA.
- Restrict admin emails in policy if possible.

---

## 9) Test locally before hosting

Commands:
```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

Manual tests:
- Can login at `/admin/login`
- Cannot open `/admin` without login
- CRUD works
- Public users see only published items

---

## 10) Deploy for Namecheap

Because this is Vite, deployment is static output from `dist/`.

1. Build:
   ```bash
   npm run build
   ```
2. Upload contents of `dist/` to Namecheap hosting `public_html/`.
3. If using cPanel file manager or FTP, make sure:
   - `index.html` is in `public_html/`
   - All `assets/*` are uploaded

For client-side routes (`/admin`, `/portfolio/...`) on Apache shared hosting, add `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Without this, refreshing `/admin` may show 404.

---

## 11) DNS/domain notes with Namecheap

If your domain is on Namecheap and site is hosted there, no special DNS changes needed.
If Supabase is external, your app still works because browser calls Supabase directly.

Optional: connect subdomain like `admin.yourdomain.com` later by:
- Creating CNAME record
- Pointing to a separate admin app host (if you split admin app)

---

## 12) Easiest path vs best long-term path

### Easiest now
- Keep one app
- Add `/admin` route
- Use Supabase Auth + DB
- Deploy static build to Namecheap

### Better long-term
- Keep marketing site static
- Move admin panel to separate app (`admin.yourdomain.com`)
- Add audit logs, role permissions, backups

---

## 13) Common beginner mistakes to avoid

- Using Supabase service key in frontend (never do this)
- Forgetting RLS policies (data becomes too open)
- Forgetting `.htaccess` rewrite (refresh 404)
- Not testing logged-out admin route behavior
- Editing production DB directly without backups

---

## 14) If you want, I can generate the exact code next

I can scaffold these files for your current repo structure:
- `src/lib/supabase.ts`
- `src/components/AdminGuard.tsx`
- `src/pages/AdminLogin.tsx`
- `src/pages/AdminDashboard.tsx`
- route wiring in `src/App.tsx`
- portfolio fetch migration in `src/pages/Portfolio.tsx`

