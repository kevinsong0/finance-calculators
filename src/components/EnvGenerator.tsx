'use client'

import { useState } from 'react';

export default function EnvGenerator() {
  const [variables, setVariables] = useState<{ key: string; value: string }[]>([
    { key: 'DATABASE_URL', value: '' },
    { key: 'API_KEY', value: '' },
  ]);
  const [format, setFormat] = useState('dotenv');

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: 'key' | 'value', newValue: string) => {
    const updated = [...variables];
    updated[index][field] = newValue;
    setVariables(updated);
  };

  const generateOutput = () => {
    if (format === 'dotenv') {
      return variables
        .filter(v => v.key.trim())
        .map(v => `${v.key}=${v.value}`)
        .join('\n');
    } else if (format === 'json') {
      const obj: Record<string, string> = {};
      variables.filter(v => v.key.trim()).forEach(v => {
        obj[v.key] = v.value;
      });
      return JSON.stringify(obj, null, 2);
    } else if (format === 'yaml') {
      return variables
        .filter(v => v.key.trim())
        .map(v => `${v.key}: "${v.value}"`)
        .join('\n');
    } else if (format === 'bash') {
      return variables
        .filter(v => v.key.trim())
        .map(v => `export ${v.key}="${v.value}"`)
        .join('\n');
    }
    return '';
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(generateOutput());
  };

  const templates = [
    { name: 'Node.js', vars: ['NODE_ENV=development', 'PORT=3000', 'DATABASE_URL=', 'JWT_SECRET='] },
    { name: 'Python', vars: ['PYTHON_ENV=development', 'DEBUG=True', 'DATABASE_URL=', 'SECRET_KEY='] },
    { name: 'React', vars: ['REACT_APP_API_URL=', 'REACT_APP_ENV=development'] },
    { name: 'Django', vars: ['DJANGO_SETTINGS_MODULE=myproject.settings', 'DEBUG=True', 'ALLOWED_HOSTS=localhost', 'DATABASE_URL='] },
  ];

  const loadTemplate = (template: typeof templates[0]) => {
    setVariables(template.vars.map(v => {
      const [key, value] = v.split('=');
      return { key, value: value || '' };
    }));
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Environment Variable Generator</h1>
      <p className="text-zinc-600">Generate .env files, JSON, YAML, and bash export statements for your project configuration. Quick setup for Node.js, Python, React, Django projects.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Output Format</label>
          <div className="flex gap-2">
            {['dotenv', 'json', 'yaml', 'bash'].map((f) => (
              <button key={f} onClick={() => setFormat(f)} className={`px-3 py-2 rounded ${format === f ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {f === 'dotenv' ? '.env' : f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Quick Templates</label>
          <div className="flex gap-2">
            {templates.map((t) => (
              <button key={t.name} onClick={() => loadTemplate(t)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Variables</label>
          <div className="space-y-2">
            {variables.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={v.key}
                  onChange={e => updateVariable(i, 'key', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="KEY"
                />
                <input
                  type="text"
                  value={v.value}
                  onChange={e => updateVariable(i, 'value', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="value"
                />
                <button onClick={() => removeVariable(i)} className="px-3 py-2 bg-red-100 rounded hover:bg-red-200 text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button onClick={addVariable} className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 text-sm">
            Add Variable
          </button>
        </div>
      </div>

      {generateOutput() && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Generated Output</h3>
            <button onClick={copyOutput} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap">{generateOutput()}</pre>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Format Details</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">.env (dotenv)</div>
            <div className="bg-white rounded p-2">
              <div>KEY=value format</div>
              <div>One per line</div>
              <div>No quotes needed</div>
              <div>Node.js, Python standard</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">JSON</div>
            <div className="bg-white rounded p-2">
              <div>{"{ \"KEY\": \"value\" }"}</div>
              <div>Strict syntax</div>
              <div>Quoted strings</div>
              <div>For JS configs</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">YAML</div>
            <div className="bg-white rounded p-2">
              <div>KEY: "value"</div>
              <div>Indentation-based</div>
              <div>Kubernetes, Ansible</div>
              <div>Docker Compose</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Bash</div>
            <div className="bg-white rounded p-2">
              <div>export KEY="value"</div>
              <div>Shell scripts</div>
              <div>CI/CD pipelines</div>
              <div>Sourceable files</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Tips</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Never commit:</span> .env files to git</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Use .env.example:</span> Template with empty values</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Secrets managers:</span> Vault, AWS Secrets</div>
        </div>
      </div>
    </main>
  );
}