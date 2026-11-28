// Build script to minify CSS/JS and copy static assets into dist/ for Vercel.
// Email is handled server-side by api/send-email.js (Resend), so no
// environment variables need to be injected into the HTML.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const outputDir = path.join(root, 'dist');

function tokenize(src, detectRegex) {
    const tokens = [];
    const modes = [];
    let i = 0;

    const isRegexStart = () => {
        let s = '';
        for (let k = tokens.length - 1; k >= 0 && s.length < 16; k--) {
            const t = tokens[k];
            if (t.type === 'ws' || t.type === 'comment') continue;
            s = t.value + s;
        }
        if (/(\+\+|--)$/.test(s)) return false;
        return /(^|[(\[{,:;=!&|?+\-*%~^<>])$/.test(s) ||
            /\b(return|typeof|case|delete|void|in|of|new|else|do|throw|yield|await)$/.test(s);
    };

    while (i < src.length) {
        const mode = modes.length ? modes[modes.length - 1].type : 'code';
        const c = src[i];
        const n = src[i + 1];

        if (mode === 'line') {
            if (c === '\n') {
                modes.pop();
                tokens.push({ type: 'ws', value: '\n' });
            }
            i++;
            continue;
        }
        if (mode === 'block') {
            if (c === '*' && n === '/') {
                modes.pop();
                i += 2;
                tokens.push({ type: 'ws', value: ' ' });
            } else {
                i++;
            }
            continue;
        }
        if (mode === 'single' || mode === 'double' || mode === 'regex' || mode === 'template') {
            const frame = modes[modes.length - 1];
            if (c === '\\') {
                tokens.push({ type: 'raw', value: c + (n ?? '') });
                i += 2;
                continue;
            }
            if (mode === 'regex') {
                if (c === '[') frame.inClass = true;
                else if (c === ']') frame.inClass = false;
            }
            if (mode === 'template' && c === '$' && n === '{') {
                tokens.push({ type: 'raw', value: '${' });
                modes.push({ type: 'expr', braces: 0 });
                i += 2;
                continue;
            }
            const closes =
                (mode === 'single' && c === "'") ||
                (mode === 'double' && c === '"') ||
                (mode === 'regex' && c === '/' && !frame.inClass) ||
                (mode === 'template' && c === '`');
            tokens.push({ type: 'raw', value: c });
            if (closes) modes.pop();
            i++;
            continue;
        }
        if (mode === 'expr') {
            if (c === '/' && n === '/') { modes.push({ type: 'line' }); i += 2; continue; }
            if (c === '/' && n === '*') { modes.push({ type: 'block' }); i += 2; continue; }
            if (c === "'" || c === '"' || c === '`') {
                modes.push({ type: c === '`' ? 'template' : c === "'" ? 'single' : 'double' });
                tokens.push({ type: 'raw', value: c });
                i++;
                continue;
            }
            if (detectRegex && c === '/' && isRegexStart()) {
                modes.push({ type: 'regex', inClass: false });
                tokens.push({ type: 'raw', value: c });
                i++;
                continue;
            }
            if (c === '{') { modes[modes.length - 1].braces++; tokens.push({ type: 'code', value: c }); i++; continue; }
            if (c === '}') {
                if (modes[modes.length - 1].braces === 0) {
                    modes.pop();
                    tokens.push({ type: 'raw', value: '}' });
                } else {
                    modes[modes.length - 1].braces--;
                    tokens.push({ type: 'code', value: c });
                }
                i++;
                continue;
            }
            if (/\s/.test(c)) {
                let j = i;
                let hasNewline = false;
                while (j < src.length && /\s/.test(src[j])) {
                    if (src[j] === '\n') hasNewline = true;
                    j++;
                }
                tokens.push({ type: 'ws', value: hasNewline ? '\n' : ' ' });
                i = j;
                continue;
            }
            tokens.push({ type: 'code', value: c });
            i++;
            continue;
        }

        // Top-level code
        if (detectRegex && c === '/' && n === '/') { modes.push({ type: 'line' }); i += 2; continue; }
        if (c === '/' && n === '*') { modes.push({ type: 'block' }); i += 2; continue; }
        if (c === "'" || c === '"' || c === '`') {
            modes.push({ type: c === '`' ? 'template' : c === "'" ? 'single' : 'double' });
            tokens.push({ type: 'raw', value: c });
            i++;
            continue;
        }
        if (detectRegex && c === '/' && isRegexStart()) {
            modes.push({ type: 'regex', inClass: false });
            tokens.push({ type: 'raw', value: c });
            i++;
            continue;
        }
        if (/\s/.test(c)) {
            let j = i;
            let hasNewline = false;
            while (j < src.length && /\s/.test(src[j])) {
                if (src[j] === '\n') hasNewline = true;
                j++;
            }
            tokens.push({ type: 'ws', value: hasNewline ? '\n' : ' ' });
            i = j;
            continue;
        }
        tokens.push({ type: 'code', value: c });
        i++;
    }
    return tokens;
}

function mapCodeSegments(tokens, transformCode) {
    const parts = [];
    let buf = '';
    for (const t of tokens) {
        if (t.type === 'raw') {
            if (buf) {
                parts.push(transformCode(buf));
                buf = '';
            }
            parts.push(t.value);
        } else if (t.type !== 'comment') {
            buf += t.value;
        }
    }
    if (buf) parts.push(transformCode(buf));
    return parts.join('').trim();
}

function minifyCSS(src) {
    return mapCodeSegments(tokenize(src, false), (code) =>
        code
            .replace(/\s+/g, ' ')
            .replace(/\s*([{};,>])\s*/g, '$1')
            .replace(/:\s+/g, ':')
            .replace(/;}/g, '}')
    );
}

function minifyJS(src, label) {
    const out = mapCodeSegments(tokenize(src, true), (code) =>
        code
            .replace(/[ \t]+/g, ' ')
            .replace(/[ \t]*\n[ \t]*/g, '\n')
            .replace(/([(\[{,;])\s+/g, '$1')
            .replace(/\s+([)\]},;])/g, '$1')
            .replace(/[ \t]+:/g, ':')
            .replace(/:[ \t]+/g, ':')
    );
    try {
        new Function(out);
        new vm.Script(out, { filename: label });
    } catch (err) {
        throw new Error(`Minified JS failed syntax check (${label}): ${err.message}`);
    }
    return out + '\n';
}

const stats = [];
function writeMinified(srcRel, destRel) {
    const srcPath = path.join(root, srcRel);
    const destPath = path.join(root, destRel);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const src = fs.readFileSync(srcPath, 'utf8');
    const ext = path.extname(srcRel).toLowerCase();
    const min = ext === '.css' ? minifyCSS(src) + '\n' : minifyJS(src, srcRel);
    fs.writeFileSync(destPath, min, 'utf8');
    const beforeBytes = Buffer.byteLength(src, 'utf8');
    const afterBytes = Buffer.byteLength(min, 'utf8');
    const pct = Math.max(0, 100 - Math.round((afterBytes / beforeBytes) * 100));
    stats.push({ file: srcRel, beforeBytes, afterBytes, pct });
    console.log(`✓ Minified ${srcRel} -> ${destRel} (${(beforeBytes / 1024).toFixed(2)} KB → ${(afterBytes / 1024).toFixed(2)} KB, ${pct}% smaller)`);
}

function copyDirWithMinification(srcDir, destDir, relPrefix = '') {
    fs.mkdirSync(destDir, { recursive: true });
    for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
        const srcEntry = path.join(srcDir, entry.name);
        const destEntry = path.join(destDir, entry.name);
        const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            copyDirWithMinification(srcEntry, destEntry, relPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === '.css' || ext === '.js') {
                writeMinified(relPath, `dist/${relPath}`);
            } else {
                fs.copyFileSync(srcEntry, destEntry);
            }
        }
    }
}

fs.mkdirSync(outputDir, { recursive: true });

// Copy the main HTML file
fs.copyFileSync(path.join(root, 'index.html'), path.join(outputDir, 'index.html'));
console.log('✓ Copied index.html');

// Minify root CSS & JS into dist/
for (const file of ['styles.css', 'i18n.js', 'script.js']) {
    if (fs.existsSync(path.join(root, file))) {
        writeMinified(file, `dist/${file}`);
    } else {
        console.log(`⚠ Skipped ${file} (not found)`);
    }
}

// Copy static root metadata files
for (const file of ['robots.txt', 'sitemap.xml']) {
    const srcPath = path.join(root, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(outputDir, file));
        console.log(`✓ Copied ${file}`);
    } else {
        console.log(`⚠ Skipped ${file} (not found)`);
    }
}

// Copy asset folders (images & assets verbatim; projects minifies CSS/JS)
for (const dir of ['images', 'assets']) {
    const src = path.join(root, dir);
    if (!fs.existsSync(src)) {
        console.log(`⚠ Skipped ${dir}/ (not found)`);
        continue;
    }
    fs.cpSync(src, path.join(outputDir, dir), { recursive: true });
    console.log(`✓ Copied ${dir}/`);
}

const projectsDir = path.join(root, 'projects');
if (fs.existsSync(projectsDir)) {
    copyDirWithMinification(projectsDir, path.join(outputDir, 'projects'), 'projects');
    console.log('✓ Processed projects/ (HTML copied, CSS/JS minified)');
}

console.log('✓ Build completed successfully!');
console.log('✓ Files written to dist/');
