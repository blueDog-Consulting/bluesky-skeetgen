# Deployment Guide

This guide covers deploying the Bluesky Post Generator to various platforms.

## Quick Deploy Options

### 1. Cloudflare Workers (Recommended - New Standard)

#### **Option A: Direct Wrangler Deployment**

**Step 1: Install Wrangler CLI**
```bash
npm install -g wrangler
# or
yarn global add wrangler
```

**Step 2: Login to Cloudflare**
```bash
wrangler login
```

**Step 3: Deploy Directly**
```bash
# Deploy immediately (creates new Workers deployment)
npx wrangler deploy
```

Your site will be available at `https://bluesky-skeetgen.your-subdomain.workers.dev`

**Step 4: Deploy API Worker (Optional - for real Bluesky API)**
```bash
# Deploy the API worker for real Bluesky integration
npx wrangler deploy --name bluesky-skeetgen-api --script api-worker.js
```

**Step 5: Connect GitHub (Optional)**
- Go to Cloudflare Dashboard → Workers & Pages
- Find your deployment and connect GitHub repo for CI/CD

#### **Option B: GitHub-First Deployment**

**Step 1: Connect GitHub Repository**
1. Go to [Cloudflare Workers](https://dash.cloudflare.com/)
2. Click "Create application" → "Connect to Git"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `site`
   - **Root directory**: (leave empty)

**Step 2: Deploy via Git**
```bash
# Push changes to trigger deployment
git add .
git commit -m "Deploy to Cloudflare Workers"
git push origin main
```

**Step 3: Custom Domain (Optional)**
```bash
# Add custom domain
wrangler domain add yourdomain.com
```

### 2. Cloudflare Pages (Legacy - Still Supported)

**Step 1: Prepare Repository**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
```

**Step 2: Push to GitHub**
```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/bluesky-skeetgen.git
git branch -M main
git push -u origin main
```

**Step 3: Deploy to Cloudflare Pages**
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect your GitHub account
4. Select your `bluesky-skeetgen` repository
5. Configure build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `site`
   - **Root directory**: (leave empty)
6. Click "Save and Deploy"

Your site will be available at `https://your-project-name.pages.dev`

### 2. Netlify

**Option A: Drag & Drop**
1. Go to [Netlify](https://netlify.com/)
2. Drag your `site` folder to the deploy area
3. Your site will be live instantly

**Option B: Git Integration**
1. Connect your GitHub repository
2. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `site`
3. Deploy

### 3. Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Vercel will auto-detect it's a static site
4. Deploy

### 4. GitHub Pages

1. Go to your repository settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose `main` branch and `/site` folder
5. Save

## Why Cloudflare Workers?

According to [Cloudflare's migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/), Workers is the recommended replacement for Pages because it offers:

**Note**: This project uses the modern `[assets]` configuration instead of the legacy `[site]` configuration for better performance and compatibility.

**Deployment Options**:
- **Option A**: Creates a new Workers deployment via CLI (what you experienced)
- **Option B**: Uses existing GitHub-connected deployment with automatic builds

### ✅ **Advantages of Workers over Pages**
- **Better Performance**: Edge computing with lower latency
- **More Features**: Full access to Workers runtime APIs
- **Better Observability**: Workers logs, real-time monitoring
- **Advanced Routing**: Custom domain support, non-root routes
- **Future-Proof**: Pages features are being migrated to Workers
- **Cost Effective**: Same free tier limits, better performance

### 🔄 **Migration Benefits**
- **Static Assets**: Same static file serving capabilities
- **Custom Domains**: Full domain management support
- **Environment Variables**: Same configuration options
- **Build Integration**: Git-based deployments with automatic builds

## Environment Variables

No environment variables are required for this static site.

## Custom Domain

### Cloudflare Workers
```bash
# Add custom domain via CLI
wrangler domain add yourdomain.com

# Or configure in wrangler.toml
[env.production.routes]
pattern = "yourdomain.com/*"
zone_name = "yourdomain.com"
```

### Cloudflare Pages
1. Go to your project settings
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

### Other Platforms
- **Netlify**: Domain management in site settings
- **Vercel**: Domain configuration in project settings
- **GitHub Pages**: Custom domain in repository settings

## CI/CD with GitHub Actions

### Cloudflare Workers
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Wrangler
        run: npm install -g wrangler

      - name: Deploy to Workers
        run: wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### Cloudflare Pages
Automatic deployment from Git - no additional configuration needed.

## Performance Optimization

The site is already optimized for performance:

- **Minimal dependencies**: Only Tailwind CSS and html2canvas
- **CDN delivery**: All external libraries served via CDN
- **No build process**: Direct file serving
- **Responsive design**: Mobile-first approach

## Monitoring

### Cloudflare Analytics
- Built-in analytics with Cloudflare Pages
- No additional setup required

### Google Analytics
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Common Issues

**1. Images not loading**
- Check file paths are correct
- Ensure images are in the `assets/` directory
- Verify CORS settings if using external images

**2. Export not working**
- Check browser console for errors
- Ensure html2canvas is loaded
- Try in a different browser

**3. Styling issues**
- Clear browser cache
- Check if Tailwind CSS is loading
- Verify CSS file paths

**4. Mobile responsiveness**
- Test on actual devices
- Check viewport meta tag
- Verify Tailwind responsive classes

### Debug Mode

Add this to your browser console to enable debug mode:
```javascript
localStorage.setItem('debug', 'true');
```

## Security Considerations

- **No server-side code**: Reduces attack surface
- **Client-side only**: All processing happens in browser
- **No data collection**: Privacy-focused by design
- **HTTPS only**: Modern browsers require secure connections

## Backup Strategy

1. **Git repository**: Primary backup
2. **Cloudflare Pages**: Automatic deployments from Git
3. **Local copy**: Keep working copy on your machine

## Updates and Maintenance

### Regular Updates
- Monitor for library updates (Tailwind, html2canvas)
- Test in multiple browsers
- Check for broken links or dependencies

### Content Updates
1. Make changes locally
2. Test thoroughly
3. Commit and push to Git
4. Automatic deployment via Cloudflare Pages

## Cost Analysis

### Free Tier Limits
- **Cloudflare Workers**: 100,000 requests/day (3M/month)
- **Cloudflare Pages**: 100,000 requests/month
- **Netlify**: 100GB bandwidth/month
- **Vercel**: 100GB bandwidth/month
- **GitHub Pages**: Unlimited

### Paid Options
- **Cloudflare Workers**: $5/month for 10M requests
- **Cloudflare Pages Pro**: $20/month for higher limits
- **Netlify Pro**: $19/month for team features
- **Vercel Pro**: $20/month for advanced features

## Performance Metrics

Expected performance on free tiers:
- **Load Time**: < 1 second
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All green
- **Export Time**: 2-5 seconds

## Support

For deployment issues:
1. Check platform documentation
2. Review error logs in platform dashboard
3. Test locally first
4. Check browser console for errors