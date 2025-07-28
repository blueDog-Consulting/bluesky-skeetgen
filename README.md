# Bluesky Image Post Generator

A free, open-source tool for creating realistic Bluesky post mockups and generating images from existing posts. Built with vanilla JavaScript and Tailwind CSS, designed to be fast, responsive, and easy to use.

## Features

### 🎨 **Two Workflow Options**

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
- Dark/light mode toggle
- Bluesky-accurate styling

### 📱 **Export Options**
- High-quality PNG export
- Automatic filename generation
- Multiple size options (small, default, large, HD)
- Custom styling options

### 🚀 **Technical Features**
- **Fast**: Client-side generation with no server required
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant with keyboard navigation
- **Cross-browser**: Works on all modern browsers
- **Lightweight**: Minimal dependencies
- **Smart Randomization**: Realistic engagement metrics generation
- **Real Bluesky API**: Live post fetching from actual Bluesky accounts
- **Direct URL Support**: Load specific posts by pasting Bluesky URLs

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bluesky-skeetgen.git
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

### Deployment

#### Cloudflare Pages (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (leave empty)
     - Build output directory: `.`
   - Deploy!

#### Other Hosting Options

- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Import repository and deploy
- **GitHub Pages**: Enable in repository settings
- **Any static hosting**: Upload files to any web server

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
   - Automatic filename generation

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
│   ├── test.html                   # Test interface
│   ├── css/styles.css              # Custom Bluesky styling
│   ├── js/                         # JavaScript modules
│   │   ├── app.js                  # Main app logic & theme management
│   │   ├── post-generator.js       # Post rendering engine
│   │   ├── image-handler.js        # Image upload & processing
│   │   ├── export-handler.js       # PNG export functionality
│   │   └── post-fetcher.js         # Bluesky API integration & post selection
│   └── assets/                     # Images and assets
├── api-worker.js                   # Cloudflare Worker for Bluesky API proxy
├── wrangler.toml                   # Cloudflare Workers config
├── DEPLOYMENT.md                   # Deployment guide
└── README.md                       # Project documentation
```

### Dependencies

- **Tailwind CSS** (CDN): Styling framework
- **html2canvas** (CDN): PNG export functionality
- **Vanilla JavaScript**: No build process required

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance

- **Bundle Size**: < 50KB (minified)
- **Load Time**: < 1 second
- **Export Time**: 2-5 seconds depending on content

## Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use vanilla JavaScript (ES6+)
- Follow existing code structure
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness

### Feature Ideas

- [x] Real Bluesky API integration for live post fetching
- [ ] Add more post types (quote posts, polls)
- [ ] Custom themes and color schemes
- [ ] Batch export multiple posts
- [ ] Social media sharing
- [ ] Template library
- [ ] Advanced image editing
- [ ] Export to other formats (SVG, PDF)
- [ ] User authentication for saved posts
- [ ] Community post templates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [BrandBird's Bluesky Post Generator](https://www.brandbird.app/tools/bluesky-post-generator)
- Built with [Tailwind CSS](https://tailwindcss.com/)
- Image processing with [html2canvas](https://html2canvas.hertzen.com/)

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/bluesky-skeetgen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/bluesky-skeetgen/discussions)
- **Email**: your-email@example.com

---

**Note**: This tool is for creating mockups and educational content. Please use responsibly and don't create misleading or deceptive content.