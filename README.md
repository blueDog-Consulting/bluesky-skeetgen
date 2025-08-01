# Bluesky Post Image Generator

![alt text](site/assets/icon.png)

A free, open-source tool for creating realistic Bluesky post mockups and generating images from existing posts. Built with vanilla JavaScript and Tailwind CSS, designed to be fast, responsive, and easy to use.

Use it at https://skeetgen.bluedog.dev

[![Version](https://img.shields.io/badge/Version-v1.2.1-blue?style=for-the-badge)](https://github.com/bluedog-consulting/bluesky-skeetgen/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/bluedog-consulting/bluesky-skeetgen/deploy.yml?branch=main&style=for-the-badge&logo=github-actions)](https://github.com/bluedog-consulting/bluesky-skeetgen/actions)
[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-orange?style=for-the-badge&logo=cloudflare)](https://deploy.workers.cloudflare.com/?url=https://github.com/bluedog-consulting/bluesky-skeetgen)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Live Demo

**[Try it now → https://skeetgen.bluedog.dev](https://skeetgen.bluedog.dev) or [deploy](DEPLOYMENT.md)** it to your own server.

## 📊 GitHub Stats

![GitHub stars](https://img.shields.io/github/stars/bluedog-consulting/bluesky-skeetgen?style=social)
![GitHub forks](https://img.shields.io/github/forks/bluedog-consulting/bluesky-skeetgen?style=social)
![GitHub issues](https://img.shields.io/github/issues/bluedog-consulting/bluesky-skeetgen)
![GitHub pull requests](https://img.shields.io/github/issues-pr/bluedog-consulting/bluesky-skeetgen)
![GitHub contributors](https://img.shields.io/github/contributors/bluedog-consulting/bluesky-skeetgen)
![GitHub last commit](https://img.shields.io/github/last-commit/bluedog-consulting/bluesky-skeetgen)

## 🎯 System Overview

| Feature | Status | Description |
|---------|--------|-------------|
| 🎨 Generate New Posts | ✅ Complete | Create custom Bluesky posts from scratch |
| 📱 Real Post Integration | ✅ Complete | Fetch and use actual Bluesky posts |
| 🌙 Dark/Light Mode | ✅ Complete | Export in both themes |
| 📱 Mobile Responsive | ✅ Complete | Works on all devices |
| 🚀 Cloudflare Deployment | ✅ Complete | One-click deployment |
| 📊 Real Engagement Data | ✅ Complete | Uses actual Bluesky metrics |
| 🎯 WCAG Compliant | ✅ Complete | Accessibility standards |
| 🎲 Smart Randomization | ✅ Complete | Realistic engagement metrics generation |

## Features

### 🎨 **Two Ways to Generate an Image**

#### **🎨 Generate New Post Image**
- **User Profile**: Customize display name, handle, and avatar
- **Post Content**: Add text content with character counter (300 char limit)
- **Images**: Upload custom images for both avatars and post content
- **Post Types**: Support for regular posts, reposts, and replies
- **Engagement Metrics**: Set custom repost, like, and reply counts with randomization
- **Timestamps**: Customize date and time with smart formatting
- **Theme Export**: Choose light or dark mode for the exported image

#### **📱 Create from Existing Post**
- **Social Handle Input**: Enter Bluesky handles to fetch real posts via Bluesky API
- **Post Selection**: Browse and select from fetched posts with pagination
- **Direct URL Support**: Paste specific post URLs for instant loading
- **Real Data**: Uses actual Bluesky posts with real engagement metrics
- **Theme Export**: Choose light or dark mode for the exported image

### 🎯 **Real-time Preview**
- Live updates as you type
- Responsive design for mobile and desktop
- Dark/light mode toggle of the preview image
- Bluesky-accurate styling

### 📱 **Export Options**
- High-quality PNG export
- Automatic filename generation with user's handle/display name
- Light and dark mode export themes

### 🚀 **Technical Features**
- **Fast**: Client-side generation with no server required
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant with keyboard navigation
- **Lightweight**: Minimal dependencies
- **Smart Randomization**: Realistic engagement metrics generation
- **Real Bluesky API**: Live post fetching from actual Bluesky accounts
- **Direct URL Support**: Load specific posts by pasting Bluesky URLs

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bluedog-consulting/bluesky-skeetgen.git
   cd bluesky-skeetgen
   ```

2. **Open in browser**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000 --directory site

   # Using Node.js (if installed)
   npx serve site

   # Or simply open site/index.html in your browser
   ```

3. **Choose your workflow**:
   - **🎨 Generate New Post Image**: Create custom posts from scratch
   - **📱 Create from Existing Post**: Generate images from real Bluesky posts

4. **Export your images** in light or dark mode!

**Note**: For full Bluesky API integration, deploy to Cloudflare Workers using `npx wrangler deploy`

### Deployment

#### Cloudflare Workers (Recommended)

1. **Deploy with one command**
   ```bash
   npx wrangler deploy
   ```

2. **Configure Google Analytics (Optional)**
   ```bash
   # Set your GA4 tracking ID
   wrangler secret put GOOGLE_ANALYTICS_ID
   # Enter your tracking ID when prompted (e.g., G-XXXXXXXXXX)
   ```

3. **Your app will be available** at `https://bluesky-skeetgen.your-subdomain.workers.dev`

4. **Features included**:
   - Static site hosting
   - Real Bluesky API integration (using [api.bsky.app](https://api.bsky.app))
   - No CORS issues (everything on same domain)
   - Avatar proxy for Bluesky CDN images
   - Optional Google Analytics integration

#### Other Hosting Options

- **Cloudflare Pages**: For static-only deployment (no API features)
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Import repository and deploy
- **GitHub Pages**: Enable in repository settings
- **Any static hosting**: Upload files to any web server

**Note**: Only Cloudflare Workers deployment (currently) includes the full Bluesky API integration

## Usage Guide

### 🎨 Generate New Post Image

1. **Choose Post Type**
   - **Regular Post**: Standard Bluesky post
   - **Repost**: Shows as a reposted post
   - **Reply**: Shows as a reply to another post

2. **Set User Profile**
   - **Display Name**: Your name as it appears
   - **Handle**: Your Bluesky handle (e.g., @username.bsky.social)
   - **Avatar**: Upload a custom image or use default

3. **Add Content**
   - **Post Text**: Your message (300 character limit)
   - **Post Image**: Optional image attachment
   - Character counter shows remaining characters

4. **Customize Engagement**
   - **Reposts**: Number of reposts
   - **Likes**: Number of likes
   - **Replies**: Number of replies
   - **🎲 Randomize**: Click to generate realistic metrics

5. **Set Timestamp**
   - **Date**: When the post was made
   - **Time**: Time of posting
   - Smart formatting (e.g., "2h", "3d", "Jan 15")

6. **Export**
   - Choose **Light Mode** or **Dark Mode**
   - Click "Export as PNG" to download
   - Image includes all styling and content
   - Automatic filename generation with your handle/display name

### 📱 Create from Existing Post

1. **Enter Bluesky Handle**
   - Type a Bluesky handle (e.g., @username.bsky.social)
   - Click "Fetch Posts" to load their real posts via Bluesky API
   - Or paste a direct post URL for instant loading

2. **Select a Post**
   - Browse through fetched posts with pagination
   - Posts show real engagement metrics and content
   - Click on any post to select it
   - Preview updates automatically with real data

3. **Export**
   - Choose **Light Mode** or **Dark Mode**
   - Click "Export as PNG" to download
   - Image preserves the original post content and real metrics

### Tips for Best Results

#### For Custom Posts:
- **Images**: Use square images for avatars, any aspect ratio for post images
- **Content**: Keep posts under 300 characters for realism
- **Metrics**: Use realistic numbers (e.g., 42 likes, 12 reposts) or click "🎲 Randomize"
- **Timestamps**: Recent dates work best for engagement metrics

#### For Existing Posts:
- **Handles**: Enter the exact Bluesky handle (e.g., @username.bsky.social)
- **URLs**: Use direct post URLs for specific posts (e.g., https://bsky.app/profile/username.bsky.social/post/3juxx2q5n2g2a)
- **Real Data**: All posts and metrics come from the actual Bluesky API
- **Selection**: Browse through posts to find the perfect one
- **Export**: Choose your preferred theme (light/dark) for the final image

## Technical Details

### Architecture

```
bluesky-skeetgen/
├── site/                           # Static files for deployment
│   ├── index.html                  # Main application
│   ├── css/styles.css              # Custom Bluesky styling
│   ├── js/                         # JavaScript modules
│   │   ├── app.js                  # Main app logic & workflow management
│   │   ├── post-generator.js       # Post rendering engine
│   │   ├── image-handler.js        # Image upload & processing
│   │   ├── export-handler.js       # PNG export functionality
│   │   └── post-fetcher.js         # Bluesky API integration & post selection
│   └── assets/                     # Images and assets
├── api-worker.js                   # Cloudflare Worker (serves static assets + API)
├── wrangler.toml                   # Cloudflare Workers config
├── DEPLOYMENT.md                   # Deployment guide
└── README.md                       # Project documentation
```

### Dependencies

- **[Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)** (CDN): Styling framework
- **[html2canvas](https://github.com/niklasvh/html2canvas)** (CDN): PNG export functionality
- **Vanilla JavaScript**: No build process required
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: For API integration and static asset serving

### Performance

- **Bundle Size**: < 50KB (minified)
- **Load Time**: < 1 second
- **Export Time**: 2-5 seconds depending on content
- **API Response**: < 500ms for Bluesky API calls (via [api.bsky.app](https://api.bsky.app))
- **Edge Computing**: Global CDN for fast worldwide access (if using Cloudflare - YMMV with other providers)

### Analytics & Privacy

- **Google Analytics**: Optional GA4 integration via client-side API configuration
- **Privacy-First**: No tracking by default, analytics only when environment variable is set
- **Open Source**: All tracking code is visible in HTML, environment variable keeps ID private
- **GDPR Compliant**: Analytics can be disabled by not setting the environment variable

## Contributing

I welcome contributions! Here's how to get started:

### Development Setup

1. [Fork](https://github.com/blueDog-Consulting/bluesky-skeetgen/fork) the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push`
7. Open a Pull Request

### Code Style

- Use vanilla JavaScript (ES6+)
- Follow existing code structure
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness

### Feature Ideas

- [x] Real Bluesky API integration for live post fetching (using [api.bsky.app](https://api.bsky.app))
- [x] Seamless workflow switching with confirmation dialogs
- [x] Content preservation across workflow switches
- [x] Watermark on exports
- [ ] Add more post types (quote posts, polls)
- [ ] Batch export multiple posts
- [ ] User authentication for saved posts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [BrandBird's Bluesky Post Generator](https://www.brandbird.app/tools/bluesky-post-generator)

## Support

- **Issues**: [GitHub Issues](https://github.com/bluedog-consulting/bluesky-skeetgen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bluedog-consulting/bluesky-skeetgen/discussions)

---

**Note**: This tool is for creating mockups and educational content. Please use responsibly and don't create misleading or deceptive content.
