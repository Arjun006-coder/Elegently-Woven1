import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('🔧 Transforming build output for Vercel...');

  const vercelOutput = path.join(root, '.vercel', 'output');
  const distClient = path.join(root, 'dist', 'client');
  const distServerAssets = path.join(root, 'dist', 'server', 'assets');

  // Clean previous output
  await fs.rm(vercelOutput, { recursive: true, force: true });
  await fs.mkdir(path.join(vercelOutput, 'functions', 'index.func'), { recursive: true });
  await fs.mkdir(path.join(vercelOutput, 'static'), { recursive: true });

  // --- 1. Write Vercel routing config ---
  const config = {
    version: 3,
    routes: [
      {
        src: '/assets/(.*)',
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        continue: true,
      },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/' },
    ],
  };
  await fs.writeFile(
    path.join(vercelOutput, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('  ✓ config.json written');

  // --- 2. Configure the Node.js Serverless Function ---
  const vcConfig = {
    runtime: 'nodejs20.x',
    handler: 'index.js',
    launcherType: 'Nodejs',
  };
  await fs.writeFile(
    path.join(vercelOutput, 'functions', 'index.func', '.vc-config.json'),
    JSON.stringify(vcConfig, null, 2)
  );

  // --- 3. Copy all server assets into the function folder ---
  const funcDir = path.join(vercelOutput, 'functions', 'index.func');
  await copyDir(distServerAssets, path.join(funcDir, 'assets'));

  // Find the main bundled server file
  const serverAssets = await fs.readdir(distServerAssets);
  const mainServerFile = serverAssets.find(
    (f) => f.startsWith('server-') && f.endsWith('.js')
  );

  if (!mainServerFile) {
    throw new Error('Could not find bundled server file in dist/server/assets');
  }

  // --- 4. Copy package.json into the function so Vercel installs dependencies ---
  const rootPkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf-8'));
  // Only include production dependencies + type:module
  const funcPkg = {
    name: rootPkg.name,
    type: 'module',
    dependencies: rootPkg.dependencies,
  };
  await fs.writeFile(
    path.join(funcDir, 'package.json'),
    JSON.stringify(funcPkg, null, 2)
  );
  console.log('  ✓ package.json written to function (Vercel will install deps)');

  // --- 5. Write Node.js handler that bridges req/res → Web Fetch API ---
  const handlerContent = `
import { Readable } from 'stream';

let serverPromise;
function getServer() {
  if (!serverPromise) {
    serverPromise = import('./assets/${mainServerFile}').then(m => m.default ?? m);
  }
  return serverPromise;
}

async function toWebRequest(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url, \`\${protocol}://\${host}\`);

  const headers = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val) headers.set(key, Array.isArray(val) ? val.join(', ') : val);
  }

  const method = req.method || 'GET';
  const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());

  let body = null;
  if (hasBody) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks);
  }

  return new Request(url.toString(), { method, headers, body });
}

async function sendWebResponse(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => res.setHeader(key, value));
  const buf = Buffer.from(await webRes.arrayBuffer());
  res.end(buf);
}

export default async function handler(req, res) {
  try {
    const server = await getServer();
    const webRequest = await toWebRequest(req);
    const webResponse = await server.fetch(webRequest, {}, {});
    await sendWebResponse(webResponse, res);
  } catch (err) {
    console.error('[SSR Error]', err);
    res.statusCode = 500;
    res.end('<h1>Internal Server Error</h1>');
  }
}
`.trim();

  await fs.writeFile(path.join(funcDir, 'index.js'), handlerContent);
  console.log(`  ✓ Node.js SSR function created (server: ${mainServerFile})`);

  // --- 6. Copy all static client assets ---
  await copyDir(distClient, path.join(vercelOutput, 'static'));
  console.log('  ✓ Static assets copied');

  console.log('\n✅ .vercel/output ready for deployment!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
