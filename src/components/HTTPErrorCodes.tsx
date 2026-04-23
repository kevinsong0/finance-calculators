'use client'

export default function HTTPErrorCodes() {
  const clientErrors = [
    { code: 400, name: 'Bad Request', desc: 'Invalid request syntax', fix: 'Check request format, parameters' },
    { code: 401, name: 'Unauthorized', desc: 'Authentication required', fix: 'Add authentication header, check credentials' },
    { code: 403, name: 'Forbidden', desc: 'Access denied', fix: 'Check permissions, API key, user role' },
    { code: 404, name: 'Not Found', desc: 'Resource does not exist', fix: 'Check URL, endpoint, resource ID' },
    { code: 405, name: 'Method Not Allowed', desc: 'HTTP method not supported', fix: 'Use correct method (GET, POST, PUT)' },
    { code: 406, name: 'Not Acceptable', desc: 'Content type not acceptable', fix: 'Check Accept header format' },
    { code: 408, name: 'Request Timeout', desc: 'Server timed out', fix: 'Reduce request size, retry' },
    { code: 409, name: 'Conflict', desc: 'Resource state conflict', fix: 'Check version, resolve conflict' },
    { code: 410, name: 'Gone', desc: 'Resource permanently removed', fix: 'Use different resource, update link' },
    { code: 413, name: 'Payload Too Large', desc: 'Request body exceeds limit', fix: 'Reduce upload size' },
    { code: 414, name: 'URI Too Long', desc: 'URL exceeds length limit', fix: 'Shorten URL, use POST' },
    { code: 415, name: 'Unsupported Media Type', desc: 'Content format unsupported', fix: 'Check Content-Type header' },
    { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded', fix: 'Wait, implement throttling' },
  ];

  const serverErrors = [
    { code: 500, name: 'Internal Server Error', desc: 'Server error', fix: 'Check server logs, contact admin' },
    { code: 501, name: 'Not Implemented', desc: 'Feature not supported', fix: 'Server needs update' },
    { code: 502, name: 'Bad Gateway', desc: 'Proxy/gateway error', fix: 'Check upstream server' },
    { code: 503, name: 'Service Unavailable', desc: 'Server overloaded/down', fix: 'Wait, retry later' },
    { code: 504, name: 'Gateway Timeout', desc: 'Upstream server timeout', fix: 'Check backend response time' },
    { code: 505, name: 'HTTP Version Not Supported', desc: 'HTTP version unsupported', fix: 'Use HTTP/1.1 or HTTP/2' },
  ];

  const successCodes = [
    { code: 200, name: 'OK', desc: 'Request successful' },
    { code: 201, name: 'Created', desc: 'Resource created successfully' },
    { code: 202, name: 'Accepted', desc: 'Request accepted for processing' },
    { code: 204, name: 'No Content', desc: 'Success, no response body' },
    { code: 206, name: 'Partial Content', desc: 'Partial response delivered' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTTP Error Codes Reference</h1>
      <p className="text-zinc-600">Complete HTTP status codes reference. Client errors (4xx), server errors (5xx), success codes (2xx). Understand causes and fixes for common errors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Codes (2xx)</h3>
        <div className="space-y-1 text-xs">
          {successCodes.map((e) => (
            <div key={e.code} className="bg-green-50 rounded p-2">
              <strong className="font-mono text-green-600">{e.code}</strong> {e.name}: {e.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Client Errors (4xx)</h3>
        <div className="space-y-1 text-xs">
          {clientErrors.map((e) => (
            <div key={e.code} className="bg-red-50 rounded p-2">
              <strong className="font-mono text-red-600">{e.code}</strong> {e.name}: {e.desc}
              <div className="text-zinc-500 mt-1">Fix: {e.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Server Errors (5xx)</h3>
        <div className="space-y-1 text-xs">
          {serverErrors.map((e) => (
            <div key={e.code} className="bg-orange-50 rounded p-2">
              <strong className="font-mono text-orange-600">{e.code}</strong> {e.name}: {e.desc}
              <div className="text-zinc-500 mt-1">Fix: {e.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Error Troubleshooting</h3>
        <div className="text-xs text-zinc-600">
          401: Check API key, OAuth token, session. 403: Verify permissions, CORS, IP restrictions. 404: Confirm endpoint URL exists. 500: Check server logs, database connection. 503: Server may be in maintenance, overloaded. Use DevTools Network panel for debugging.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Status Code Categories</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-green-50 rounded p-2 text-center">1xx<br/>Informational</div>
          <div className="bg-green-100 rounded p-2 text-center">2xx<br/>Success</div>
          <div className="bg-blue-100 rounded p-2 text-center">3xx<br/>Redirect</div>
          <div className="bg-red-100 rounded p-2 text-center">4xx/5xx<br/>Error</div>
        </div>
      </div>
    </main>
  );
}