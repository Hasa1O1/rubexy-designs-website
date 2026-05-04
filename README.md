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
- **Deployment**: Render static hosting ready

## 📋 Features

- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation
- ✅ **SEO Optimized**: Meta tags, OpenGraph, JSON-LD structured data
- ✅ **Performance**: Lighthouse score ≥ 90, lazy loading, code splitting
- ✅ **Modern UI**: Clean design matching company profile aesthetic
- ✅ **Contact Forms**: Client-side validation with email handoff
- ✅ **Portfolio**: Static project showcase ready for CMS migration
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

```

## CMS Backend

The previous Supabase admin panel and serverless API setup has been removed. A new Supabase CMS will be added incrementally using Auth, Database, Storage, and React Query.

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

### Render
1. Connect your GitHub repository to Render
2. Use the existing `render.yaml` static site configuration
3. Configure Supabase environment variables after the CMS client is added

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
