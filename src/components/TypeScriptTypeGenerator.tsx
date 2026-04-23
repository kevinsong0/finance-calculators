'use client'

import { useState } from 'react';

export default function TypeScriptTypeGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [typeName, setTypeName] = useState('MyType');
  const [error, setError] = useState('');

  const generateType = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const typeStr = generateFromValue(parsed, typeName);
      setOutput(typeStr);
    } catch (e) {
      setError('Invalid JSON input');
      setOutput('');
    }
  };

  const generateFromValue = (value: unknown, name: string): string => {
    if (value === null) {
      return `type ${name} = null;`;
    } else if (typeof value === 'string') {
      return `type ${name} = string;`;
    } else if (typeof value === 'number') {
      return `type ${name} = number;`;
    } else if (typeof value === 'boolean') {
      return `type ${name} = boolean;`;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        return `type ${name} = unknown[];`;
      }
      const itemType = inferArrayType(value);
      return `type ${name} = ${itemType}[];`;
    } else if (typeof value === 'object') {
      const lines: string[] = [`interface ${name} {`];
      const obj = value as Record<string, unknown>;
      for (const [key, val] of Object.entries(obj)) {
        const valueType = getTypeName(val);
        lines.push(`  ${key}: ${valueType};`);
      }
      lines.push('}');

      // Generate nested interfaces
      const nestedTypes: string[] = [];
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          nestedTypes.push(generateFromValue(val, capitalize(key)));
        }
      }

      return nestedTypes.length > 0 ? nestedTypes.join('\n\n') + '\n\n' + lines.join('\n') : lines.join('\n');
    }
    return `type ${name} = unknown;`;
  };

  const getTypeName = (value: unknown): string => {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]';
      return inferArrayType(value);
    }
    if (typeof value === 'object') {
      // Reference nested type
      const obj = value as Record<string, unknown>;
      const firstKey = Object.keys(obj)[0];
      return capitalize(firstKey || 'Object');
    }
    return 'unknown';
  };

  const inferArrayType = (arr: unknown[]): string => {
    const types = new Set(arr.map(item => getTypeName(item)));
    if (types.size === 1) {
      return Array.from(types)[0];
    }
    return Array.from(types).join(' | ');
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const examples = [
    '{"name": "John", "age": 30, "email": "john@example.com"}',
    '{"user": {"id": 1, "profile": {"bio": "text"}}, "posts": [{"title": "Hello"}]}',
    '{"items": [1, 2, 3], "tags": ["a", "b"]}',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">TypeScript Type Generator</h1>
      <p className="text-zinc-600">Generate TypeScript interfaces and types from JSON data. Paste JSON to auto-generate TypeScript definitions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Input JSON</h3>
        <div className="mb-2">
          <label className="text-sm text-zinc-600">Type/Interface Name:</label>
          <input
            type="text"
            className="ml-2 p-1 border rounded text-sm"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />
        </div>
        <textarea
          className="w-full h-40 p-3 border rounded font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
        />
        <div className="mt-2 flex gap-2">
          <button onClick={generateType} className="btn-primary">Generate Type</button>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setInput(ex)} className="btn-secondary text-xs">Example {i + 1}</button>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated TypeScript</h3>
        <textarea
          className="w-full h-60 p-3 border rounded font-mono text-sm bg-white"
          value={output}
          readOnly
        />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy Type</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">TypeScript Types Reference</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><code>string</code> - Text values</div>
          <div className="bg-white rounded p-2"><code>number</code> - Numeric values</div>
          <div className="bg-white rounded p-2"><code>boolean</code> - true/false</div>
          <div className="bg-white rounded p-2"><code>null</code> - Null values</div>
          <div className="bg-white rounded p-2"><code>Type[]</code> - Arrays</div>
          <div className="bg-white rounded p-2"><code>interface</code> - Objects</div>
          <div className="bg-white rounded p-2"><code>Type | Type</code> - Union types</div>
          <div className="bg-white rounded p-2"><code>unknown</code> - Unknown type</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="text-xs text-zinc-600">
          API response types, configuration types, database model types, form data types, JSON to TypeScript conversion, type safety for external data.
        </div>
      </div>
    </main>
  );
}