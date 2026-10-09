// Run only when intentionally updating the self-hosted Google Fonts assets.
import { mkdir, writeFile } from 'node:fs/promises';
const root = new URL('../public/fonts/', import.meta.url);
await mkdir(root, { recursive: true });
const response = await fetch('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400..700&family=Instrument+Serif:ital@0;1&display=swap', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' }
});
if (!response.ok) throw new Error(`Font CSS: ${response.status}`);
let css = await response.text();
const urls = [...new Set([...css.matchAll(/https:\/\/fonts\.gstatic\.com\/[^)]+/g)].map(match => match[0]))];
for (const [index, url] of urls.entries()) {
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font asset: ${font.status}`);
  const name = `font-${index}.woff2`;
  const bytes = Buffer.from(await font.arrayBuffer());
  if (bytes.subarray(0,4).toString() !== 'wOF2') throw new Error('Expected WOFF2 font data');
  await writeFile(new URL(name, root), bytes);
  css = css.replaceAll(url, `/fonts/${name}`);
}
await writeFile(new URL('fonts.css', root), css);
for (const family of ['dmsans', 'instrumentserif']) {
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if (!license.ok) throw new Error(`Font license: ${license.status}`);
  await writeFile(new URL(`${family}-OFL.txt`, root), await license.text());
}
console.log(`Saved ${urls.length} local font files with OFL licenses.`);
