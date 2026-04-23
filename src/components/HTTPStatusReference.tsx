'use client'

import { useState } from 'react';

export default function HTTPStatusReference() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const statusCodes = [
    { code: 200, name: 'OK', desc: 'Request succeeded', category: 'success' },
    { code: 201, name: 'Created', desc: 'Resource created successfully', category: 'success' },
    { code: 204, name: 'No Content', desc: 'Success with no response body', category: 'success' },
    { code: 301, name: 'Moved Permanently', desc: 'URL redirected permanently', category: 'redirect' },
    { code: 302, name: 'Found', desc: 'URL redirected temporarily', category: 'redirect' },
    { code: 304, name: 'Not Modified', desc: 'Resource unchanged since last request', category: 'redirect' },
    { code: 400, name: 'Bad Request', desc: 'Invalid request syntax or parameters', category: 'client' },
    { code: 401, name: 'Unauthorized', desc: 'Authentication required', category: 'client' },
    { code: 403, name: 'Forbidden', desc: 'Access denied to resource', category: 'client' },
    { code: 404, name: 'Not Found', desc: 'Resource does not exist', category: 'client' },
    { code: 405, name: 'Method Not Allowed', desc: 'HTTP method not supported', category: 'client' },
    { code: 408, name: 'Request Timeout', desc: 'Server timed out waiting for request', category: 'client' },
    { code: 409, name: 'Conflict', desc: 'Request conflicts with current state', category: 'client' },
    { code: 410, name: 'Gone', desc: 'Resource permanently removed', category: 'client' },
    { code: 413, name: 'Payload Too Large', desc: 'Request body exceeds size limit', category: 'client' },
    { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded', category: 'client' },
    { code: 500, name: 'Internal Server Error', desc: 'Generic server error', category: 'server' },
    { code: 501, name: 'Not Implemented', desc: 'Server does not support functionality', category: 'server' },
    { code: 502, name: 'Bad Gateway', desc: 'Invalid response from upstream server', category: 'server' },
    { code: 503, name: 'Service Unavailable', desc: 'Server temporarily unable to handle request', category: 'server' },
    { code: 504, name: 'Gateway Timeout', desc: 'Upstream server timeout', category: 'server' },
  ];

  const filtered = statusCodes.filter(s => {
    const matchesSearch = search === '' || s.code.toString().includes(search) || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || s.category === category;
    return matchesSearch && matchesCategory;
  });

  const categoryColors: Record<string, string> = {
    success: 'bg-green-100 text-green-700',
    redirect: 'bg-blue-100 text-blue-700',
    client: 'bg-yellow-100 text-yellow-700',
    server: 'bg-red-100 text-red-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTTP Status Code Reference</h1>
      <p className="text-zinc-600">Complete reference of HTTP status codes. Search by code number or name. Understand server responses for debugging APIs and web applications.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full" placeholder="Search by code, name, or description..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Filter by Category</label>
          <div className="flex gap-2">
            {['all', 'success', 'redirect', 'client', 'server'].map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded ${category === c ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">HTTP Status Codes ({filtered.length} shown)</h3>
        <div className="space-y-2">
          {filtered.map((s) => (
            <div key={s.code} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-16 text-center px-3 py-2 rounded font-mono font-bold ${categoryColors[s.category]}`}>
                {s.code}
              </div>
              <div className="flex-1">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-zinc-500">{s.desc}</div>
              </div>
              <div className="text-xs text-zinc-400 capitalize">{s.category}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Status Code Categories</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <div className="font-medium text-zinc-400">1xx</div>
            <div className="text-zinc-600">Informational</div>
          </div>
          <div className="bg-green-100 rounded p-2">
            <div className="font-medium text-green-700">2xx</div>
            <div className="text-green-600">Success</div>
          </div>
          <div className="bg-blue-100 rounded p-2">
            <div className="font-medium text-blue-700">3xx</div>
            <div className="text-blue-600">Redirect</div>
          </div>
          <div className="bg-yellow-100 rounded p-2">
            <div className="font-medium text-yellow-700">4xx</div>
            <div className="text-yellow-600">Client Error</div>
          </div>
          <div className="bg-red-100 rounded p-2">
            <div className="font-medium text-red-700">5xx</div>
            <div className="text-red-600">Server Error</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Troubleshooting</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">404 Not Found</div>
            <div className="bg-white rounded p-2">
              <div>Check URL path spelling</div>
              <div>Verify resource exists</div>
              <div>Check routing configuration</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">500 Server Error</div>
            <div className="bg-white rounded p-2">
              <div>Check server logs</div>
              <div>Verify code exceptions</div>
              <div>Check database connections</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">401 Unauthorized</div>
            <div className="bg-white rounded p-2">
              <div>Verify authentication token</div>
              <div>Check credentials validity</div>
              <div>Verify authorization headers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">API Debug:</span> Understand responses</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Testing:</span> Verify expected codes</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Logs:</span> Identify errors</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Clients:</span> Handle responses</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Proxies:</span> Debug gateway issues</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">DevOps:</span> Monitor uptime</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Docs:</span> API documentation</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Support:</span> Diagnose issues</div>
        </div>
      </div>
    </main>
  );
}