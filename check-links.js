/**
 * Broken Link Checker for White Wings Visa Consultancy Website
 * 
 * This script checks for broken links in HTML files.
 * To use this script:
 * 1. Install Node.js
 * 2. Run: npm install cheerio node-fetch glob
 * 3. Run: node check-links.js
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const glob = require('glob');

// Configuration
const config = {
    baseUrl: 'https://whitewingsvisa.com', // Replace with your actual domain
    checkExternal: true,                   // Whether to check external links
    ignorePatterns: [                      // Patterns to ignore
        'tel:',
        'mailto:',
        'javascript:',
        'https://wa.me/',                  // WhatsApp links
        '#'                                // Anchor links
    ],
    htmlFiles: './**/*.html'               // Pattern to match HTML files
};

// Get all HTML files
const getHtmlFiles = () => {
    return new Promise((resolve, reject) => {
        glob(config.htmlFiles, { ignore: 'node_modules/**' }, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

// Extract links from HTML file
const extractLinks = (filePath) => {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);
    const links = [];
    
    // Get all links
    $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href) {
            links.push({
                href,
                text: $(el).text().trim(),
                file: filePath
            });
        }
    });
    
    // Get all image sources
    $('img').each((i, el) => {
        const src = $(el).attr('src');
        if (src) {
            links.push({
                href: src,
                text: $(el).attr('alt') || 'Image',
                file: filePath
            });
        }
    });
    
    return links;
};

// Check if a link should be ignored
const shouldIgnore = (url) => {
    return config.ignorePatterns.some(pattern => url.startsWith(pattern));
};

// Check if a link is internal
const isInternal = (url) => {
    return !url.startsWith('http') && !url.startsWith('//');
};

// Check if a file exists
const fileExists = (filePath) => {
    try {
        // Handle anchor links
        const parts = filePath.split('#');
        const file = parts[0];
        
        // Handle empty links (current page)
        if (file === '') {
            return true;
        }
        
        // Check if file exists
        return fs.existsSync(path.resolve(file));
    } catch (error) {
        return false;
    }
};

// Check if an external URL is valid
const checkExternalUrl = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
        return response.ok;
    } catch (error) {
        return false;
    }
};

// Main function to check links
const checkLinks = async () => {
    try {
        console.log('Starting link check...');
        
        // Get all HTML files
        const files = await getHtmlFiles();
        console.log(`Found ${files.length} HTML files`);
        
        // Extract links from all files
        let allLinks = [];
        files.forEach(file => {
            const links = extractLinks(file);
            allLinks = [...allLinks, ...links];
        });
        
        console.log(`Found ${allLinks.length} links to check`);
        
        // Check each link
        const brokenLinks = [];
        const checkedUrls = new Set();
        
        for (const link of allLinks) {
            const { href, text, file } = link;
            
            // Skip ignored links
            if (shouldIgnore(href)) {
                continue;
            }
            
            // Skip already checked URLs
            if (checkedUrls.has(href)) {
                continue;
            }
            
            checkedUrls.add(href);
            
            // Check internal links
            if (isInternal(href)) {
                if (!fileExists(href)) {
                    brokenLinks.push({ href, text, file, reason: 'File not found' });
                }
            } 
            // Check external links if enabled
            else if (config.checkExternal) {
                process.stdout.write(`Checking external link: ${href} ... `);
                const isValid = await checkExternalUrl(href);
                
                if (!isValid) {
                    brokenLinks.push({ href, text, file, reason: 'External link not accessible' });
                    process.stdout.write('❌\n');
                } else {
                    process.stdout.write('✅\n');
                }
            }
        }
        
        // Print results
        console.log('\n--- Link Check Results ---');
        console.log(`Total links checked: ${checkedUrls.size}`);
        console.log(`Broken links found: ${brokenLinks.length}`);
        
        if (brokenLinks.length > 0) {
            console.log('\nBroken Links:');
            brokenLinks.forEach((link, index) => {
                console.log(`\n${index + 1}. ${link.href}`);
                console.log(`   Text: "${link.text}"`);
                console.log(`   File: ${link.file}`);
                console.log(`   Reason: ${link.reason}`);
            });
        } else {
            console.log('\n✅ No broken links found!');
        }
        
    } catch (error) {
        console.error('Error checking links:', error);
    }
};

// Run the link checker
checkLinks();