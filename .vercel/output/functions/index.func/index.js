import { Readable } from 'stream';

let serverPromise;
function getServer() {
  if (!serverPromise) {
    serverPromise = import('./assets/server-DNy-hgyB.js').then(m => m.default ?? m);
  }
  return serverPromise;
}

async function toWebRequest(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url, `${protocol}://${host}`);

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