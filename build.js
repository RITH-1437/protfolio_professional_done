// Build script to copy static assets into dist/ for Vercel.
// Email is handled server-side by api/send-email.js (Resend), so no
// environment variables need to be injected into the HTML.

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'index.html');
const outputDir = path.join(__dirname, 'dist');
const outputFile = path.join(outputDir, 'index.html');

// Create dist directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Copy the main HTML file
fs.copyFileSync(inputFile, outputFile);
console.log('✓ Copied index.html');

// Copy other files and the images folder to dist
const rootFilesToCopy = ['styles.css', 'script.js', 'robots.txt', 'sitemap.xml'];
rootFilesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(outputDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${file}`);
    } else {
        console.log(`⚠ Skipped ${file} (not found)`);
    }
});

// Copy asset folders (recursively) into dist/
['images', 'projects', 'assets'].forEach(dir => {
    const src = path.join(__dirname, dir);
    if (!fs.existsSync(src)) {
        console.log(`⚠ Skipped ${dir}/ (not found)`);
        return;
    }
    fs.cpSync(src, path.join(outputDir, dir), { recursive: true });
    console.log(`✓ Copied ${dir}/`);
});

console.log('✓ Build completed successfully!');
console.log('✓ Files written to dist/');
