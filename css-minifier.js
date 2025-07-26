// CSS Minifier
// This script will be used to minify CSS files
// Run this script using Node.js to minify all CSS files

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

// Directory where CSS files are located
const cssDir = __dirname;

// Options for CleanCSS
const options = {
  level: 2, // Advanced optimization level
  compatibility: 'ie11', // Ensure compatibility with IE11
  format: 'keep-breaks' // Keep line breaks for better readability
};

// Function to minify CSS
function minifyCSS(filePath) {
  try {
    // Read the CSS file
    const css = fs.readFileSync(filePath, 'utf8');
    
    // Skip if file is already minified
    if (filePath.includes('.min.css')) {
      console.log(`Skipping already minified file: ${filePath}`);
      return;
    }
    
    // Minify the CSS
    const minified = new CleanCSS(options).minify(css);
    
    // Create the minified file path
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, '.css');
    const minifiedFilePath = path.join(fileDir, `${fileName}.min.css`);
    
    // Write the minified CSS to a new file
    fs.writeFileSync(minifiedFilePath, minified.styles);
    
    console.log(`Minified ${filePath} -> ${minifiedFilePath}`);
    console.log(`Original size: ${(css.length / 1024).toFixed(2)} KB`);
    console.log(`Minified size: ${(minified.styles.length / 1024).toFixed(2)} KB`);
    console.log(`Saved: ${((css.length - minified.styles.length) / 1024).toFixed(2)} KB (${((1 - minified.styles.length / css.length) * 100).toFixed(2)}%)`);
    console.log('-----------------------------------');
  } catch (error) {
    console.error(`Error minifying ${filePath}:`, error);
  }
}

// Function to process all CSS files in a directory
function processDirectory(directory) {
  // Read all files in the directory
  const files = fs.readdirSync(directory);
  
  // Process each file
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (path.extname(file) === '.css' && !file.includes('.min.css')) {
      // Minify CSS files
      minifyCSS(filePath);
    }
  });
}

// Start processing
console.log('Starting CSS minification...');
processDirectory(cssDir);
console.log('CSS minification complete!');

// Note: To use this script, you need to install clean-css:
// npm install clean-css