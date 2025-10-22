# Quick Start Guide

Get the Rubexy Designs website running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, and form libraries.

## 2. Set Up Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your values (optional for development)
```

For local development, you can skip email configuration. The API endpoints will log form submissions to the console.

## 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173

The site should now be running! 🎉

## 4. Explore the Site

- **Home** (`/`): Hero, featured portfolio, compliance badges
- **About** (`/about`): Company history, vision, mission, CSR
- **Services** (`/services`): All services organized by category
- **Portfolio** (`/portfolio`): Filterable project grid
- **Clients** (`/clients`): Client logos and testimonials
- **Certifications** (`/certifications`): Compliance certificates
- **Contact** (`/contact`): Contact form and office info
- **RFQ** (`/rfq`): Detailed quote request form

## 5. Make Your First Edit

Let's update the hero tagline:

1. Open `src/components/Hero.tsx`
2. Find the `<h1>` tag around line 18
3. Change the text
4. Save the file
5. See the change instantly in your browser!

## Common Tasks

### Update Company Info

**Phone Numbers**: Edit `src/components/Footer.tsx` and `src/pages/Contact.tsx`

**Address**: Search for "FINDECO House" and replace in all files

**Email**: Search for "rubexydesigns@gmail.com" and replace

### Add a Service

1. Open `src/pages/Services.tsx`
2. Add to `brandPrintServices` or `mediaServices` array:
   ```typescript
   {
     icon: YourIcon, // Import from lucide-react
     title: 'Your Service',
     description: 'Brief description',
     items: ['Item 1', 'Item 2', 'Item 3'],
   }
   ```

### Add Portfolio Item

Create a new `.mdx` file in `content/portfolio/`:

```mdx
---
title: "Your Project"
category: "Branding"
description: "Project description"
imageUrl: "https://..."
year: 2024
---

# Your Project Details

Content goes here...
```

### Change Colors

Edit `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue - change these values */
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Deploy

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts. Done!

See `DEPLOYMENT.md` for detailed deployment instructions.

## Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Unit tests
npm test

# Build test
npm run build
```

## Troubleshooting

### Port 5173 Already in Use

```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

### Styles Not Loading

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## Next Steps

1. Replace placeholder images with actual brand assets
2. Update portfolio with real projects  
3. Configure email service for forms (see `DEPLOYMENT.md`)
4. Set up custom domain
5. Run Lighthouse audit and optimize

## Need Help?

- **Documentation**: See `README.md` for full documentation
- **Deployment**: See `DEPLOYMENT.md` for deployment guide
- **Accessibility**: See `ACCESSIBILITY.md` for testing checklist
- **Contributing**: See `CONTRIBUTING.md` for development guidelines

## Support

- Email: rubexydesigns@gmail.com
- Phone: +260 972 188566

---

Happy coding! 🚀

