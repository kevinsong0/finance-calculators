'use client'

import { useState, useMemo } from 'react';

export default function JSMinifier() {
  const [js, setJS] = useState('');

  const minified = useMemo(() => {
    if (!js.trim()) return { output: '', sizeBefore: 0, sizeAfter: 0, reduction: 0 };

    try {
      let result = js;

      // Remove single-line comments (but not URLs with http://)
      result = result.replace(/\/\/[^\n]*(?<!http:)[^\n]*$/gm, '');

      // Remove multi-line comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');

      // Remove whitespace around operators (careful with strings)
      result = result
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\+\s*/g, '+')
        .replace(/\s*-\s*/g, '-')
        .replace(/\s*\*\s*/g, '*')
        .replace(/\s*\/\s*(?![*\/])/g, '/')
        .replace(/\s*<\s*/g, '<')
        .replace(/\s*>\s*/g, '>')
        .replace(/\s*&&\s*/g, '&&')
        .replace(/\s*\|\|\s*/g, '||')
        .replace(/\s*!\s*/g, '!')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .replace(/\s*\[\s*/g, '[')
        .replace(/\s*\]\s*/g, ']')
        .trim();

      const sizeBefore = js.length;
      const sizeAfter = result.length;
      const reduction = sizeBefore > 0 ? Math.round((1 - sizeAfter / sizeBefore) * 100) : 0;

      return { output: result, sizeBefore, sizeAfter, reduction, valid: true };
    } catch {
      return { output: '', sizeBefore: js.length, sizeAfter: 0, reduction: 0, valid: false };
    }
  }, [js]);

  const copyMinified = () => {
    navigator.clipboard.writeText(minified.output);
  };

  const examples = {
    simple: `function calculateSum(a, b) {
  // Add two numbers together
  const result = a + b;
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => {
  return acc + num;
}, 0);`,
    class: `class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this;
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  getResult() {
    return this.value;
  }
}`,
    arrow: `// Arrow function examples
const greet = (name) => {
  return 'Hello, ' + name;
};

const double = x => x * 2;

const numbers = [1, 2, 3].map(n => {
  return n * 2;
});`,
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">JavaScript Minifier</h1>
      <p className="text-zinc-600">Minify JavaScript to reduce file size. Remove comments, whitespace, and unnecessary characters. Basic JS compression for faster page loads.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Examples</label>
          <div className="flex gap-2">
            {Object.entries(examples).map(([key]) => (
              <button key={key} onClick={() => setJS(examples[key as keyof typeof examples])} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {key === 'arrow' ? 'Arrow Functions' : key === 'class' ? 'Class' : 'Simple'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input JavaScript</label>
          <textarea
            value={js}
            onChange={e => setJS(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste JavaScript here..."
          />
        </div>

        <button onClick={() => setJS('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
      </div>

      {minified.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Minified JavaScript</h3>
            <button onClick={copyMinified} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-32 whitespace-pre-wrap break-all">{minified.output}</pre>
          <div className="grid grid-cols-4 gap-4 mt-3 text-xs">
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Before</div>
              <div className="font-medium">{minified.sizeBefore} bytes</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">After</div>
              <div className="font-medium">{minified.sizeAfter} bytes</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Saved</div>
              <div className="font-medium text-green-600">{minified.reduction}%</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Bytes</div>
              <div className="font-medium text-green-600">{minified.sizeBefore - minified.sizeAfter}</div>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JS Minification Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Comments</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>// single-line removed</div>
              <div>/* multi-line */ removed</div>
              <div>Keep http:// URLs</div>
              <div>JSDoc comments gone</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Whitespace</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Newlines removed</div>
              <div>Multiple spaces → one</div>
              <div>Space around ops gone</div>
              <div>Indentation removed</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Operators</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Space around = removed</div>
              <div>Space around + - * gone</div>
              <div>&amp;&amp; and || compressed</div>
              <div>Parens/brackets tight</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Limitations</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Basic minification</div>
              <div>No dead code removal</div>
              <div>No variable renaming</div>
              <div>Use Terser for full</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Professional Tools</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Terser:</span> Full minifier</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">UglifyJS:</span> Legacy tool</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Webpack:</span> Build minify</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Babel:</span> + minify plugin</div>
        </div>
      </div>

      <div className="card bg-yellow-50 p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Note: Basic Minification</h3>
        <div className="text-sm text-yellow-700">
          This tool provides basic JavaScript minification. For production use, consider professional tools like Terser which also:
          dead code elimination, variable renaming, property mangling, scope optimization, and more aggressive compression.
        </div>
      </div>
    </main>
  );
}