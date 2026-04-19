// Script to add dropdown fix to all HTML files
const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'contact.html',
    'migrate.html',
    'study.html',
    'visit.html',
    'work.html'
];

// Base directory
const baseDir = 'c:\\Users\\ujaga\\OneDrive\\Desktop\\visa';

// Process each file
htmlFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${file}:`, err);
            return;
        }
        
        // Add CSS link if not already present
        if (!data.includes('universal-dropdown-fix.css')) {
            data = data.replace(
                /<link[^>]*rel="stylesheet"[^>]*>/i,
                '$&\n    <link rel="stylesheet" href="universal-dropdown-fix.css">'
            );
        }
        
        // Add JS script if not already present
        if (!data.includes('universal-dropdown-fix.js')) {
            data = data.replace(
                /<script[^>]*src="[^"]*"[^>]*><\/script>/i,
                '$&\n    <script src="universal-dropdown-fix.js"></script>'
            );
        }
        
        // Write the updated file
        fs.writeFile(filePath, data, 'utf8', err => {
            if (err) {
                console.error(`Error writing ${file}:`, err);
                return;
            }
            console.log(`Updated ${file}`);
        });
    });
});