'use client'

import { useState } from 'react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'nodashes' | 'braces'>('standard');

  const generateUUID = () => {
    if (version === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    } else {
      const now = Date.now();
      const timeLow = (now & 0xffffffff).toString(16).padStart(8, '0');
      const timeMid = ((now >> 32) & 0xffff).toString(16).padStart(4, '0');
      const timeHi = ((now >> 48) & 0x0fff).toString(16).padStart(4, '0');
      const clockSeq = Math.floor(Math.random() * 0x3fff).toString(16).padStart(4, '0');
      const node = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      return `${timeLow}-${timeMid}-${timeHi}-${clockSeq}-${node}`;
    }
  };

  const formatUUID = (uuid: string) => {
    switch (format) {
      case 'uppercase':
        return uuid.toUpperCase();
      case 'nodashes':
        return uuid.replace(/-/g, '');
      case 'braces':
        return `{${uuid}}`;
      default:
        return uuid;
    }
  };

  const generateBatch = () => {
    const newUuids = Array.from({ length: count }, () => formatUUID(generateUUID()));
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  const copySingle = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
  };

  const formats = [
    { id: 'standard', name: 'Standard', example: '550e8400-e29b-41d4-a716-446655440000' },
    { id: 'uppercase', name: 'Uppercase', example: '550E8400-E29B-41D4-A716-446655440000' },
    { id: 'nodashes', name: 'No Dashes', example: '550e8400e29b41d4a716446655440000' },
    { id: 'braces', name: 'Braces', example: '{550e8400-e29b-41d4-a716-446655440000}' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">UUID Generator</h1>
      <p className="text-zinc-600">Generate unique UUID/GUID identifiers. UUID v4 (random) and v1 (time-based). Bulk generation for database keys, API identifiers, and session tokens.</p>

      <div className="card space-y-4">
        {/* Version */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">UUID Version</label>
          <div className="flex gap-2">
            <button
              onClick={() => setVersion('v4')}
              className={`px-4 py-2 rounded ${version === 'v4' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              UUID v4 (Random)
            </button>
            <button
              onClick={() => setVersion('v1')}
              className={`px-4 py-2 rounded ${version === 'v1' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              UUID v1 (Time-based)
            </button>
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {version === 'v4' ? 'Random UUID - recommended for most uses, no predictability' : 'Time-based UUID - includes timestamp, sortable but potentially traceable'}
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Output Format</label>
          <div className="flex gap-2">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as 'standard' | 'uppercase' | 'nodashes' | 'braces')}
                className={`px-3 py-2 rounded text-xs ${format === f.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Generate Count</label>
          <div className="flex gap-2">
            {[1, 5, 10, 50, 100].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`px-3 py-1 rounded ${count === n ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateBatch}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 font-medium"
        >
          Generate {count} UUID{count > 1 ? 's' : ''}
        </button>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Generated UUIDs ({uuids.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100"
              >
                Copy All
              </button>
              <button
                onClick={() => setUuids([])}
                className="px-3 py-1 text-sm bg-zinc-100 rounded hover:bg-zinc-200"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-1 max-h-64 overflow-auto">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex justify-between items-center bg-white rounded p-2 font-mono text-sm">
                <span className="text-blue-600">{uuid}</span>
                <button
                  onClick={() => copySingle(uuid)}
                  className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UUID Structure */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">UUID Structure (36 characters)</h3>
        <div className="bg-white rounded p-3 font-mono text-sm text-center">
          <span className="text-blue-600">550e8400</span>
          <span className="text-zinc-400">-</span>
          <span className="text-green-600">e29b</span>
          <span className="text-zinc-400">-</span>
          <span className="text-purple-600">41d4</span>
          <span className="text-zinc-400">-</span>
          <span className="text-orange-600">a716</span>
          <span className="text-zinc-400">-</span>
          <span className="text-teal-600">446655440000</span>
        </div>
        <div className="grid grid-cols-5 gap-2 text-xs mt-2">
          <div className="bg-white rounded p-1 text-center">
            <div className="text-blue-600 font-medium">Time Low</div>
            <div>8 chars</div>
          </div>
          <div className="bg-white rounded p-1 text-center">
            <div className="text-green-600 font-medium">Time Mid</div>
            <div>4 chars</div>
          </div>
          <div className="bg-white rounded p-1 text-center">
            <div className="text-purple-600 font-medium">Version</div>
            <div>4 chars</div>
          </div>
          <div className="bg-white rounded p-1 text-center">
            <div className="text-orange-600 font-medium">Clock</div>
            <div>4 chars</div>
          </div>
          <div className="bg-white rounded p-1 text-center">
            <div className="text-teal-600 font-medium">Node</div>
            <div>12 chars</div>
          </div>
        </div>
      </div>

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">UUID Versions Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Version Types</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">v1</span> Time-based (MAC + timestamp)</div>
              <div><span className="text-green-600">v2</span> DCE Security (POSIX UID)</div>
              <div><span className="text-purple-600">v3</span> MD5 hash of namespace + name</div>
              <div><span className="text-orange-600">v4</span> Random (recommended)</div>
              <div><span className="text-teal-600">v5</span> SHA-1 hash of namespace + name</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Common Uses</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Database primary keys</div>
              <div>API request identifiers</div>
              <div>Session tokens</div>
              <div>File/document IDs</div>
              <div>Anonymous user IDs</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>128-bit identifier</div>
              <div>36 chars (32 hex + 4 dashes)</div>
              <div>Uniqueness guaranteed</div>
              <div>Collision probability: negligible</div>
              <div>RFC 4122 standard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Databases:</span> Primary keys, composite IDs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">APIs:</span> Request IDs, correlation tokens
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Auth:</span> Session tokens, CSRF tokens
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Files:</span> Unique filenames, document IDs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Distributed:</span> IDs across servers
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Events:</span> Event tracking IDs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Orders:</span> Order/transaction IDs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Testing:</span> Mock data identifiers
          </div>
        </div>
      </div>
    </main>
  );
}