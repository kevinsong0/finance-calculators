'use client'

import { useState, useMemo } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('{\n  "name": "Example",\n  "value": 123,\n  "items": ["a", "b", "c"]\n}');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [showTypes, setShowTypes] = useState(true);

  const formatted = useMemo(() => {
    if (!input.trim()) return { valid: false, error: 'Empty input' };

    try {
      let parsed = JSON.parse(input);

      if (sortKeys && typeof parsed === 'object' && !Array.isArray(parsed)) {
        parsed = sortObjectKeys(parsed);
      }

      const formatted = JSON.stringify(parsed, null, indentSize);
      return { valid: true, formatted, parsed };
    } catch (e) {
      return { valid: false, error: (e as Error).message };
    }
  }, [input, indentSize, sortKeys]);

  const minified = useMemo(() => {
    if (!formatted.valid || !formatted.formatted) return '';

    try {
      const parsed = JSON.parse(formatted.formatted);
      return JSON.stringify(parsed);
    } catch {
      return '';
    }
  }, [formatted]);

  const stats = useMemo(() => {
    if (!formatted.valid || !formatted.parsed) return null;

    const analyze = (obj: unknown, depth = 0): { keys: number; values: number; maxDepth: number; types: Record<string, number> } => {
      const result = { keys: 0, values: 0, maxDepth: depth, types: {} as Record<string, number> };

      if (Array.isArray(obj)) {
        result.types['array'] = (result.types['array'] || 0) + 1;
        for (const item of obj) {
          const sub = analyze(item, depth + 1);
          result.keys += sub.keys;
          result.values += sub.values + 1;
          result.maxDepth = Math.max(result.maxDepth, sub.maxDepth);
          for (const [t, c] of Object.entries(sub.types)) {
            result.types[t] = (result.types[t] || 0) + c;
          }
        }
      } else if (typeof obj === 'object' && obj !== null) {
        result.types['object'] = (result.types['object'] || 0) + 1;
        for (const key of Object.keys(obj)) {
          result.keys += 1;
          const sub = analyze((obj as Record<string, unknown>)[key], depth + 1);
          result.values += sub.values;
          result.maxDepth = Math.max(result.maxDepth, sub.maxDepth);
          for (const [t, c] of Object.entries(sub.types)) {
            result.types[t] = (result.types[t] || 0) + c;
          }
        }
      } else {
        const type = typeof obj;
        result.types[type] = (result.types[type] || 0) + 1;
        result.values = 1;
      }

      return result;
    };

    const analysis = analyze(formatted.parsed);
    return {
      ...analysis,
      size: JSON.stringify(formatted.parsed).length,
      formattedSize: (formatted.formatted ?? '').length,
      minifiedSize: minified.length,
    };
  }, [formatted, minified]);

  const sortObjectKeys = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sorted: Record<string, unknown> = {};
      const keys = Object.keys(obj).sort();
      for (const key of keys) {
        sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      }
      return sorted;
    }
    return obj;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examples = [
    '{ "name": "API Response", "success": true, "data": { "users": [{ "id": 1, "name": "John" }] } }',
    '[1, 2, 3, { "nested": true }, null]',
    '{ "products": [{ "id": 1, "price": 29.99, "tags": ["sale", "popular"] }] }',
  ];

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">JSON Formatter & Validator</h1>
      <p className="text-zinc-600">Format, validate, and analyze JSON data. Beautify messy JSON, minify for production, view structure statistics.</p>

      <div className="card space-y-4">
        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Format Options</label>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-zinc-600">Indent:</span>
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => setIndentSize(size)}
                  className={`px-3 py-1 rounded ${indentSize === size ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-zinc-600">Sort keys alphabetically</span>
            </label>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
            placeholder="Paste JSON here..."
          />
          {formatted.valid === false && (
            <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
              <span className="font-medium">Invalid JSON:</span>
              {formatted.error}
            </div>
          )}
        </div>

        {/* Quick Examples */}
        <div className="flex gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex)}
              className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
            >
              Example {i + 1}
            </button>
          ))}
          <button
            onClick={() => setInput('')}
            className="px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Formatted Output */}
      {formatted.valid && formatted.formatted && (
        <div className="card bg-blue-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Formatted JSON</h3>
            <button
              onClick={() => copyToClipboard(formatted.formatted)}
              className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100"
            >
              Copy
            </button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap break-all">
            {formatted.formatted}
          </pre>
        </div>
      )}

      {/* Minified */}
      {formatted.valid && minified && (
        <div className="card bg-zinc-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Minified JSON</h3>
            <button
              onClick={() => copyToClipboard(minified)}
              className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100"
            >
              Copy
            </button>
          </div>
          <div className="bg-white rounded p-3 font-mono text-sm break-all overflow-auto max-h-24">
            {minified}
          </div>
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Structure Statistics</h3>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Total Keys</div>
              <div className="font-bold text-lg">{stats.keys}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Values</div>
              <div className="font-bold text-lg">{stats.values}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Max Depth</div>
              <div className="font-bold text-lg">{stats.maxDepth}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Size (bytes)</div>
              <div className="font-bold text-lg">{stats.minifiedSize}</div>
            </div>
          </div>
          {showTypes && (
            <div className="mt-2">
              <div className="text-xs text-zinc-500 mb-1">Type Distribution</div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(stats.types).map(([type, count]) => (
                  <span key={type} className="bg-white px-2 py-1 rounded text-xs">
                    <span className="text-blue-600 font-medium">{type}</span>: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* JSON Path Examples */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JSON Path Quick Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Basic Access</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">.key</span> Access object key</div>
              <div><span className="text-blue-600">[0]</span> Access array index</div>
              <div><span className="text-blue-600">.*.key</span> All items&apos; key</div>
              <div><span className="text-blue-600">..key</span> Recursive find</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Filters</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">[?(@.price&lt;10)]</span> Filter</div>
              <div><span className="text-blue-600">[:3]</span> First 3 items</div>
              <div><span className="text-blue-600">[-1:]</span> Last item</div>
              <div><span className="text-blue-600">[0,2,4]</span> Specific indices</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Tools Using JSON</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-purple-600">jq</span> CLI JSON processor</div>
              <div><span className="text-green-600">JSON.parse()</span> JavaScript</div>
              <div><span className="text-orange-600">json.load()</span> Python</div>
              <div><span className="text-teal-600">Jackson/Gson</span> Java libraries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">API Debug:</span> Format API responses
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Config Files:</span> Validate JSON configs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Data Analysis:</span> Inspect structure
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Minify:</span> Reduce payload size
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Error Find:</span> Locate syntax errors
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Learning:</span> Understand JSON format
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Migration:</span> Transform data
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Documentation:</span> Pretty print samples
          </div>
        </div>
      </div>
    </main>
  );
}