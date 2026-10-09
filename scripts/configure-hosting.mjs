import { writeFile } from 'node:fs/promises';
import { securityHeaders } from './security-headers.mjs';
const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  headers: [
    { source: '/(.*)', headers: Object.entries(securityHeaders).map(([key, value]) => ({ key, value })) },
    { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }
  ],
  rewrites: ['/','/about','/projects','/experience','/cv'].map(source => ({source, destination:'/index.html'})),
};
await writeFile(new URL('../vercel.json',import.meta.url), JSON.stringify(config,null,2)+'\n');
await writeFile(new URL('../public/_headers',import.meta.url), '/*\n'+Object.entries(securityHeaders).map(([key,value])=>`  ${key}: ${value}`).join('\n')+'\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
await writeFile(new URL('../public/_redirects',import.meta.url), ['/ /index.html 200','/about /index.html 200','/projects /index.html 200','/experience /index.html 200','/cv /index.html 200'].join('\n')+'\n');
