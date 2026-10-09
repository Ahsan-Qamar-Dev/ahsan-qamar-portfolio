// Local-only production verification; use a managed static host for deployment.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { securityHeaders } from './security-headers.mjs';
const root = resolve('dist');
const routes = new Set(['/','/about','/projects','/experience','/cv']);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
createServer(async (req,res) => {
  Object.entries(securityHeaders).forEach(([key,value]) => res.setHeader(key,value));
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return; }
  try {
    const path = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const file = resolve(root, routes.has(path) ? 'index.html' : '.'+path);
    if (!file.startsWith(root+sep) || /(?:^|\/)\./.test(path)) {res.writeHead(404);res.end();return;}
    if (!(await stat(file)).isFile()) {res.writeHead(404);res.end();return;}
    const data=await readFile(file);
    res.setHeader('Content-Type',types[extname(file)] ?? 'application/octet-stream');
    res.setHeader('Content-Length',data.length);
    res.setHeader('Cache-Control',path.startsWith('/assets/') ? 'public, max-age=31536000, immutable':'no-cache');
    res.writeHead(200);res.end(req.method==='HEAD'?undefined:data);
  } catch {res.writeHead(404);res.end();}
}).listen(4173,'127.0.0.1',()=>console.log('Production audit: http://127.0.0.1:4173'));
