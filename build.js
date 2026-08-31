// Build script to inject environment variables into index.html
const fs = require('fs');
const path = require('path');

// Load .env file for local development (ignored in production where env vars are set by the host)
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not installed — environment variables must be set externally (e.g. Vercel dashboard)
}

const inputFile = path.join(__dirname, 'index.html');
const outputDir = path.join(__dirname, 'dist');
const outputFile = path.join(outputDir, 'index.html');

// Validate required environment variables
const required = ['EMAILJS_PUBLIC_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID'];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) {
    console.error('✗ Missing required environment variables:', missing.join(', '));
    console.error('  Set them in Vercel Dashboard → Project → Settings → Environment Variables');
    process.exit(1);
}

// Read the template
let html = fs.readFileSync(inputFile, 'utf8');

// Replace placeholders with environment variables
html = html.replace(/\{\{EMAILJS_PUBLIC_KEY\}\}/g, process.env.EMAILJS_PUBLIC_KEY);
html = html.replace(/\{\{EMAILJS_SERVICE_ID\}\}/g, process.env.EMAILJS_SERVICE_ID);
html = html.replace(/\{\{EMAILJS_TEMPLATE_ID\}\}/g, process.env.EMAILJS_TEMPLATE_ID);

// Create dist directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the processed file
fs.writeFileSync(outputFile, html);

// Copy other files and the images folder to dist
const rootFilesToCopy = ['styles.css', 'script.js', 'README.md'];
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

const imagesSrc = path.join(__dirname, 'images');
const imagesDest = path.join(outputDir, 'images');
if (fs.existsSync(imagesSrc)) {
    if (!fs.existsSync(imagesDest)) fs.mkdirSync(imagesDest, { recursive: true });
    fs.readdirSync(imagesSrc).forEach(file => {
        fs.copyFileSync(path.join(imagesSrc, file), path.join(imagesDest, file));
    });
    console.log('✓ Copied images/');
} else {
    console.log('⚠ Skipped images/ (not found)');
}

console.log('✓ Build completed successfully!');
console.log('✓ Files written to dist/');
