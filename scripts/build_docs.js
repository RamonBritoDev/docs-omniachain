import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup paths to be compatible with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../docs');
const OUTPUT_FILE = path.resolve(__dirname, '../src/assets/docsData.json');

// We want to treat the base /docs as 'pt' since it's the original language
// And the translated output folders (/en, /es) as their respective languages
const TARGET_LANGUAGES = ['pt', 'en', 'es', 'ru', 'zh'];

// Function to recursively read all markdown files in a directory
function getFilesRecursively(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Don't recurse into language folders when starting from the root pt /docs
            if (dir === DOCS_DIR && TARGET_LANGUAGES.includes(file) && file !== 'pt') {
                continue;
            }
            getFilesRecursively(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function buildIndex() {
    const docsData = {};

    // Initialize language objects
    TARGET_LANGUAGES.forEach(lang => {
        docsData[lang] = {};
    });

    console.log('Building Docs Index...');

    for (const lang of TARGET_LANGUAGES) {
        // If lang is 'pt', read the root docs folder (filtering out other lang folders)
        // Else read docs/lang/
        const targetDir = lang === 'pt' ? DOCS_DIR : path.join(DOCS_DIR, lang);

        // Some folders might not exist yet if the translation script hasn't finished
        if (!fs.existsSync(targetDir)) {
            console.warn(`[Warning] Language directory not found: ${targetDir}`);
            continue;
        }

        const mdFiles = getFilesRecursively(targetDir);
        let count = 0;

        for (const filePath of mdFiles) {
            // Create a nice key based on the relative path: e.g. 'agents/react'
            // We strip the extension and normalize slashes
            let relativePath = path.relative(targetDir, filePath);
            relativePath = relativePath.replace(/\\/g, '/').replace('.md', '');

            // Special case: index.md should map to root /docs
            if (relativePath === 'index') relativePath = 'introduction';

            let content = fs.readFileSync(filePath, 'utf-8');
            content = content.replace(/\r\n/g, '\n');

            // --- MkDocs to Standard Markdown Parsing ---
            // 1. Convert Tabs: === "Title" followed by indented lines (even if nested)
            // We strip all indentation so they don't get trapped as literal `<pre>` codeblocks in standard Markdown.
            content = content.replace(/^[ \t]*===\s+"([^"]+)"[ \t]*\n((?:[ \t]*\n|(?![ \t]*===\s)[ \t]+.*(?:\n|$))*)/gm, (match, title, body) => {
                const header = `#### ${title}`;
                // Strip all leading spaces from every line in the body
                const cleanBody = body.replace(/^[ \t]+/gm, '');
                return `${header}\n${cleanBody}\n`;
            });

            // 2. Convert Admonitions: !!! type "Title" followed by indented lines
            // We convert them to standard Markdown blockquotes
            content = content.replace(/^!!!\s+([a-z]+)(?:\s+"([^"]+)")?\s*\n((?:[ \t]+.*\n?)*)/gm, (match, type, title, body) => {
                const header = title ? `**${title}**` : `**${type.toUpperCase()}**`;
                // Dedent the body by 4 spaces and prefix with >
                const cleanBody = body.replace(/^[ \t]{4}/gm, '> ').replace(/^[ \t]+/gm, '> ');
                return `> ${header}\n>\n${cleanBody}\n`;
            });

            // 3. Fix HTML Grid Cards: Remove the wrapper div and let it be a normal list
            content = content.replace(/<div class="grid cards" markdown>\s*/g, '');
            content = content.replace(/<\/div>\s*/g, '');

            // 4. Emojis like :rocket: are handled by remark-gemoji!

            // Simple parse to grab the first H1 as title, otherwise default
            let title = 'Document';
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                title = titleMatch[1];
            }

            docsData[lang][relativePath] = {
                title: title,
                content: content
            };

            count++;
        }
        console.log(`Indexed ${count} files for language '${lang}'.`);
    }

    // Ensure output directory exists
    const outDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docsData, null, 2));
    console.log(`Docs indexing complete! Exported to ${OUTPUT_FILE}`);
}

buildIndex();
