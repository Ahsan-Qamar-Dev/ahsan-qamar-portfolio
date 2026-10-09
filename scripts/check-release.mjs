import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { securityHeaders } from './security-headers.mjs';
import assert from 'node:assert/strict';
const failures=[];
await mkdir('research', { recursive: true });
async function check(name, task) { try { await task();console.log(`PASS ${name}`); } catch(error) { failures.push(name);console.error(`FAIL ${name}: ${error.message}`); } }
async function walk(dir) { const items=[];for(const entry of await readdir(dir,{withFileTypes:true})) {const file=join(dir,entry.name);items.push(...entry.isDirectory()?await walk(file):[file]);}return items; }
const files=await walk('dist');
await check('Only publishable static files in dist',async()=>{
  const allowed=/^(index\.html|404\.html|theme\.js|favicon\.svg|ahsan-qamar-cv\.pdf|_headers|_redirects|assets\/[\w.-]+\.(js|css)|images\/[\w.-]+\.(png|jpg|webp)|fonts\/[\w.-]+\.(css|woff2|txt))$/;
  for(const file of files) assert.match(relative('dist',file).replaceAll('\\','/'),allowed);
});
await check('Font files have genuine WOFF2 signatures',async()=>{for(const file of files.filter(f=>f.endsWith('.woff2')))assert.equal((await readFile(file)).subarray(0,4).toString(),'wOF2');});
await check('No source maps or known credential patterns in release',async()=>{
  const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/AKIA[0-9A-Z]{16}/,/gh[pousr]_[A-Za-z0-9]{30,}/,/github_pat_[A-Za-z0-9_]{40,}/,/sk_live_[A-Za-z0-9]{20,}/,/AIza[0-9A-Za-z_-]{35}/,/eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/];
  for(const file of files) { assert(!file.endsWith('.map'));if(/\.(html|js|css|txt)$/.test(file)) {const content=await readFile(file,'utf8');for(const pattern of patterns)assert(!pattern.test(content),`Potential credential pattern in ${file}`);} }
});
await check('Production HTML uses only local resources and no inline script',async()=>{
  const html=await readFile('dist/index.html','utf8');assert(!/<(?:script|link|img)\b[^>]*(?:src|href)=["']https?:\/\//.test(html));assert(!/<script(?![^>]*\bsrc=)/.test(html));
});
await check('Deployment header configurations match policy',async()=>{
  const vercel=JSON.parse(await readFile('vercel.json','utf8'));const netlify=await readFile('dist/_headers','utf8');
  for(const [key,value] of Object.entries(securityHeaders)) {assert(vercel.headers[0].headers.some(h=>h.key===key&&h.value===value));assert(netlify.includes(`${key}: ${value}`));}
});
const base=process.env.AUDIT_URL ?? 'http://127.0.0.1:4173';
await check('All routes respond with HTML and security headers',async()=>{
  for(const route of ['/','/about','/projects','/experience','/cv']) {const res=await fetch(base+route);assert.equal(res.status,200);assert.match(res.headers.get('content-type'),/^text\/html/);for(const [key,value] of Object.entries(securityHeaders))assert.equal(res.headers.get(key),value);assert((await res.text()).includes('id="root"'));}
});
await check('Published assets return correct content types',async()=>{
  for(const file of files.filter(f=>!/[\\/]_(?:headers|redirects)$/.test(f))) {const path='/'+relative('dist',file).replaceAll('\\','/');const res=await fetch(base+path);assert.equal(res.status,200,path);assert(!res.headers.get('content-type')?.startsWith('text/html')||path.endsWith('.html'),path);if(path.endsWith('.pdf'))assert((await res.text()).startsWith('%PDF-'));}
});
await check('Private files and traversal requests do not expose files',async()=>{
  for(const path of ['/.env','/.git/config','/package.json','/src/data/portfolio.ts','/research/linkedin-notes.md','/scripts/security-headers.mjs','/assets/missing.js','/%2e%2e%2fpackage.json','/images/%2e%2e%2f%2e%2e%2fpackage.json']) {const res=await fetch(base+path);assert.equal(res.status,404,path);}
});
await check('Unexpected write methods rejected by local audit server',async()=>{assert.equal((await fetch(base+'/',{method:'POST'})).status,405);});
await writeFile('research/release-checks.json',JSON.stringify({date:new Date().toISOString(),base,failures,files:files.map(f=>relative('dist',f))},null,2));
if(failures.length)process.exitCode=1;
