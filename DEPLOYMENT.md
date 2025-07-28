# Deployment Guide

This guide covers deploying the Bluesky Post Generator to various platforms.

## Quick Deploy Options

### 1. Cloudflare Pages (Recommended)

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
   - **Build output directory**: `.`
   - **Root directory**: (leave empty)
6. Click "Save and Deploy"

Your site will be available at `https://your-project-name.pages.dev`

### 2. Netlify

**Option A: Drag & Drop**
1. Go to [Netlify](https://netlify.com/)
2. Drag your project folder to the deploy area
3. Your site will be live instantly

**Option B: Git Integration**
1. Connect your GitHub repository
2. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
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
4. Choose `main` branch and `/ (root)` folder
5. Save

## Environment Variables

No environment variables are required for this static site.

## Custom Domain

### Cloudflare Pages
1. Go to your project settings
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

### Other Platforms
- **Netlify**: Domain management in site settings
- **Vercel**: Domain configuration in project settings
- **GitHub Pages**: Custom domain in repository settings

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
- **Cloudflare Pages**: 100,000 requests/month
- **Netlify**: 100GB bandwidth/month
- **Vercel**: 100GB bandwidth/month
- **GitHub Pages**: Unlimited

### Paid Options
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