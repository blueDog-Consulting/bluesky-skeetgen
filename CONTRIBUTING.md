# Contributing to Bluesky Post Image Generator

Thank you for your interest in contributing to the Bluesky Post Image Generator! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Git
- A modern web browser
- Basic knowledge of JavaScript, HTML, and CSS

### Development Setup

1. **Fork the repository**
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

3. **Start developing!**
   - Make changes to the code
   - Test in multiple browsers
   - Ensure mobile responsiveness

## 📁 Project Structure

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
├── CONTRIBUTING.md                 # This file
├── CHANGELOG.md                    # Version history
└── README.md                       # Project documentation
```

## 🎯 Development Guidelines

### Code Style

- **JavaScript**: Use ES6+ features, prefer `const` and `let` over `var`
- **HTML**: Use semantic HTML5 elements, maintain accessibility
- **CSS**: Use Tailwind CSS classes, custom CSS in `styles.css`
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic or non-obvious code

### File Organization

- **JavaScript**: Modular approach with separate files for different concerns
- **CSS**: Custom styles in `styles.css`, use Tailwind for utility classes
- **Assets**: Place images in `assets/` directory
- **Documentation**: Update README.md and CHANGELOG.md for new features

### Testing Guidelines

1. **Cross-browser Testing**
   - Test in Chrome, Firefox, Safari, and Edge
   - Ensure mobile responsiveness
   - Check accessibility features

2. **Functionality Testing**
   - Test all workflow paths
   - Verify export functionality
   - Check API integration
   - Test error handling

3. **Performance Testing**
   - Monitor load times
   - Check export performance
   - Verify memory usage

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Test thoroughly
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: descriptive commit message"
   ```

4. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

Use conventional commit format:
```
type(scope): description

Examples:
feat(workflow): add seamless workflow switching
fix(export): resolve watermark display issue
docs(readme): update deployment instructions
style(css): improve mobile responsiveness
```

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain what the PR does and why
3. **Testing**: Describe how you tested the changes
4. **Screenshots**: Include screenshots for UI changes
5. **Checklist**: Complete the PR checklist

## 🎨 Feature Development

### Adding New Features

1. **Plan the feature**
   - Define requirements
   - Consider user experience
   - Plan implementation approach

2. **Implement incrementally**
   - Start with core functionality
   - Add UI/UX improvements
   - Test thoroughly

3. **Update documentation**
   - Update README.md
   - Add to CHANGELOG.md
   - Update any relevant guides

### Common Development Tasks

#### Adding New Post Types
1. Update `post-generator.js` with new HTML templates
2. Add form controls in `index.html`
3. Update `app.js` to handle new post type
4. Test export functionality

#### Adding New API Endpoints
1. Update `api-worker.js` with new routes
2. Add error handling
3. Update frontend to use new endpoints
4. Test with real data

#### Styling Changes
1. Use Tailwind CSS classes when possible
2. Add custom CSS to `styles.css` if needed
3. Ensure mobile responsiveness
4. Test in multiple browsers

## 🐛 Bug Reports

### Before Reporting

1. **Check existing issues** for similar problems
2. **Test in different browsers** to isolate the issue
3. **Try the latest version** from the main branch
4. **Clear browser cache** and try again

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14.1]
- Device: [e.g., Desktop, Mobile]

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Before Requesting

1. **Check existing features** to avoid duplicates
2. **Consider the scope** and complexity
3. **Think about user experience**
4. **Consider technical feasibility**

### Feature Request Template

```markdown
**Feature Description**
Brief description of the requested feature

**Use Case**
Why this feature would be useful

**Proposed Implementation**
How you think it could be implemented

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Any other relevant information
```

## 🚀 Deployment Testing

### Local Testing

1. **Test all workflows**
   - Generate new post workflow
   - Create from existing post workflow
   - Workflow switching
   - Export functionality

2. **Test edge cases**
   - Empty forms
   - Invalid inputs
   - Network errors
   - Large images

3. **Performance testing**
   - Load times
   - Export times
   - Memory usage

### Cloudflare Workers Testing

1. **Deploy to test environment**
   ```bash
   npx wrangler deploy --env test
   ```

2. **Test API endpoints**
   - Bluesky API integration
   - Avatar proxy functionality
   - Error handling

3. **Test static assets**
   - Image loading
   - CSS/JS loading
   - CORS handling

## 📚 Resources

### Documentation
- [README.md](README.md) - Complete project documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CHANGELOG.md](CHANGELOG.md) - Version history

### External Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [html2canvas Documentation](https://html2canvas.hertzen.com/)
- [Bluesky API Documentation](https://atproto.com/lexicons/app-bsky)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

### Development Tools
- **Browser DevTools**: For debugging and testing
- **Lighthouse**: For performance and accessibility testing
- **W3C Validator**: For HTML validation
- **ESLint**: For JavaScript linting (if using build tools)

## 🤝 Community Guidelines

### Be Respectful
- Treat all contributors with respect
- Be constructive in feedback
- Help others learn and grow

### Be Helpful
- Answer questions when you can
- Share knowledge and resources
- Mentor new contributors

### Be Patient
- Development takes time
- Not all features can be implemented immediately
- Focus on quality over speed

## 📞 Getting Help

### Questions and Support
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Requests**: For code reviews and contributions

### Contact Information
- **Repository**: [bluesky-skeetgen](https://github.com/bluedog-consulting/bluesky-skeetgen)
- **Issues**: [GitHub Issues](https://github.com/bluedog-consulting/bluesky-skeetgen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bluedog-consulting/bluesky-skeetgen/discussions)

---

Thank you for contributing to the Bluesky Post Image Generator! Your contributions help make this tool better for everyone. 🚀