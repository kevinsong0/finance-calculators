'use client'

import { useState, useMemo } from 'react';

export default function YAMLFormatter() {
  const [yaml, setYAML] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const parsed = useMemo(() => {
    if (!yaml.trim()) return { valid: true, output: '' };

    try {
      // Basic YAML validation and formatting
      const lines = yaml.split('\n');
      const formattedLines: string[] = [];
      let currentIndent = 0;
      let errors: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
          formattedLines.push('');
          continue;
        }

        // Check for comments
        if (trimmed.startsWith('#')) {
          formattedLines.push(trimmed);
          continue;
        }

        // Check indentation consistency
        const actualIndent = line.search(/\S/);
        if (actualIndent % indentSize !== 0 && actualIndent !== 0) {
          errors.push(`Line ${i + 1}: Indentation not multiple of ${indentSize}`);
        }

        // Calculate expected indentation based on structure
        if (trimmed.endsWith(':') && !trimmed.includes(': ')) {
          // Key only (dict start)
          const spaces = ' '.repeat(currentIndent * indentSize);
          formattedLines.push(spaces + trimmed);
          currentIndent++;
        } else if (trimmed.includes(': ')) {
          // Key: value
          const spaces = ' '.repeat(currentIndent * indentSize);
          formattedLines.push(spaces + trimmed);
        } else if (trimmed.startsWith('- ')) {
          // List item
          const spaces = ' '.repeat((currentIndent - 1) * indentSize);
          formattedLines.push(spaces + trimmed);
        } else {
          formattedLines.push(trimmed);
        }

        // Decrease indent for closing structures
        if (!trimmed.includes(':') && !trimmed.startsWith('-')) {
          currentIndent = Math.max(0, currentIndent - 1);
        }
      }

      return {
        valid: errors.length === 0,
        output: formattedLines.join('\n'),
        errors
      };
    } catch (e) {
      return { valid: false, output: '', errors: ['Parse error'] };
    }
  }, [yaml, indentSize]);

  const copyYAML = () => {
    navigator.clipboard.writeText(parsed.output);
  };

  const examples = {
    config: `server:
  port: 3000
  host: localhost
database:
  url: postgres://localhost:5432/mydb
  pool: 10
logging:
  level: info
  format: json`,
    kubernetes: `apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80`,
    docker: `version: "3.8"
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret`,
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">YAML Formatter & Validator</h1>
      <p className="text-zinc-600">Validate and format YAML configuration files. Check indentation, structure, and syntax. Support for Kubernetes, Docker Compose, and config files.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Examples</label>
          <div className="flex gap-2">
            {Object.entries(examples).map(([key]) => (
              <button key={key} onClick={() => setYAML(examples[key as keyof typeof examples])} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {key === 'config' ? 'Config' : key === 'kubernetes' ? 'K8s' : 'Docker'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Indent Size</label>
          <div className="flex gap-2">
            {[2, 4].map((size) => (
              <button key={size} onClick={() => setIndentSize(size)} className={`px-3 py-1 rounded ${indentSize === size ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {size} spaces
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input YAML</label>
          <textarea
            value={yaml}
            onChange={e => setYAML(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste YAML here..."
          />
        </div>

        <div className="flex gap-2">
          <button onClick={() => setYAML('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
        </div>
      </div>

      {parsed.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Formatted YAML</h3>
            <button onClick={copyYAML} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap">{parsed.output}</pre>
          <div className="text-xs text-zinc-500 mt-2">
            {parsed.output.split('\n').length} lines
          </div>
        </div>
      )}

      {parsed.errors && parsed.errors.length > 0 && (
        <div className="card bg-red-50 p-4">
          <h3 className="font-medium text-red-700 mb-2">Validation Errors</h3>
          <div className="space-y-1 text-sm text-red-600">
            {parsed.errors.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        </div>
      )}

      {parsed.valid && yaml.trim() && (
        <div className="card bg-green-50 p-4">
          <div className="text-green-700 font-medium">Valid YAML structure</div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">YAML Syntax Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Indentation</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Use spaces (not tabs)</div>
              <div>Consistent indent size</div>
              <div>2 or 4 spaces common</div>
              <div>Nested items indented</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Key: Value</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>key: value (space after colon)</div>
              <div>Strings don't need quotes</div>
              <div>Quotes for special chars</div>
              <div>Colons in values need quotes</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Lists</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>- item (hyphen + space)</div>
              <div>Each item on new line</div>
              <div>Same indentation level</div>
              <div>Can contain objects</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Comments</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div># comment</div>
              <div>Anywhere in file</div>
              <div>Ignored by parser</div>
              <div>Good for documentation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common YAML Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Kubernetes:</span> K8s manifests</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Docker Compose:</span> Service configs</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Ansible:</span> Playbooks</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">CI/CD:</span> GitHub Actions</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Config:</span> App settings</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">CloudFormation:</span> AWS templates</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Terraform:</span> HCL alternative</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Swagger:</span> API specs</div>
        </div>
      </div>
    </main>
  );
}