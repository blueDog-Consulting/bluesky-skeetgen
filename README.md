# Bluesky Post Generator

A free, open-source tool for creating realistic Bluesky post mockups for marketing, presentations, and educational purposes. Built with vanilla JavaScript and Tailwind CSS, designed to be fast, responsive, and easy to use.

## Features

### 🎨 **Post Customization**
- **User Profile**: Customize display name, handle, and avatar
- **Post Content**: Add text content with character counter (300 char limit)
- **Images**: Upload custom images for both avatars and post content
- **Post Types**: Support for regular posts, reposts, and replies
- **Engagement Metrics**: Set custom repost, like, and reply counts
- **Timestamps**: Customize date and time with smart formatting

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
   python -m http.server 8000

   # Using Node.js (if installed)
   npx serve .

   # Or simply open index.html in your browser
   ```

3. **Start customizing!**
   - Fill in the user profile details
   - Add your post content
   - Upload images if desired
   - Set engagement metrics
   - Export your post as PNG

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

### Creating a Post

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

5. **Set Timestamp**
   - **Date**: When the post was made
   - **Time**: Time of posting
   - Smart formatting (e.g., "2h", "3d", "Jan 15")

6. **Export**
   - Click "Export as PNG" to download
   - Image includes all styling and content
   - Automatic filename generation

### Tips for Best Results

- **Images**: Use square images for avatars, any aspect ratio for post images
- **Content**: Keep posts under 300 characters for realism
- **Metrics**: Use realistic numbers (e.g., 42 likes, 12 reposts)
- **Timestamps**: Recent dates work best for engagement metrics

## Technical Details

### Architecture

```
bluesky-skeetgen/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Custom Bluesky styling
├── js/
│   ├── app.js          # Main app logic & theme management
│   ├── post-generator.js # Post rendering engine
│   ├── image-handler.js  # Image upload & processing
│   └── export-handler.js # PNG export functionality
└── README.md
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

- [ ] Add more post types (quote posts, polls)
- [ ] Custom themes and color schemes
- [ ] Batch export multiple posts
- [ ] Social media sharing
- [ ] Template library
- [ ] Advanced image editing
- [ ] Export to other formats (SVG, PDF)

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