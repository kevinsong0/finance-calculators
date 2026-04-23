'use client'

import { useState, useMemo } from 'react';

export default function HTMLMinifier() {
  const [html, setHTML] = useState('');

  const minified = useMemo(() => {
    if (!html.trim()) return { output: '', sizeBefore: 0, sizeAfter: 0, reduction: 0 };

    try {
      let result = html;

      // Remove comments
      result = result.replace(/<!--[\s\S]*?-->/g, '');

      // Remove whitespace between tags
      result = result.replace(/>\s+</g, '><');

      // Remove multiple spaces to single
      result = result.replace(/\s+/g, ' ');

      // Remove spaces around = in attributes
      result = result.replace(/\s*=\s*/g, '=');

      // Remove quotes from simple attribute values
      result = result.replace(/="([a-zA-Z0-9_-]+)"/g, '=$1');

      // Clean up extra spaces
      result = result.replace(/\s+>/g, '>');
      result = result.replace(/<\s+/g, '<');

      // Remove leading/trailing whitespace
      result = result.trim();

      const sizeBefore = html.length;
      const sizeAfter = result.length;
      const reduction = sizeBefore > 0 ? Math.round((1 - sizeAfter / sizeBefore) * 100) : 0;

      return { output: result, sizeBefore, sizeAfter, reduction, valid: true };
    } catch {
      return { output: '', sizeBefore: html.length, sizeAfter: 0, reduction: 0, valid: false };
    }
  }, [html]);

  const copyMinified = () => {
    navigator.clipboard.writeText(minified.output);
  };

  const examples: Record<string, string> = {
    simple: '<div class="container">\n  <h1>Welcome</h1>\n  <p>Paragraph text.</p>\n  <!-- Remove this -->\n  <a href="https://example.com">Link</a>\n</div>',
    form: '<form action="/submit" method="post">\n  <input type="text" id="name" name="name" />\n  <button type="submit">Submit</button>\n</form>',
    table: '<table class="data-table">\n  <thead><tr><th>Name</th><th>Value</th></tr></thead>\n  <tbody><tr><td>Item 1</td><td>100</td></tr></tbody>\n</table>',
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">HTML Minifier</h1>
      <p className="text-zinc-600">Minify HTML to reduce file size. Remove comments, whitespace, and unnecessary quotes. Basic HTML compression for faster page loads and production deployment.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Examples</label>
          <div className="flex gap-2">
            {Object.entries(examples).map(([key]) => (
              <button key={key} onClick={() => setHTML(examples[key])} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {key}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input HTML</label>
          <textarea
            value={html}
            onChange={e => setHTML(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste HTML here..."
          />
        </div>

        <button onClick={() => setHTML('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
      </div>

      {minified.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Minified HTML</h3>
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
        <h3 className="font-medium mb-2">HTML Minification Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Comments</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>All comment blocks gone</div>
              <div>Developer notes removed</div>
              <div>TODO comments gone</div>
              <div>Keep visible content</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Whitespace</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Multiple spaces to one</div>
              <div>Newlines removed</div>
              <div>Space between tags gone</div>
              <div>Indentation removed</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Attributes</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Space around = removed</div>
              <div>Simple quotes removed</div>
              <div>class="btn" to class=btn</div>
              <div>Complex values kept</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Safe</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Structure preserved</div>
              <div>Tags not altered</div>
              <div>Nesting maintained</div>
              <div>Content intact</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Professional Tools</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">html-minifier:</span> npm package</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">HTMLMinifier:</span> Online tool</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Webpack:</span> html plugin</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Gulp:</span> gulp-htmlmin</div>
        </div>
      </div>
    </main>
  );
}