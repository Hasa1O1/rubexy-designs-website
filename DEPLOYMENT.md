# Deployment Guide

Step-by-step deployment instructions for the Rubexy Designs website.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Email service API key added
- [ ] Email service integration tested locally
- [ ] Run `npm run build` successfully
- [ ] Run `npm run typecheck` with no errors
- [ ] Run `npm run lint` with no errors
- [ ] Test all forms locally
- [ ] Replace placeholder images with actual brand assets
- [ ] Update company information if needed
- [ ] Test accessibility (Lighthouse score ≥90)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices

## Vercel Deployment (Recommended)

### Initial Setup

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `rubexy-designs` (or your choice)
   - Directory? **.**
   - Override settings? **N**

4. **Set Environment Variables**
   
   Go to your Vercel dashboard → Project Settings → Environment Variables
   
   Add:
   ```
   SENDGRID_API_KEY=your_actual_api_key
   CONTACT_EMAIL=rubexydesigns@gmail.com
   VITE_SITE_URL=https://rubexydesigns.com
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Custom Domain Setup

1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your domain: `rubexydesigns.com`
3. Add www redirect: `www.rubexydesigns.com` → redirect to main domain
4. Follow DNS configuration instructions provided by Vercel

### Email Service Setup (SendGrid Example)

1. **Sign up for SendGrid** at sendgrid.com
2. **Create API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the key (you won't see it again!)

3. **Verify Sender Identity**:
   - Go to Settings → Sender Authentication
   - Verify `rubexydesigns@gmail.com` or use a custom domain

4. **Update API Functions**:
   
   Install SendGrid in your project:
   ```bash
   npm install @sendgrid/mail
   ```
   
   Update `api/contact.ts`:
   ```typescript
   import sgMail from '@sendgrid/mail'
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   
   await sgMail.send({
     to: 'rubexydesigns@gmail.com',
     from: 'noreply@rubexydesigns.com', // Verified sender
     subject: `New Contact: ${name}`,
     text: emailBody,
   })
   ```

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

## Netlify Deployment (Alternative)

### Initial Setup

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Configure Build Settings** (netlify.toml):
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
     functions = "api"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

5. **Set Environment Variables**
   ```bash
   netlify env:set SENDGRID_API_KEY your_key_here
   netlify env:set CONTACT_EMAIL rubexydesigns@gmail.com
   ```

6. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Post-Deployment

### Verification

1. **Test Contact Form**:
   - Submit a test message
   - Verify email received at rubexydesigns@gmail.com
   - Check spam folder if not in inbox

2. **Test RFQ Form**:
   - Submit a test quote request
   - Verify email with attachment received

3. **Check Analytics** (if enabled):
   - Verify tracking code is firing
   - Check that page views are being recorded

4. **Run Lighthouse**:
   - Open site in Chrome
   - DevTools → Lighthouse
   - Run audit on all categories
   - Ensure scores ≥ 90

5. **Test on Mobile**:
   - Check responsive design
   - Test mobile menu
   - Test forms on mobile

### Monitoring

1. **Set up Uptime Monitoring**:
   - Use Vercel Analytics (built-in)
   - Or: UptimeRobot, Pingdom, etc.

2. **Error Tracking** (Optional):
   - Sentry for JavaScript errors
   - LogRocket for session replay

3. **Performance Monitoring**:
   - Web Vitals tracking
   - Google PageSpeed Insights
   - Weekly Lighthouse audits

## SSL Certificate

Both Vercel and Netlify provide automatic SSL certificates via Let's Encrypt. No configuration needed!

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Promote a previous deployment
vercel promote [deployment-url]
```

### Netlify
```bash
# List deploys
netlify deploy:list

# Rollback to previous deploy
netlify rollback
```

## Continuous Deployment

### GitHub Integration

1. Push code to GitHub repository
2. Connect repository in Vercel/Netlify dashboard
3. Enable automatic deploys on push to `main` branch
4. Preview deployments for pull requests

### Deployment Flow

```
git push origin main
  ↓
CI runs (lint, typecheck, build)
  ↓
Deploy to preview URL
  ↓
Automatic smoke tests
  ↓
Deploy to production
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs [deployment-url]
```

### API Functions Not Working

1. Check environment variables are set
2. Verify API key is valid
3. Check function logs
4. Test locally with `vercel dev`

### Email Not Sending

1. Verify API key is correct
2. Check sender email is verified
3. Look at email service dashboard for errors
4. Check spam folder for test emails

## Security Checklist

- [ ] All API keys stored in environment variables (never in code)
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Security headers configured (see vercel.json)
- [ ] Form spam protection active (honeypot + rate limiting)
- [ ] Dependencies up to date (`npm audit`)

## Support

For deployment issues, contact:
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support/

For website-specific issues:
- Email: rubexydesigns@gmail.com
- Phone: +260 972 188566

