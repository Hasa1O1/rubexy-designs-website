# Rubexy Designs Limited Website

A modern, professional website for Rubexy Designs Limited - a Zambian design company specializing in brand, print, and media solutions.

## 🎨 About Rubexy Designs

**Creativity Unlimited** - Established in 2012 and incorporated in 2021, Rubexy Designs Limited delivers high-quality brand, print, and media solutions for businesses in Zambia and beyond.

### Our Services
- **Brand & Print**: Books, magazines, corporate wear, vehicle branding, billboards, signage
- **Media**: Professional photography, documentaries, video advertising
- **Corporate Solutions**: Office branding, embroidery, large-format printing

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel/Netlify ready

## 📋 Features

- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation
- ✅ **SEO Optimized**: Meta tags, OpenGraph, JSON-LD structured data
- ✅ **Performance**: Lighthouse score ≥ 90, lazy loading, code splitting
- ✅ **Modern UI**: Clean design matching company profile aesthetic
- ✅ **Contact Forms**: Serverless API endpoints with spam protection
- ✅ **Portfolio**: MDX-based case studies and project showcases
- ✅ **Certifications**: Display of PACRA, ZRA, NAPSA, ZPPA compliance

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rubexy-designs-website.git
   cd rubexy-designs-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Hero section
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx
│   ├── CompanyProfile.tsx
│   ├── About.tsx
│   └── ...
├── lib/                # Utility functions
├── tests/              # Test files
└── main.tsx           # App entry point

content/                # MDX content files
├── portfolio/         # Portfolio case studies
└── news/             # News and updates

api/                   # Serverless API endpoints
├── contact.ts         # Contact form handler
└── rfq.ts            # RFQ form handler
```

## Supabase Admin Panel Setup

This project supports an admin panel that lets authorized admin users upload portfolio images to Supabase Storage and store portfolio metadata in a Supabase table.

1. Create a Supabase project at https://app.supabase.com and copy the `Project URL` and `anon key`.
2. Add the following environment variables to your `.env` (for local) and to Render's environment variables:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. In the project root you'll find a `supabase/` folder with SQL scripts you should run in order from the Supabase SQL editor:

- `supabase/schema.sql` — creates the `profiles` and `portfolio` tables
- `supabase/policies.sql` — enables RLS and creates policies that allow public SELECT on `portfolio` and restrict INSERT/UPDATE/DELETE to admin users
- `supabase/storage.sql` — example storage policies for the `portfolio-images` bucket (see note below)

4. Create a Storage bucket named `portfolio-images` in the Supabase Dashboard (Storage → Create bucket). If you want public URLs, enable public read for the bucket; otherwise keep it private and use signed URLs.

5. Run `supabase/schema.sql` then `supabase/policies.sql` in the SQL editor. For storage policies, either run `supabase/storage.sql` or create equivalent policies using Dashboard → Storage → Policies (the Dashboard UI is recommended if SQL execution on `storage.objects` is restricted).

6. Create the four admin users in Supabase Auth (Dashboard → Authentication → Users). For each admin user, insert or update a row in `public.profiles` with `is_admin = true`. Example:

```sql
-- Replace <user-uuid> with the user's id from Auth
INSERT INTO public.profiles (id, full_name, is_admin) VALUES ('<user-uuid>', 'Admin Name', true);
-- Or update an existing profile
UPDATE public.profiles SET is_admin = true WHERE id = '<user-uuid>';
```

7. Add these environment variables locally and in Render (Service → Environment):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

8. Install and run locally:

```powershell
npm install
npm run dev
```

9. Verify behavior:
- Login as an admin via `/admin/login` and confirm each portfolio card shows `Upload Image` and `Edit` controls.
- Upload an image and confirm a new object appears in the `portfolio-images` bucket and the `portfolio` row updates with `images` and `image_url`.
- Login as a non-admin user and confirm admin controls are hidden and RLS prevents mutation attempts.

If you need help, run the SQL scripts in the order described and share any errors you see — I can help interpret them.

### SUPABASE SQL (run in Supabase SQL editor)

-- enable pgcrypto for uuid generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
   id uuid REFERENCES auth.users NOT NULL,
   is_admin boolean DEFAULT false,
   full_name text,
   created_at timestamptz DEFAULT now(),
   PRIMARY KEY (id)
);

-- portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
   title text NOT NULL,
   description text,
   image_url text,
   created_at timestamptz DEFAULT now()
);

-- Enable RLS on portfolio
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Allow anyone to SELECT portfolio
CREATE POLICY "public_select" ON portfolio FOR SELECT USING (true);

-- Allow only admins (profiles.is_admin = true) to INSERT/UPDATE/DELETE
CREATE POLICY "admins_manage" ON portfolio FOR INSERT USING (
   EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin)
);
CREATE POLICY "admins_update" ON portfolio FOR UPDATE USING (
   EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin)
);
CREATE POLICY "admins_delete" ON portfolio FOR DELETE USING (
   EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin)
);

-- Storage policies
-- Note: In the Supabase Storage policy editor, enable object RLS and add policies that allow select to public, and insert/update/delete only to admin users by checking profiles.is_admin = true for auth.uid().


## 🎨 Design System

### Colors
- **Primary Orange**: `#FF6600` (RGB: 255, 102, 0)
- **Secondary Grey**: `#666666` (RGB: 102, 102, 102)
- **Background**: White and light grey gradients
- **Text**: Dark grey/black for readability

### Typography
- **Primary Font**: Century Gothic
- **Fallback**: Inter, system fonts
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners and subtle shadows
- Orange accent colors for CTAs and highlights
- Professional, clean aesthetic matching company profile

## 📱 Pages

- **Home**: Hero section, services overview, client testimonials
- **Company Profile**: Mission, vision, company information
- **About**: Team, history, values
- **Services**: Detailed service offerings
- **Portfolio**: Case studies and project showcases
- **Clients**: Client logos and testimonials
- **Certifications**: Compliance badges and certificates
- **Contact**: Contact form and business information
- **RFQ**: Request for quote form

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your web server
```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Email Configuration (for contact forms)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password

# Analytics (optional)
PLAUSIBLE_DOMAIN=your-domain.com
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Contact Form Settings
CONTACT_EMAIL=rubexydesigns@gmail.com
HONEYPOT_SECRET=your-honeypot-secret
```

## 📊 Performance

- **Lighthouse Score**: ≥ 90 across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Optimized with code splitting
- **Images**: Lazy loading and responsive images
- **Caching**: Proper cache headers for static assets

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test src/components/Button.test.tsx
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is proprietary to Rubexy Designs Limited. All rights reserved.

## 📞 Contact

**Rubexy Designs Limited**
- 📍 FINDECO House, Floor 12, Room 16/18, Lusaka, Zambia
- 📞 +260 972 188566 | +260 955 530293
- 📧 rubexydesigns@gmail.com
- 🌐 [Website](https://rubexydesigns.com)

---

**Creativity Unlimited** ✨