/**
 * Favicon Generator Script for White Wings Visa Consultancy
 * 
 * This script generates favicon files from the logo image.
 * To use this script:
 * 1. Install Node.js
 * 2. Run: npm install sharp
 * 3. Run: node generate-favicon.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source logo path
const logoPath = path.join(__dirname, '..', 'images', 'logo', 'WING LOGO.png');

// Favicon sizes to generate
const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon.ico', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-150x150.png', size: 150 }
];

// Create favicon directory if it doesn't exist
if (!fs.existsSync(__dirname)) {
    fs.mkdirSync(__dirname, { recursive: true });
}

// Generate favicon files
async function generateFavicons() {
    try {
        console.log('Starting favicon generation...');
        
        for (const { name, size } of sizes) {
            const outputPath = path.join(__dirname, name);
            
            console.log(`Generating ${name} (${size}x${size})...`);
            
            await sharp(logoPath)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .toFile(outputPath);
                
            console.log(`✅ Generated ${name}`);
        }
        
        // Generate safari-pinned-tab.svg (monochrome SVG)
        const svgPath = path.join(__dirname, 'safari-pinned-tab.svg');
        
        await sharp(logoPath)
            .resize(512, 512)
            .threshold(128)
            .toFile(svgPath);
            
        console.log('✅ Generated safari-pinned-tab.svg');
        
        console.log('Favicon generation complete!');
        
    } catch (error) {
        console.error('Error generating favicons:', error);
    }
}

// Run the generator
generateFavicons();