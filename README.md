# White Wings Visa Consultancy Website

This repository contains the website code for White Wings Visa Consultancy, a visa services provider based in Pune, Maharashtra, India.

## Website Overview

The White Wings Visa Consultancy website is a professional, responsive website designed to showcase visa services for various countries including USA, Canada, UK, Australia, and more. The website includes:

- Home page with hero section, services overview, and testimonials
- About page with company information
- Service pages for different visa types (Study, Work, Visit, Migrate)
- Contact page with form submission
- Legal pages (Privacy Policy, Terms of Service, Cookie Policy)
- FAQ page with common visa-related questions

## Technical Features

- Responsive design for all device sizes
- Performance optimized with consolidated CSS and JS
- Accessibility improvements (ARIA attributes, skip links, focus states)
- SEO optimized with proper meta tags and semantic HTML
- Legal compliance with privacy policy, terms of service, and cookie consent
- Offline capabilities with service worker
- Security enhancements with Content Security Policy

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/ujagare/visa-sevices.git
   cd visa-sevices
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Generate favicons (optional):
   ```
   cd favicon
   node generate-favicon.js
   ```

## File Structure

- `index.html` - Main homepage
- `about.html` - About page
- `contact.html` - Contact page
- `study.html` - Study visa services page
- `work.html` - Work visa services page
- `visit.html` - Visit visa services page
- `migrate.html` - Migration services page
- `faq.html` - Frequently asked questions
- `privacy-policy.html` - Privacy policy page
- `terms-of-service.html` - Terms of service page
- `cookie-policy.html` - Cookie policy page
- `404.html` - Custom 404 error page
- `offline.html` - Offline page for service worker
- `consolidated-styles.css` - Combined CSS file
- `sw.js` - Service worker for offline capabilities
- `cookie-consent.js` - Cookie consent banner script
- `analytics.js` - Privacy-focused analytics script
- `content-security-policy.js` - CSP implementation
- `.htaccess` - Server configuration for Apache

## Production Deployment

1. Ensure all files are properly minified and optimized
2. Update the service worker version if needed
3. Test all forms and functionality
4. Verify all links are working correctly
5. Check for any console errors
6. Validate HTML and CSS
7. Test on multiple browsers and devices
8. Deploy to production server

## SEO Considerations

- Meta tags are properly set up for each page
- Canonical URLs are defined
- Semantic HTML structure is used
- Images have alt text
- Proper heading hierarchy is maintained
- Schema markup is implemented for local business
- robots.txt and sitemap.xml are included

## Performance Optimization

- CSS files are consolidated
- JavaScript files use defer attribute
- Images are in WebP format where possible
- Font display strategy is implemented
- Resource preloading is used for critical assets
- Browser caching is configured in .htaccess

## Security Features

- Content Security Policy is implemented
- HTTPS is enforced via .htaccess
- Security headers are set in .htaccess
- Forms use CSRF protection
- Input validation is implemented

## Accessibility Features

- Skip to content link
- ARIA attributes
- Proper focus states
- Semantic HTML
- Sufficient color contrast
- Keyboard navigation support

## Contact

For any questions or issues, please contact:
- Email: mrunal@whitewingsvisa.com
- Phone: +91 9130448831