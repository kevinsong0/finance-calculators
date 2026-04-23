'use client'

import { useState } from 'react';

export default function APIRequestBuilder() {
  const [method, setMethod] = useState('GET');
  const [url, setURL] = useState('');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [body, setBody] = useState('');
  const [authType, setAuthType] = useState('none');
  const [authValue, setAuthValue] = useState('');

  const generateRequest = () => {
    let request = `${method} ${url}\n`;
    request += `Headers:\n${headers}`;

    if (authType === 'bearer') {
      request += `\nAuthorization: Bearer ${authValue}`;
    } else if (authType === 'basic') {
      request += `\nAuthorization: Basic ${authValue}`;
    } else if (authType === 'api-key') {
      request += `\nX-API-Key: ${authValue}`;
    }

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      request += `\n\nBody:\n${body}`;
    }

    return request;
  };

  const generateCurl = () => {
    let curl = `curl -X ${method} '${url}'`;

    // Add headers
    headers.split('\n').forEach(h => {
      if (h.trim()) {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) {
          curl += ` -H '${key}: ${value}'`;
        }
      }
    });

    // Add auth
    if (authType === 'bearer' && authValue) {
      curl += ` -H 'Authorization: Bearer ${authValue}'`;
    } else if (authType === 'basic' && authValue) {
      curl += ` -H 'Authorization: Basic ${authValue}'`;
    } else if (authType === 'api-key' && authValue) {
      curl += ` -H 'X-API-Key: ${authValue}'`;
    }

    // Add body
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      curl += ` -d '${body}'`;
    }

    return curl;
  };

  const generateJS = () => {
    const headersObj: Record<string, string> = {};
    headers.split('\n').forEach(h => {
      if (h.trim()) {
        const [key, value] = h.split(':').map(s => s.trim());
        if (key && value) {
          headersObj[key] = value;
        }
      }
    });

    if (authType === 'bearer' && authValue) {
      headersObj['Authorization'] = `Bearer ${authValue}`;
    } else if (authType === 'basic' && authValue) {
      headersObj['Authorization'] = `Basic ${authValue}`;
    } else if (authType === 'api-key' && authValue) {
      headersObj['X-API-Key'] = authValue;
    }

    let js = `fetch('${url}', {\n`;
    js += `  method: '${method}',\n`;
    js += `  headers: ${JSON.stringify(headersObj, null, 4).replace(/"/g, "'")},\n`;

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      js += `  body: '${body}',\n`;
    }

    js += `})\n`;
    js += `.then(res => res.json())\n`;
    js += `.then(data => console.log(data))\n`;
    js += `.catch(err => console.error(err));`;

    return js;
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(generateCurl());
  };

  const copyJS = () => {
    navigator.clipboard.writeText(generateJS());
  };

  const templates = [
    { method: 'GET', url: 'https://api.example.com/users', headers: 'Accept: application/json', authType: 'bearer', authValue: 'your-token' },
    { method: 'POST', url: 'https://api.example.com/users', headers: 'Content-Type: application/json', body: '{"name": "John", "email": "john@example.com"}', authType: 'bearer', authValue: 'your-token' },
    { method: 'GET', url: 'https://api.github.com/repos/owner/repo', headers: 'Accept: application/vnd.github.v3+json', authType: 'bearer', authValue: 'ghp_xxxx' },
    { method: 'POST', url: 'https://api.stripe.com/v1/charges', headers: 'Content-Type: application/x-www-form-urlencoded', body: 'amount=2000&currency=usd&source=tok_xxxx', authType: 'bearer', authValue: 'sk_test_xxxx' },
  ];

  const loadTemplate = (t: typeof templates[0]) => {
    setMethod(t.method);
    setURL(t.url);
    setHeaders(t.headers);
    setBody(t.body || '');
    setAuthType(t.authType);
    setAuthValue(t.authValue);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Request Builder</h1>
      <p className="text-zinc-600">Build HTTP API requests with curl, fetch, and Axios code. Configure method, URL, headers, body, and authentication. Generate ready-to-use code snippets for API testing.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Quick Templates</label>
          <div className="flex gap-2">
            {templates.map((t, i) => (
              <button key={i} onClick={() => loadTemplate(t)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
                {t.method} {i === 2 ? 'GitHub' : i === 3 ? 'Stripe' : 'API'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Method</label>
            <div className="flex gap-2">
              {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
                <button key={m} onClick={() => setMethod(m)} className={`px-3 py-2 rounded ${method === m ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">URL</label>
            <input type="text" value={url} onChange={e => setURL(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="https://api.example.com/endpoint" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Headers</label>
          <textarea value={headers} onChange={e => setHeaders(e.target.value)} className="w-full h-20 p-3 border rounded font-mono text-sm resize-none" placeholder="Content-Type: application/json" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Auth Type</label>
            <div className="flex gap-2">
              {['none', 'bearer', 'basic', 'api-key'].map((a) => (
                <button key={a} onClick={() => setAuthType(a)} className={`px-3 py-1 rounded text-sm ${authType === a ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                  {a === 'none' ? 'None' : a === 'bearer' ? 'Bearer' : a === 'basic' ? 'Basic' : 'API Key'}
                </button>
              ))}
            </div>
          </div>
          {authType !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Auth Value</label>
              <input type="text" value={authValue} onChange={e => setAuthValue(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="token or key" />
            </div>
          )}
        </div>

        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Request Body</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full h-24 p-3 border rounded font-mono text-sm resize-none" placeholder='{"key": "value"}' />
          </div>
        )}
      </div>

      {url && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-2">Request Summary</h3>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{generateRequest()}</pre>
        </div>
      )}

      {url && (
        <div className="card bg-zinc-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">curl Command</h3>
            <button onClick={copyCurl} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto whitespace-pre-wrap">{generateCurl()}</pre>
        </div>
      )}

      {url && (
        <div className="card bg-zinc-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">fetch (JavaScript)</h3>
            <button onClick={copyJS} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-32">{generateJS()}</pre>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">HTTP Methods</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">GET:</span> Retrieve data</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">POST:</span> Create resource</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">PUT:</span> Replace resource</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">PATCH:</span> Partial update</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">DELETE:</span> Remove resource</div>
        </div>
      </div>
    </main>
  );
}