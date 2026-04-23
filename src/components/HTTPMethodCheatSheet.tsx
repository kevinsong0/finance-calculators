'use client'

import { useState } from 'react';

export default function HTTPMethodCheatSheet() {
  const methods = [
    { method: 'GET', desc: 'Retrieve data from server', safe: true, cacheable: true, body: false },
    { method: 'POST', desc: 'Create new resource', safe: false, cacheable: false, body: true },
    { method: 'PUT', desc: 'Update/replace entire resource', safe: false, cacheable: false, body: true },
    { method: 'PATCH', desc: 'Partial update of resource', safe: false, cacheable: false, body: true },
    { method: 'DELETE', desc: 'Remove resource', safe: false, cacheable: false, body: false },
    { method: 'HEAD', desc: 'Get headers only (no body)', safe: true, cacheable: true, body: false },
    { method: 'OPTIONS', desc: 'Get allowed methods', safe: true, cacheable: false, body: false },
    { method: 'CONNECT', desc: 'Establish tunnel connection', safe: false, cacheable: false, body: false },
    { method: 'TRACE', desc: 'Echo request for debugging', safe: false, cacheable: false, body: false },
  ];

  const [selected, setSelected] = useState('GET');

  const selectedMethod = methods.find(m => m.method === selected);

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTTP Methods Reference</h1>
      <p className="text-zinc-600">Complete reference for HTTP request methods. Learn GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, CONNECT, TRACE. Understand when to use each method for REST APIs.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">HTTP Methods</label>
          <div className="flex gap-2">
            {methods.map((m) => (
              <button key={m.method} onClick={() => setSelected(m.method)} className={`px-3 py-2 rounded font-mono ${selected === m.method ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {m.method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedMethod && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium text-xl mb-2">{selectedMethod.method}</h3>
          <p className="text-zinc-600 mb-4">{selectedMethod.desc}</p>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="bg-white rounded p-3">
              <div className="font-medium mb-1">Safe</div>
              <div className={selectedMethod.safe ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {selectedMethod.safe ? 'Yes (no side effects)' : 'No (modifies data)'}
              </div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-medium mb-1">Cacheable</div>
              <div className={selectedMethod.cacheable ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {selectedMethod.cacheable ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-medium mb-1">Request Body</div>
              <div className={selectedMethod.body ? 'text-blue-600 font-medium' : 'text-zinc-600 font-medium'}>
                {selectedMethod.body ? 'Allowed' : 'Not typically used'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">All Methods Summary</h3>
        <div className="space-y-2">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-3 flex items-center gap-4">
              <div className="w-24 font-mono font-bold">{m.method}</div>
              <div className="flex-1 text-sm">{m.desc}</div>
              <div className="w-16 text-xs text-center">{m.safe ? 'Safe' : 'Unsafe'}</div>
              <div className="w-16 text-xs text-center">{m.cacheable ? 'Cache' : 'No-cache'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">REST API Best Practices</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">GET:</span> Read data, never modify</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">POST:</span> Create new resource</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">PUT:</span> Replace entire resource</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">PATCH:</span> Partial update fields</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">DELETE:</span> Remove resource</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">HEAD:</span> Check resource exists</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Idempotent Methods</h3>
        <div className="text-xs text-zinc-600">
          Idempotent: Same request multiple times produces same result. GET, HEAD, OPTIONS, PUT, DELETE are idempotent. POST is NOT idempotent (creates new resource each time). PATCH can be idempotent if designed correctly. Safe: Does not modify server state (GET, HEAD, OPTIONS).
        </div>
      </div>
    </main>
  );
}