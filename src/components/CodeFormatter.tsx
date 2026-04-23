'use client'

import { useState, useMemo } from 'react';

export default function CodeFormatter() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [indentSize, setIndentSize] = useState(2);

  const formatted = useMemo(() => {
    if (!code.trim()) return { output: '', valid: true };

    try {
      let output = code;

      // Basic formatting - normalize whitespace
      output = output.replace(/\r\n/g, '\n'); // Normalize line endings

      if (language === 'javascript' || language === 'typescript') {
        // JS/TS formatting
        output = output
          .replace(/\s*{\s*/g, ' {\n')  // Space before braces
          .replace(/\s*}\s*/g, '\n}\n') // Closing braces
          .replace(/;\s*/g, ';\n')      // Statement ends
          .replace(/,\s*/g, ', ')       // Comma spacing
          .replace(/\s*=\s*/g, ' = ')   // Assignment
          .replace(/\s*:\s*/g, ': ')    // Colon spacing (objects)
          .replace(/\n\s*\n\s*\n/g, '\n\n') // Multiple blank lines
          .replace(/^\s+|\s+$/gm, '');  // Trim lines
      } else if (language === 'python') {
        // Python formatting
        output = output
          .replace(/\s*:\s*(?!['"])/g, ':\n')  // Block starts
          .replace(/\s*=\s*/g, ' = ')          // Assignment
          .replace(/,\s*/g, ', ')              // Comma spacing
          .replace(/\n\s*\n\s*\n/g, '\n\n')
          .replace(/^\s+|\s+$/gm, '');
      } else if (language === 'json') {
        // JSON formatting
        const parsed = JSON.parse(output);
        output = JSON.stringify(parsed, null, indentSize);
      } else if (language === 'html') {
        // HTML formatting
        output = output
          .replace(/>\s*</g, '>\n<')      // Tag spacing
          .replace(/<(\w+)([^>]*)>/g, (match, tag, attrs) => {
            if (attrs.length > 50) {
              const attrParts = attrs.trim().split(/\s+/);
              return `<${tag}\n  ${attrParts.join('\n  ')}>`;
            }
            return match;
          })
          .replace(/\n\s*\n\s*\n/g, '\n\n');
      }

      // Apply indentation
      const lines = output.split('\n');
      let indentLevel = 0;
      const formattedLines = lines.map(line => {
        if (line.trim().startsWith('}') || line.trim().startsWith(']')) indentLevel--;
        const result = ' '.repeat(Math.max(0, indentLevel) * indentSize) + line.trim();
        if (line.trim().endsWith('{') || line.trim().endsWith('[')) indentLevel++;
        return result;
      });

      return { output: formattedLines.join('\n'), valid: true };
    } catch {
      return { output: '', error: 'Invalid syntax', valid: false };
    }
  }, [code, language, indentSize]);

  const copyCode = () => {
    navigator.clipboard.writeText(formatted.output);
  };

  const examples: Record<string, string> = {
    javascript: 'function hello() {const x=1;return {a:1,b:2}}',
    python: 'def hello():x=1;return{"a":1,"b":2}',
    json: '{"name":"test","items":[1,2,3]}',
    html: '<div class="test"><p>Hello</p></div>',
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Formatter</h1>
      <p className="text-zinc-600">Format and beautify code with proper indentation. Support for JavaScript, Python, JSON, HTML. Improve code readability for review and documentation.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Language</label>
          <div className="flex gap-2">
            {['javascript', 'typescript', 'python', 'json', 'html'].map((lang) => (
              <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-2 rounded ${language === lang ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {lang}
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
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input Code</label>
          <textarea value={code} onChange={e => setCode(e.target.value)} className="w-full h-32 p-3 border rounded-lg font-mono text-sm resize-none" placeholder="Paste code to format..." />
        </div>

        <div className="flex gap-2">
          <button onClick={() => setCode(examples[language] || examples.javascript)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Example</button>
          <button onClick={() => setCode('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
        </div>
      </div>

      {formatted.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Formatted Code</h3>
            <button onClick={copyCode} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap">{formatted.output}</pre>
          <div className="text-xs text-zinc-500 mt-2">
            {formatted.output.split('\n').length} lines, {formatted.output.length} characters
          </div>
        </div>
      )}

      {formatted.error && (
        <div className="card bg-red-50 p-4">
          <div className="text-red-600">{formatted.error}</div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Formatting Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">JavaScript/TS</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Braces on same line</div>
              <div>Consistent indentation</div>
              <div>Statement spacing</div>
              <div>Object literal style</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Python</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>4-space indent (PEP8)</div>
              <div>Block after colon</div>
              <div>No semicolons</div>
              <div>Space around operators</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">JSON</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>2 or 4 space indent</div>
              <div>Key-value spacing</div>
              <div>Array formatting</div>
              <div>Strict syntax</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">HTML</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Tag line breaks</div>
              <div>Attribute alignment</div>
              <div>Nested indentation</div>
              <div>Close tag spacing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Professional Tools</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Prettier:</span> JS/TS/JSON formatter</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Black:</span> Python formatter</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">ESLint:</span> JS linting + fix</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">autopep8:</span> Python PEP8 fix</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Review:</span> Clean up messy code</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Docs:</span> Format examples</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Learning:</span> See proper style</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Debug:</span> Readable error code</div>
        </div>
      </div>
    </main>
  );
}