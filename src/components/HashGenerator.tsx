'use client'

import { useState, useEffect } from 'react';

export default function HashGenerator() {
  const [input, setInput] = useState('Hello World');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

    Promise.all(
      algorithms.map(async (alg) => {
        const hashBuffer = await crypto.subtle.digest(alg, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return [alg, hashHex];
      })
    ).then(results => {
      const hashObj: Record<string, string> = {};
      for (const [alg, hex] of results) {
        hashObj[alg as string] = hex as string;
      }
      setHashes(hashObj);
    });
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const algorithms = [
    { id: 'SHA-1', name: 'SHA-1', bits: 160, deprecated: true },
    { id: 'SHA-256', name: 'SHA-256', bits: 256, recommended: true },
    { id: 'SHA-384', name: 'SHA-384', bits: 384 },
    { id: 'SHA-512', name: 'SHA-512', bits: 512 },
  ];

  const examples = [
    { input: 'password123', desc: 'Password example' },
    { input: 'test@example.com', desc: 'Email example' },
    { input: '{"type":"api","version":1}', desc: 'JSON data' },
    { input: 'API_KEY_SECRET_12345', desc: 'API key' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Hash Generator</h1>
      <p className="text-zinc-600">Generate cryptographic hashes: SHA-1, SHA-256, SHA-384, SHA-512. One-way hashing for passwords, checksums, and data integrity verification.</p>

      <div className="card space-y-4">
        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Algorithm</label>
          <div className="flex gap-2">
            {algorithms.map((alg) => (
              <button
                key={alg.id}
                onClick={() => setAlgorithm(alg.id)}
                className={`px-3 py-2 rounded text-sm ${algorithm === alg.id ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'} ${alg.deprecated ? 'opacity-70' : ''}`}
              >
                {alg.name}
                {alg.recommended && <span className="ml-1 text-xs">★</span>}
              </button>
            ))}
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {algorithm} produces {algorithms.find(a => a.id === algorithm)?.bits}-bit hash
            {algorithm === 'SHA-1' && ' - Deprecated for security use'}
            {algorithm === 'SHA-256' && ' - Recommended for most applications'}
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-20 p-3 border rounded-lg font-mono text-sm"
            placeholder="Enter text to hash..."
          />
        </div>
      </div>

      {/* Hash Results */}
      {Object.keys(hashes).length > 0 && (
        <div className="card bg-blue-50">
          <h3 className="font-medium mb-3">Generated Hashes</h3>
          <div className="space-y-2">
            {algorithms.map((alg) => (
              hashes[alg.id] && (
                <div key={alg.id} className={`bg-white rounded p-3 ${algorithm === alg.id ? 'ring-2 ring-blue-400' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-zinc-500 font-medium">{alg.name} ({alg.bits} bits)</span>
                    <button
                      onClick={() => copyToClipboard(hashes[alg.id])}
                      className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="font-mono text-sm break-all text-zinc-700">
                    {hashes[alg.id]}
                  </div>
                  {alg.deprecated && (
                    <div className="text-xs text-red-500 mt-1">⚠ Not recommended for security</div>
                  )}
                  {alg.recommended && (
                    <div className="text-xs text-green-500 mt-1">✓ Recommended for passwords & signatures</div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Examples</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex.input)}
              className="bg-white rounded p-2 hover:bg-zinc-100 text-left"
            >
              <div className="font-mono text-blue-600 truncate">{ex.input}</div>
              <div className="text-zinc-500">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Hash Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Hash Algorithm Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Properties</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">One-way:</span> Cannot reverse</div>
              <div><span className="text-blue-600">Fixed size:</span> Same length output</div>
              <div><span className="text-blue-600">Deterministic:</span> Same input = same hash</div>
              <div><span className="text-blue-600">Fast:</span> Efficient computation</div>
              <div><span className="text-blue-600">Collision-resistant:</span> Hard to find duplicates</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Security Uses</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Password storage (with salt)</div>
              <div>Digital signatures</div>
              <div>File integrity checks</div>
              <div>SSL/TLS certificates</div>
              <div>Blockchain/Merkle trees</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Algorithm Comparison</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-red-600">SHA-1</span> 160-bit, broken</div>
              <div><span className="text-green-600">SHA-256</span> 256-bit, secure</div>
              <div><span className="text-blue-600">SHA-384</span> 384-bit, high security</div>
              <div><span className="text-purple-600">SHA-512</span> 512-bit, highest</div>
              <div><span className="text-orange-600">MD5</span> 128-bit, deprecated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">Passwords:</span> Hash + salt before storage
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">File Verify:</span> Check download integrity
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">API Tokens:</span> Hash tokens for lookup
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Git:</span> SHA-1 for commit IDs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Blockchain:</span> SHA-256 in Bitcoin
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">JWT:</span> Header integrity signature
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">SSL Certs:</span> SHA-256 fingerprints
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Data Dedup:</span> Hash to detect duplicates
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium text-yellow-700 mb-2">⚠ Security Notes</h3>
        <div className="text-xs space-y-1">
          <div>• Hashing is NOT encryption - hashes cannot be reversed</div>
          <div>• For passwords: always use salt + slow algorithms like bcrypt or Argon2 (not SHA)</div>
          <div>• SHA-1 is cryptographically broken - use SHA-256+ for security</div>
          <div>• This tool runs entirely in your browser - no data sent to servers</div>
        </div>
      </div>
    </main>
  );
}