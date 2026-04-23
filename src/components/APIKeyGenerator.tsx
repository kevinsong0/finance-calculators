'use client'

import { useState } from 'react';

export default function APIKeyGenerator() {
  const [length, setLength] = useState(32);
  const [prefix, setPrefix] = useState('');
  const [format, setFormat] = useState<'hex' | 'base64' | 'uuid' | 'alphanumeric'>('hex');
  const [keys, setKeys] = useState<string[]>([]);

  const generateKey = () => {
    let key = '';
    const chars = {
      hex: '0123456789abcdef',
      base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      uuid: '0123456789abcdef',
      alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    };

    if (format === 'uuid') {
      // Generate UUID format
      key = generateUUID();
    } else {
      const charset = chars[format];
      for (let i = 0; i < length; i++) {
        key += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    if (prefix) {
      key = prefix + '_' + key;
    }

    setKeys([...keys, key]);
  };

  const generateUUID = (): string => {
    const hex = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        uuid += '4'; // Version 4
      } else if (i === 19) {
        uuid += hex[(8 + Math.floor(Math.random() * 4))]; // Variant
      } else {
        uuid += hex[Math.floor(Math.random() * 16)];
      }
    }
    return uuid;
  };

  const generateMultiple = (count: number) => {
    const newKeys: string[] = [];
    for (let i = 0; i < count; i++) {
      newKeys.push(generateSingleKey());
    }
    setKeys([...keys, ...newKeys]);
  };

  const generateSingleKey = (): string => {
    const chars = {
      hex: '0123456789abcdef',
      base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      uuid: '0123456789abcdef',
      alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    };

    let key = '';
    if (format === 'uuid') {
      key = generateUUID();
    } else {
      const charset = chars[format];
      for (let i = 0; i < length; i++) {
        key += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    if (prefix) {
      key = prefix + '_' + key;
    }
    return key;
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(keys.join('\n'));
  };

  const clearKeys = () => {
    setKeys([]);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Key Generator</h1>
      <p className="text-zinc-600">Generate secure API keys for your applications. Multiple formats: hex, base64, UUID, alphanumeric. Add custom prefix.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Configuration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-zinc-600">Format</label>
            <select className="w-full p-2 border rounded" value={format} onChange={(e) => setFormat(e.target.value as 'hex' | 'base64' | 'uuid' | 'alphanumeric')}>
              <option value="hex">Hexadecimal</option>
              <option value="base64">Base64</option>
              <option value="uuid">UUID v4</option>
              <option value="alphanumeric">Alphanumeric</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-600">Length</label>
            <input type="number" className="w-full p-2 border rounded" value={length} onChange={(e) => setLength(parseInt(e.target.value) || 32)} min={16} max={128} disabled={format === 'uuid'} />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Prefix</label>
            <input type="text" className="w-full p-2 border rounded" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="sk_" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generate Keys</h3>
        <div className="flex gap-2">
          <button onClick={generateKey} className="btn-primary">Generate One</button>
          <button onClick={() => generateMultiple(5)} className="btn-secondary">Generate 5</button>
          <button onClick={() => generateMultiple(10)} className="btn-secondary">Generate 10</button>
        </div>
      </div>

      {keys.length > 0 && (
        <div className="card bg-zinc-50">
          <h3 className="font-medium mb-2">Generated Keys ({keys.length})</h3>
          <div className="space-y-1 text-xs">
            {keys.map((key, i) => (
              <div key={i} className="bg-white rounded p-2 flex justify-between items-center">
                <span className="font-mono truncate">{key}</span>
                <button onClick={() => copyKey(key)} className="btn-secondary text-xs ml-2">Copy</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={copyAll} className="btn-secondary">Copy All</button>
            <button onClick={clearKeys} className="btn-secondary">Clear</button>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Format Examples</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><strong>Hex:</strong> a1b2c3d4e5f6...</div>
          <div className="bg-white rounded p-2"><strong>Base64:</strong> AbCdEf123456...</div>
          <div className="bg-white rounded p-2"><strong>UUID:</strong> 123e4567-e89b-12d3...</div>
          <div className="bg-white rounded p-2"><strong>Alphanumeric:</strong> Abc123XYZ...</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="text-xs text-zinc-600">
          Use 32+ character keys for security. Store hashed, never plaintext. Add prefix for identification (sk_, pk_, api_). Rotate keys regularly. Use different keys per environment. Never expose in client code. Implement rate limiting per key. Log key usage for audit.
        </div>
      </div>
    </main>
  );
}