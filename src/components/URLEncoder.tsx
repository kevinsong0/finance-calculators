'use client'

import { useState, useMemo } from 'react';

export default function URLEncoder() {
  const [input, setInput] = useState('Hello World & Special Characters');
  const [mode, setMode] = useState('encode');
  const [encoding, setEncoding] = useState('component');

  const result = useMemo(() => {
    if (!input) return { output: '', valid: true };

    try {
      if (mode === 'encode') {
        if (encoding === 'component') {
          return { output: encodeURIComponent(input), valid: true };
        }
        return { output: encodeURI(input), valid: true };
      }
      return { output: decodeURIComponent(input), valid: true };
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid input', valid: false };
    }
  }, [input, mode, encoding]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    { input: 'Hello World', desc: 'Basic text' },
    { input: 'search?q=hello world', desc: 'Query string' },
    { input: 'Hello%20World', desc: 'Decode example' },
  ];

  const specialChars = [
    { char: 'Space', encoded: '%20' },
    { char: 'Ampersand', encoded: '%26' },
    { char: 'Equals', encoded: '%3D' },
    { char: 'Question', encoded: '%3F' },
    { char: 'Slash', encoded: '%2F' },
    { char: 'Hash', encoded: '%23' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">URL Encoder & Decoder</h1>
      <p className="text-zinc-600">Encode URLs and query parameters for safe transmission. Decode encoded URLs back to readable text.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Mode</label>
          <div className="flex gap-2">
            <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Encode</button>
            <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Decode</button>
          </div>
        </div>

        {mode === 'encode' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Encoding Type</label>
            <div className="flex gap-2">
              <button onClick={() => setEncoding('component')} className={`px-4 py-2 rounded text-xs ${encoding === 'component' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>encodeURIComponent</button>
              <button onClick={() => setEncoding('full')} className={`px-4 py-2 rounded text-xs ${encoding === 'full' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>encodeURI</button>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {encoding === 'component' ? 'Encodes ALL special characters (for query params)' : 'Preserves URL structure chars (for full URLs)'}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">{mode === 'encode' ? 'Text to Encode' : 'Encoded URL to Decode'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-20 p-3 border rounded-lg font-mono text-sm resize-none" placeholder={mode === 'encode' ? 'Enter text...' : 'Enter encoded URL...'} />
        </div>
      </div>

      {result.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}</h3>
            <button onClick={() => copyToClipboard(result.output)} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <div className="bg-white rounded p-3 font-mono text-sm break-all">{result.output}</div>
        </div>
      )}

      {result.error && (
        <div className="card bg-red-50 p-4">
          <div className="text-red-600">{result.error}</div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Examples</h3>
        <div className="flex gap-2">
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setInput(ex.input)} className="px-3 py-1 text-xs bg-white rounded hover:bg-zinc-100">{ex.desc}</button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Encodings</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {specialChars.map((s) => (
            <div key={s.char} className="bg-white rounded p-2">
              <span className="text-blue-600">{s.char}</span> → <span className="text-green-600">{s.encoded}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">API URLs:</span> Build query strings</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Forms:</span> Encode form data</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Links:</span> Build anchor hrefs</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Debug:</span> Decode incoming URLs</div>
        </div>
      </div>
    </main>
  );
}