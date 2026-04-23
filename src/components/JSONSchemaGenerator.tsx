'use client'

import { useState } from 'react';

export default function JSONSchemaGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const generateSchema = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      const schema = generateFromValue(parsed);
      setOutput(JSON.stringify(schema, null, 2));
    } catch (e) {
      setError('Invalid JSON input');
      setOutput('');
    }
  };

  const generateFromValue = (value: unknown): Record<string, unknown> => {
    const schema: Record<string, unknown> = {};

    if (value === null) {
      schema.type = 'null';
    } else if (typeof value === 'string') {
      schema.type = 'string';
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) schema.format = 'date-time';
      if (/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) schema.format = 'email';
      if (/^https?:\/\//.test(value)) schema.format = 'uri';
    } else if (typeof value === 'number') {
      schema.type = Number.isInteger(value) ? 'integer' : 'number';
    } else if (typeof value === 'boolean') {
      schema.type = 'boolean';
    } else if (Array.isArray(value)) {
      schema.type = 'array';
      if (value.length > 0) {
        schema.items = generateFromValue(value[0]);
      } else {
        schema.items = {};
      }
    } else if (typeof value === 'object') {
      schema.type = 'object';
      const properties: Record<string, unknown> = {};
      const required: string[] = [];
      for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
        properties[key] = generateFromValue(val);
        required.push(key);
      }
      schema.properties = properties;
      schema.required = required;
    }

    return schema;
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const examples = [
    '{"name": "John", "age": 30, "email": "john@example.com"}',
    '{"id": 1, "items": [{"name": "Product", "price": 9.99}]}',
    '{"date": "2024-01-15", "active": true}',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">JSON Schema Generator</h1>
      <p className="text-zinc-600">Generate JSON Schema from JSON data. Paste JSON to auto-generate schema definitions for API validation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Input JSON</h3>
        <textarea
          className="w-full h-40 p-3 border rounded font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
        />
        <div className="mt-2 flex gap-2">
          <button onClick={generateSchema} className="btn-primary">Generate Schema</button>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setInput(ex)} className="btn-secondary text-xs">Example {i + 1}</button>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated JSON Schema</h3>
        <textarea
          className="w-full h-60 p-3 border rounded font-mono text-sm bg-white"
          value={output}
          readOnly
        />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy Schema</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JSON Schema Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><code>string</code> - Text values</div>
          <div className="bg-white rounded p-2"><code>number</code> - Floating point</div>
          <div className="bg-white rounded p-2"><code>integer</code> - Whole numbers</div>
          <div className="bg-white rounded p-2"><code>boolean</code> - true/false</div>
          <div className="bg-white rounded p-2"><code>array</code> - Lists of items</div>
          <div className="bg-white rounded p-2"><code>object</code> - Key-value pairs</div>
          <div className="bg-white rounded p-2"><code>null</code> - Null values</div>
          <div className="bg-white rounded p-2"><code>format</code> - email, uri, date-time</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="text-xs text-zinc-600">
          API request/response validation, form validation, OpenAPI/Swagger specs, database schema design, configuration validation, type safety for JSON configs.
        </div>
      </div>
    </main>
  );
}