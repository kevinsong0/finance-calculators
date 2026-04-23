'use client'

import { useState, useMemo } from 'react';

export default function CSSMinifier() {
  const [css, setCSS] = useState('');

  const minified = useMemo(() => {
    if (!css.trim()) return { output: '', sizeBefore: 0, sizeAfter: 0, reduction: 0 };

    try {
      let result = css;

      // Remove comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');

      // Remove whitespace
      result = result
        .replace(/\s+/g, ' ')           // Multiple spaces to single
        .replace(/\s*{\s*/g, '{')        // Space around braces
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':')        // Space around colons
        .replace(/\s*;\s*/g, ';')        // Space around semicolons
        .replace(/\s*,\s*/g, ',')        // Space around commas
        .replace(/;\s*}/g, '}')          // Remove last semicolon in block
        .replace(/\s*>\s*/g, '>')        // Space around >
        .replace(/\s*\+\s*/g, '+')       // Space around +
        .replace(/\s*~\s*/g, '~')        // Space around ~
        .trim();

      // Remove leading zeros in decimals
      result = result.replace(/0\.(\d+)/g, '.$1');

      // Remove unnecessary quotes in url()
      result = result.replace(/url\("([^"]+)"\)/g, 'url($1)');
      result = result.replace(/url\('([^']+)'\)/g, 'url($1)');

      // Shorten hex colors where possible
      result = result.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');

      const sizeBefore = css.length;
      const sizeAfter = result.length;
      const reduction = Math.round((1 - sizeAfter / sizeBefore) * 100);

      return { output: result, sizeBefore, sizeAfter, reduction, valid: true };
    } catch {
      return { output: '', sizeBefore: css.length, sizeAfter: 0, reduction: 0, valid: false };
    }
  }, [css]);

  const copyMinified = () => {
    navigator.clipboard.writeText(minified.output);
  };

  const examples = {
    simple: `.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}`,
    complex: `/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;
}

.header .logo {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}

.header .nav {
  display: flex;
  gap: 20px;
}

.header .nav a {
  text-decoration: none;
  color: #666666;
  transition: color 0.3s ease;
}`,
    responsive: `@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .header {
    flex-direction: column;
    padding: 0.5rem 1rem;
  }

  .nav {
    display: none;
  }
}`,
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">CSS Minifier</h1>
      <p className="text-zinc-600">Minify CSS to reduce file size. Remove comments, whitespace, and unnecessary characters. Optimize hex colors and values. Perfect for production deployment.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Examples</label>
          <div className="flex gap-2">
            {Object.entries(examples).map(([key]) => (
              <button key={key} onClick={() => setCSS(examples[key as keyof typeof examples])} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {key}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input CSS</label>
          <textarea
            value={css}
            onChange={e => setCSS(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste CSS here..."
          />
        </div>

        <button onClick={() => setCSS('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
      </div>

      {minified.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Minified CSS</h3>
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
        <h3 className="font-medium mb-2">CSS Minification Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Whitespace</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Remove all spaces</div>
              <div>Remove newlines</div>
              <div>Space around : removed</div>
              <div>Space around ; removed</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Comments</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>/* comment */ removed</div>
              <div>No comment blocks</div>
              <div>Header comments gone</div>
              <div>Inline comments gone</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Colors</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>#ff0000 → #f00</div>
              <div>#ffffff → #fff</div>
              <div>#aabbcc → #abc</div>
              <div>Shorten where possible</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Values</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>0.5 → .5</div>
              <div>Remove last ;</div>
              <div>Quotes from url()</div>
              <div>Combine selectors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Why Minify CSS?</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Speed:</span> Faster load times</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Bandwidth:</span> Less data transfer</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">SEO:</span> Better page speed</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">UX:</span> Quicker rendering</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Professional Tools</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">cssnano:</span> PostCSS plugin</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">CleanCSS:</span> Node.js tool</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">PurgeCSS:</span> Remove unused</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Webpack:</span> Build minify</div>
        </div>
      </div>
    </main>
  );
}