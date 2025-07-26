/**
 * Image Optimizer for White Wings Visa Consultancy Website
 * 
 * This script optimizes images by converting them to WebP format and resizing them.
 * To use this script:
 * 1. Install Node.js
 * 2. Run: npm install sharp glob
 * 3. Run: node optimize-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

// Configuration
const config = {
    // Image patterns to optimize
    patterns: [
        './images/**/*.{jpg,jpeg,png}',
        '!./images/**/*.webp'
    ],
    // Output directory for optimized images
    outputDir: './images/optimized',
    // Image sizes to generate
    sizes: [
        { width: 1920, suffix: 'large' },
        { width: 1280, suffix: 'medium' },
        { width: 640, suffix: 'small' },
        { width: 320, suffix: 'thumbnail' }
    ],
    // WebP quality (0-100)
    quality: 80
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all images matching the patterns
const getImages = () => {
    return new Promise((resolve, reject) => {
        glob(config.patterns, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

// Optimize a single image
const optimizeImage = async (imagePath) => {
    try {
        const filename = path.basename(imagePath, path.extname(imagePath));
        const imageDir = path.dirname(imagePath);
        const relativePath = path.relative('.', imageDir);
        const outputPath = path.join(config.outputDir, relativePath);
        
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        
        // Get image metadata
        const metadata = await sharp(imagePath).metadata();
        
        // Generate WebP versions in different sizes
        for (const size of config.sizes) {
            // Skip if the original image is smaller than the target size
            if (metadata.width <= size.width) {
                continue;
            }
            
            const outputFilename = `${filename}-${size.suffix}.webp`;
            const outputFilePath = path.join(outputPath, outputFilename);
            
            await sharp(imagePath)
                .resize(size.width)
                .webp({ quality: config.quality })
                .toFile(outputFilePath);
                
            console.log(`✅ Generated ${outputFilename}`);
        }
        
        // Generate original size WebP version
        const originalWebp = path.join(outputPath, `${filename}.webp`);
        await sharp(imagePath)
            .webp({ quality: config.quality })
            .toFile(originalWebp);
            
        console.log(`✅ Generated ${filename}.webp`);
        
        return true;
    } catch (error) {
        console.error(`❌ Error optimizing ${imagePath}:`, error);
        return false;
    }
};

// Main function to optimize all images
const optimizeImages = async () => {
    try {
        console.log('Starting image optimization...');
        
        // Get all images
        const images = await getImages();
        console.log(`Found ${images.length} images to optimize`);
        
        // Optimize each image
        let successCount = 0;
        let failCount = 0;
        
        for (const image of images) {
            process.stdout.write(`Optimizing ${image} ... `);
            const success = await optimizeImage(image);
            
            if (success) {
                successCount++;
                process.stdout.write('✅\n');
            } else {
                failCount++;
                process.stdout.write('❌\n');
            }
        }
        
        // Print results
        console.log('\n--- Image Optimization Results ---');
        console.log(`Total images: ${images.length}`);
        console.log(`Successfully optimized: ${successCount}`);
        console.log(`Failed: ${failCount}`);
        
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
};

// Run the image optimizer
optimizeImages();