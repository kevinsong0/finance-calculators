'use client'

import { useState, useMemo } from 'react';

export default function HTMLEntityEncoder() {
  const [input, setInput] = useState('<script>alert("Hello")</script>');
  const [mode, setMode] = useState('encode');

  const entities = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['&', '&amp;'],
    ['"', '&quot;'],
    ["'", '&#39;'],
    ['©', '&copy;'],
    ['®', '&reg;'],
    ['€', '&euro;'],
    ['£', '&pound;'],
    ['¥', '&yen;'],
    ['¢', '&cent;'],
    ['°', '&deg;'],
    ['±', '&plusmn;'],
    ['×', '&times;'],
    ['÷', '&divide;'],
    ['²', '&sup2;'],
    ['³', '&sup3;'],
  ];

  const result = useMemo(() => {
    if (!input) return { output: '', valid: true };

    try {
      if (mode === 'encode') {
        let output = input;
        for (const [char, entity] of entities) {
          output = output.split(char).join(entity);
        }
        return { output, valid: true };
      }
      let output = input;
      for (const [char, entity] of entities) {
        output = output.split(entity).join(char);
      }
      output = output.replace(/&#(\d+);/g, (match, num) => String.fromCharCode(parseInt(num, 10)));
      output = output.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
      return { output, valid: true };
    } catch {
      return { output: '', error: 'Conversion failed', valid: false };
    }
  }, [input, mode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    { input: '<div>Hello</div>', desc: 'HTML tags' },
    { input: 'Tom & Jerry', desc: 'Ampersand' },
    { input: '"Hello World"', desc: 'Quotes' },
    { input: '© 2024 Company', desc: 'Copyright' },
    { input: '&lt;script&gt;', desc: 'Decode example' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTML Entity Encoder & Decoder</h1>
      <p className="text-zinc-600">Encode HTML special characters to entities, decode entities back to characters. Prevent XSS, display symbols, sanitize user input.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Mode</label>
          <div className="flex gap-2">
            <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded ${mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Encode</button>
            <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded ${mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Decode</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">{mode === 'encode' ? 'Text to Encode' : 'HTML Entities to Decode'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-20 p-3 border rounded-lg font-mono text-sm resize-none" placeholder={mode === 'encode' ? 'Enter text...' : 'Enter encoded HTML...'} />
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
        <div className="grid grid-cols-2 gap-2 text-xs">
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setInput(ex.input)} className="bg-white rounded p-2 hover:bg-zinc-100 text-left">
              <div className="font-mono text-blue-600 truncate">{ex.input}</div>
              <div className="text-zinc-500">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common HTML Entities</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {entities.slice(0, 12).map(([char, entity]) => (
            <div key={entity} className="bg-white rounded p-2">
              <span className="text-blue-600">{char}</span> → <span className="text-green-600">{entity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Entity Formats</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Named Entities</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">&amp;</span> Ampersand</div>
              <div><span className="text-blue-600">&lt;</span> Less than</div>
              <div><span className="text-blue-600">&gt;</span> Greater than</div>
              <div><span className="text-blue-600">&copy;</span> Copyright</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Numeric Entities</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">&#60;</span> Decimal code</div>
              <div><span className="text-blue-600">&#x3C;</span> Hex code</div>
              <div><span className="text-blue-600">&#128;</span> Emoji support</div>
              <div><span className="text-blue-600">&#x1F600;</span> Hex emoji</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Why Encode?</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Prevent XSS attacks</div>
              <div>Display in HTML context</div>
              <div>Sanitize user input</div>
              <div>Show code examples</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium text-yellow-700 mb-2">Security Note</h3>
        <div className="text-xs space-y-1">
          <div>Encoding HTML entities prevents XSS by making &lt;script&gt; display as text instead of executing.</div>
          <div>Always encode user input before displaying in HTML.</div>
          <div>Use Content Security Policy (CSP) for additional protection.</div>
        </div>
      </div>
    </main>
  );
}