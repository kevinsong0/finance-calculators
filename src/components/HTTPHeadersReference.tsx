'use client'

export default function HTTPHeadersReference() {
  const requestHeaders = [
    { name: 'Accept', desc: 'Content types client accepts', example: 'Accept: text/html, application/json' },
    { name: 'Accept-Encoding', desc: 'Compression methods supported', example: 'Accept-Encoding: gzip, deflate, br' },
    { name: 'Accept-Language', desc: 'Preferred languages', example: 'Accept-Language: en-US, en;q=0.9' },
    { name: 'Authorization', desc: 'Authentication credentials', example: 'Authorization: Bearer token123' },
    { name: 'Cache-Control', desc: 'Cache directives', example: 'Cache-Control: no-cache' },
    { name: 'Content-Type', desc: 'Request body media type', example: 'Content-Type: application/json' },
    { name: 'Cookie', desc: 'Send stored cookies', example: 'Cookie: session=abc123' },
    { name: 'Host', desc: 'Target server domain', example: 'Host: example.com' },
    { name: 'Origin', desc: 'Request origin for CORS', example: 'Origin: https://client.com' },
    { name: 'Referer', desc: 'Previous page URL', example: 'Referer: https://example.com/page' },
    { name: 'User-Agent', desc: 'Client software info', example: 'User-Agent: Mozilla/5.0...' },
  ];

  const responseHeaders = [
    { name: 'Access-Control-Allow-Origin', desc: 'CORS allowed origins', example: 'Access-Control-Allow-Origin: *' },
    { name: 'Cache-Control', desc: 'Response caching rules', example: 'Cache-Control: max-age=3600' },
    { name: 'Content-Encoding', desc: 'Compression applied', example: 'Content-Encoding: gzip' },
    { name: 'Content-Length', desc: 'Response body size', example: 'Content-Length: 1234' },
    { name: 'Content-Type', desc: 'Response media type', example: 'Content-Type: application/json' },
    { name: 'ETag', desc: 'Resource version identifier', example: 'ETag: "abc123"' },
    { name: 'Location', desc: 'Redirect URL', example: 'Location: https://example.com/new' },
    { name: 'Set-Cookie', desc: 'Send cookie to client', example: 'Set-Cookie: session=xyz; Path=/' },
    { name: 'Status', desc: 'Response status', example: 'Status: 200 OK' },
    { name: 'Strict-Transport-Security', desc: 'HTTPS enforcement', example: 'Strict-Transport-Security: max-age=31536000' },
    { name: 'X-Content-Type-Options', desc: 'MIME type sniffing block', example: 'X-Content-Type-Options: nosniff' },
    { name: 'X-Frame-Options', desc: 'iframe embedding control', example: 'X-Frame-Options: DENY' },
  ];

  const securityHeaders = [
    { name: 'Content-Security-Policy', desc: 'Restrict resource sources', example: 'Content-Security-Policy: default-src self' },
    { name: 'Strict-Transport-Security', desc: 'Force HTTPS', example: 'Strict-Transport-Security: max-age=31536000' },
    { name: 'X-Content-Type-Options', desc: 'Block MIME sniffing', example: 'X-Content-Type-Options: nosniff' },
    { name: 'X-Frame-Options', desc: 'Block iframe embedding', example: 'X-Frame-Options: DENY' },
    { name: 'X-XSS-Protection', desc: 'XSS filter (deprecated)', example: 'X-XSS-Protection: 0' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTTP Headers Reference</h1>
      <p className="text-zinc-600">Complete HTTP headers reference. Request headers, response headers, security headers, and CORS configuration for web development.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Request Headers</h3>
        <div className="space-y-1 text-xs">
          {requestHeaders.map((h, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong className="font-mono">{h.name}</strong>: {h.desc}
              <div className="text-zinc-400 font-mono mt-1">{h.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Headers</h3>
        <div className="space-y-1 text-xs">
          {responseHeaders.map((h, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong className="font-mono">{h.name}</strong>: {h.desc}
              <div className="text-zinc-400 font-mono mt-1">{h.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Headers</h3>
        <div className="space-y-1 text-xs">
          {securityHeaders.map((h, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong className="font-mono">{h.name}</strong>: {h.desc}
              <div className="text-zinc-400 font-mono mt-1">{h.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">CORS Headers</h3>
        <div className="text-xs text-zinc-600">
          Access-Control-Allow-Origin: allowed origins (* or specific). Access-Control-Allow-Methods: allowed HTTP methods. Access-Control-Allow-Headers: allowed request headers. Access-Control-Allow-Credentials: allow cookies. Access-Control-Max-Age: preflight cache duration. Preflight OPTIONS request checks CORS permissions.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cache Headers</h3>
        <div className="text-xs text-zinc-600">
          Cache-Control: max-age=seconds, no-cache, no-store, public, private. Expires: absolute expiration date. ETag: version identifier for validation. Last-Modified: resource modification time. Cache validation: If-None-Match, If-Modified-Since. Freshness vs validation: max-age for freshness, ETag for validation.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Content Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><code>text/html</code> - HTML pages</div>
          <div className="bg-white rounded p-2"><code>application/json</code> - JSON data</div>
          <div className="bg-white rounded p-2"><code>text/css</code> - CSS files</div>
          <div className="bg-white rounded p-2"><code>application/javascript</code> - JS files</div>
          <div className="bg-white rounded p-2"><code>image/png</code> - PNG images</div>
          <div className="bg-white rounded p-2"><code>application/pdf</code> - PDF files</div>
          <div className="bg-white rounded p-2"><code>text/plain</code> - Plain text</div>
          <div className="bg-white rounded p-2"><code>multipart/form-data</code> - File uploads</div>
        </div>
      </div>
    </main>
  );
}