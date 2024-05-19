import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

process.on('unhandledRejection', err => {
    console.error('unhandledRejection error:', err);
    process.exit(1);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FOLDER = path.join(__dirname, 'dist');
const FILES_FOR_DOWNLOAD = { 'https://a1iberryfilms.pages.dev/films/films_stream': 'films_stream.json', 'https://a1iberryfilms.pages.dev/films/films_all': 'films_all.json' };

try {
    if (fs.existsSync(OUT_FOLDER)) {
        fs.rmSync(OUT_FOLDER, { recursive: true });
    }
    fs.mkdirSync(OUT_FOLDER);

    for (const url in FILES_FOR_DOWNLOAD) {
        console.log(`Downloading file "${url}" ...`);
        const res = await fetch(url);
        const j = await res.json();
        const fname = path.join(OUT_FOLDER, FILES_FOR_DOWNLOAD[url]);
        fs.writeFileSync(fname, JSON.stringify(j, null, 2) + '\n', 'utf-8');
    }

    console.log('Done');
} catch (err) {
    console.error(err);
    process.exit(1);
}
