// Image Optimizer CLI
// This script will optimize all images in the project
// Run this script using Node.js to optimize all images

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory where images are located
const imagesDir = path.join(__dirname, 'images');

// Output directory for optimized images
const outputDir = path.join(__dirname, 'images-optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization options
const jpgOptions = {
  quality: 80,
  progressive: true
};

const pngOptions = {
  quality: 80,
  compressionLevel: 9
};

const webpOptions = {
  quality: 80
};

const avifOptions = {
  quality: 65
};

// Function to optimize an image
async function optimizeImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath).toLowerCase();
    const fileDir = path.dirname(filePath);
    
    // Create relative directory structure in output directory
    const relativeDir = path.relative(imagesDir, fileDir);
    const outputFileDir = path.join(outputDir, relativeDir);
    
    if (!fs.existsSync(outputFileDir)) {
      fs.mkdirSync(outputFileDir, { recursive: true });
    }
    
    // Skip if file is already in the optimized directory
    if (filePath.includes('images-optimized')) {
      console.log(`Skipping already optimized file: ${filePath}`);
      return;
    }
    
    // Create Sharp instance
    const image = sharp(filePath);
    
    // Get image metadata
    const metadata = await image.metadata();
    
    // Output paths
    const outputFilePath = path.join(outputFileDir, fileName);
    const outputWebpPath = path.join(outputFileDir, `${path.parse(fileName).name}.webp`);
    const outputAvifPath = path.join(outputFileDir, `${path.parse(fileName).name}.avif`);
    
    // Optimize based on file type
    if (fileExt === '.jpg' || fileExt === '.jpeg') {
      await image.jpeg(jpgOptions).toFile(outputFilePath);
      await image.webp(webpOptions).toFile(outputWebpPath);
      await image.avif(avifOptions).toFile(outputAvifPath);
    } else if (fileExt === '.png') {
      await image.png(pngOptions).toFile(outputFilePath);
      await image.webp(webpOptions).toFile(outputWebpPath);
      await image.avif(avifOptions).toFile(outputAvifPath);
    } else if (fileExt === '.webp') {
      await image.webp(webpOptions).toFile(outputFilePath);
      await image.avif(avifOptions).toFile(outputAvifPath);
    } else {
      // Copy other files as is
      fs.copyFileSync(filePath, outputFilePath);
    }
    
    // Get file sizes
    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.existsSync(outputFilePath) ? fs.statSync(outputFilePath).size : 0;
    const webpSize = fs.existsSync(outputWebpPath) ? fs.statSync(outputWebpPath).size : 0;
    const avifSize = fs.existsSync(outputAvifPath) ? fs.statSync(outputAvifPath).size : 0;
    
    console.log(`Optimized ${filePath}`);
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    if (optimizedSize > 0) {
      console.log(`Optimized size: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize / originalSize) * 100).toFixed(2)}% reduction)`);
    }
    
    if (webpSize > 0) {
      console.log(`WebP size: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(2)}% reduction)`);
    }
    
    if (avifSize > 0) {
      console.log(`AVIF size: ${(avifSize / 1024).toFixed(2)} KB (${((1 - avifSize / originalSize) * 100).toFixed(2)}% reduction)`);
    }
    
    console.log('-----------------------------------');
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

// Function to process all images in a directory
async function processDirectory(directory) {
  // Read all files in the directory
  const files = fs.readdirSync(directory);
  
  // Process each file
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else {
      const fileExt = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(fileExt)) {
        // Optimize image
        await optimizeImage(filePath);
      }
    }
  }
}

// Start processing
(async () => {
  console.log('Starting image optimization...');
  await processDirectory(imagesDir);
  console.log('Image optimization complete!');
})();

// Note: To use this script, you need to install sharp:
// npm install sharp