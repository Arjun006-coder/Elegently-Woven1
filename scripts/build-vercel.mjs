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
      // Cache static assets forever
      {
        src: '/assets/(.*)',
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        continue: true,
      },
      // Serve static files if they exist
      { handle: 'filesystem' },
      // All other routes → SSR edge function
      { src: '/(.*)', dest: '/' },
    ],
  };
  await fs.writeFile(
    path.join(vercelOutput, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('  ✓ config.json written');

  // --- 2. Configure the Edge Function ---
  const vcConfig = {
    runtime: 'edge',
    entrypoint: 'index.js',
  };
  await fs.writeFile(
    path.join(vercelOutput, 'functions', 'index.func', '.vc-config.json'),
    JSON.stringify(vcConfig, null, 2)
  );

  // --- 3. Copy all server assets into the edge function folder ---
  const funcDir = path.join(vercelOutput, 'functions', 'index.func');
  await copyDir(distServerAssets, path.join(funcDir, 'assets'));

  // Find the main bundled server file (e.g. server-DNy-hgyB.js)
  const serverAssets = await fs.readdir(distServerAssets);
  const mainServerFile = serverAssets.find(
    (f) => f.startsWith('server-') && f.endsWith('.js')
  );

  if (!mainServerFile) {
    throw new Error('Could not find bundled server file in dist/server/assets');
  }

  // --- 4. Write the edge function entry point ---
  // The main server file exports { default: { fetch(request, env, ctx) } }
  // which is exactly the Web Fetch API format Vercel Edge Runtime expects.
  const edgeFnContent = `export { default } from './assets/${mainServerFile}';`;
  await fs.writeFile(path.join(funcDir, 'index.js'), edgeFnContent);
  console.log(`  ✓ Edge function created (entry: ${mainServerFile})`);

  // --- 5. Copy all static client assets ---
  await copyDir(distClient, path.join(vercelOutput, 'static'));
  console.log('  ✓ Static assets copied');

  console.log('\n✅ .vercel/output ready for deployment!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
