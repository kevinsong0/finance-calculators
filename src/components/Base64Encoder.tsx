'use client'

import { useState, useMemo } from 'react';

export default function Base64Encoder() {
  const [input, setInput] = useState('Hello World');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [charset, setCharset] = useState<'standard' | 'urlsafe'>('standard');

  const result = useMemo(() => {
    if (!input) return { output: '', valid: true };

    try {
      if (mode === 'encode') {
        if (charset === 'urlsafe') {
          const encoded = btoa(input);
          return { output: encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''), valid: true };
        }
        return { output: btoa(input), valid: true };
      } else {
        let decodedInput = input;
        if (charset === 'urlsafe') {
          decodedInput = input.replace(/-/g, '+').replace(/_/g, '/');
          while (decodedInput.length % 4 !== 0) {
            decodedInput += '=';
          }
        }
        return { output: atob(decodedInput), valid: true };
      }
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid input', valid: false };
    }
  }, [input, mode, charset]);

  const hexOutput = useMemo(() => {
    if (!result.output) return '';
    return Array.from(result.output).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  }, [result.output]);

  const inputHex = useMemo(() => {
    if (!input) return '';
    return Array.from(input).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    { input: 'Hello World', desc: 'Basic text' },
    { input: 'user:password@example.com', desc: 'Basic Auth credentials' },
    { input: 'SGVsbG8gV29ybGQ=', desc: 'Decode example' },
    { input: 'eyJ0eXBlIjoiYXBpIn0=', desc: 'Decode JSON-like' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Base64 Encoder & Decoder</h1>
      <p className="text-zinc-600">Encode text to Base64 or decode Base64 strings. URL-safe encoding for web APIs and authentication headers.</p>

      <div className="card space-y-4">
        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Charset */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Encoding Variant</label>
          <div className="flex gap-2">
            <button
              onClick={() => setCharset('standard')}
              className={`px-4 py-2 rounded ${charset === 'standard' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Standard
            </button>
            <button
              onClick={() => setCharset('urlsafe')}
              className={`px-4 py-2 rounded ${charset === 'urlsafe' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              URL-Safe
            </button>
          </div>
          <div className="text-xs text-zinc-500 mt-1">
            {charset === 'standard' ? 'Standard Base64 uses + and / characters' : 'URL-safe replaces + with - and / with _, removes padding'}
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">{mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-20 p-3 border rounded-lg font-mono text-sm"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          />
          {mode === 'encode' && inputHex && (
            <div className="text-xs text-zinc-500 mt-1">
              Input bytes: {inputHex.slice(0, 60)}{inputHex.length > 60 ? '...' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      {result.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</h3>
            <button
              onClick={() => copyToClipboard(result.output)}
              className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100"
            >
              Copy
            </button>
          </div>
          <div className="bg-white rounded p-3 font-mono text-sm break-all">
            {result.output}
          </div>
          {mode === 'decode' && hexOutput && (
            <div className="text-xs text-zinc-500 mt-2">
              Output bytes: {hexOutput.slice(0, 60)}{hexOutput.length > 60 ? '...' : ''}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {result.error && (
        <div className="card bg-red-50 p-4">
          <div className="text-red-600 font-medium">Error</div>
          <div className="text-sm text-red-500">{result.error}</div>
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

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Base64 Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">What is Base64?</div>
            <div className="bg-white rounded p-2">
              <div>Binary-to-text encoding that converts binary data into ASCII string format using 64 characters: A-Z, a-z, 0-9, + and / (standard) or - and _ (URL-safe).</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Common Uses</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Email attachments (MIME)</div>
              <div>Basic Auth headers</div>
              <div>Data URLs in CSS/HTML</div>
              <div>JWT tokens</div>
              <div>API payloads</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Character Set</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">A-Z a-z 0-9</span> (62 chars)</div>
              <div><span className="text-blue-600">+</span> and <span className="text-blue-600">/</span> (standard)</div>
              <div><span className="text-blue-600">-</span> and <span className="text-blue-600">_</span> (URL-safe)</div>
              <div><span className="text-blue-600">=</span> padding (up to 2)</div>
              <div>Output is 4/3 input size</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">HTTP Basic Auth:</span> Authorization: Basic base64(user:pass)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">JWT Tokens:</span> Header.Payload.Signature all Base64URL
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Data URLs:</span> data:image/png;base64,encodedData
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Email MIME:</span> Attachments encoded in Base64
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Config Files:</span> Store secrets safely in text configs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">API Keys:</span> Encode binary keys for storage
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Crypto:</span> Encode hashes, signatures, encrypted data
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Debug:</span> Decode API responses, headers
          </div>
        </div>
      </div>
    </main>
  );
}