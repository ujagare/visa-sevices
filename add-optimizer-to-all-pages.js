// Add Optimizer to All Pages
// This script adds the performance optimizer to all HTML files in the project
// Run this script using Node.js

const fs = require('fs');
const path = require('path');

// Directory where HTML files are located
const rootDir = __dirname;

// Optimizer script tag to add
const optimizerScript = `
    <!-- Performance Optimizer -->
    <script src="performance-optimizer.js"></script>`;

// Function to add optimizer to an HTML file
function addOptimizerToFile(filePath) {
  try {
    // Read the HTML file
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Skip if optimizer is already added
    if (html.includes('performance-optimizer.js')) {
      console.log(`Optimizer already added to ${filePath}`);
      return;
    }
    
    // Find the position to insert the optimizer
    // Look for the end of the meta tags or the beginning of the title tag
    const metaEndPos = html.lastIndexOf('</meta>');
    const titleStartPos = html.indexOf('<title>');
    const insertPos = metaEndPos > -1 ? metaEndPos + 7 : titleStartPos;
    
    if (insertPos === -1) {
      console.log(`Could not find insertion point in ${filePath}`);
      return;
    }
    
    // Insert the optimizer script
    const newHtml = html.slice(0, insertPos) + optimizerScript + html.slice(insertPos);
    
    // Write the modified HTML back to the file
    fs.writeFileSync(filePath, newHtml);
    
    console.log(`Added optimizer to ${filePath}`);
  } catch (error) {
    console.error(`Error adding optimizer to ${filePath}:`, error);
  }
}

// Function to process all HTML files in a directory
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
    } else if (path.extname(file) === '.html') {
      // Add optimizer to HTML files
      addOptimizerToFile(filePath);
    }
  });
}

// Start processing
console.log('Adding optimizer to all HTML files...');
processDirectory(rootDir);
console.log('Done adding optimizer to HTML files!');

// Note: To use this script, run:
// node add-optimizer-to-all-pages.js