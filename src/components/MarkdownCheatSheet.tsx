'use client'

import { useState } from 'react';

export default function MarkdownCheatSheet() {
  const [filter, setFilter] = useState('');

  const syntax = [
    { category: 'Headers', md: '# H1', result: 'Header level 1' },
    { category: 'Headers', md: '## H2', result: 'Header level 2' },
    { category: 'Headers', md: '### H3', result: 'Header level 3' },
    { category: 'Headers', md: '#### H4', result: 'Header level 4' },
    { category: 'Headers', md: '# Title #', result: 'Closing # optional' },
    { category: 'Emphasis', md: '*italic*', result: 'Italic text' },
    { category: 'Emphasis', md: '**bold**', result: 'Bold text' },
    { category: 'Emphasis', md: '***bold italic***', result: 'Bold + italic' },
    { category: 'Emphasis', md: '~~strikethrough~~', result: 'Strikethrough' },
    { category: 'Links', md: '[text](url)', result: 'Link to URL' },
    { category: 'Links', md: '[text](url "title")', result: 'Link with title' },
    { category: 'Links', md: '[ref]: url', result: 'Reference link' },
    { category: 'Images', md: '![](url)', result: 'Image' },
    { category: 'Images', md: '![](url "title")', result: 'Image with title' },
    { category: 'Lists', md: '- item', result: 'Unordered list' },
    { category: 'Lists', md: '* item', result: 'Unordered list' },
    { category: 'Lists', md: '+ item', result: 'Unordered list' },
    { category: 'Lists', md: '1. item', result: 'Ordered list' },
    { category: 'Lists', md: '  - nested', result: 'Nested list item' },
    { category: 'Code', md: '`inline code`', result: 'Inline code' },
    { category: 'Code', md: '```code block```', result: 'Fenced code block' },
    { category: 'Code', md: '```js', result: 'Code with language' },
    { category: 'Code', md: '    indented', result: 'Indented code (4 spaces)' },
    { category: 'Blockquote', md: '> quote', result: 'Blockquote' },
    { category: 'Blockquote', md: '> nested quote', result: 'Nested blockquote' },
    { category: 'Table', md: '| a | b |', result: 'Table header' },
    { category: 'Table', md: '|---|---|', result: 'Table separator' },
    { category: 'Table', md: '| left | center | right |', result: 'Alignment :-- :--: --:' },
    { category: 'Line', md: '---', result: 'Horizontal rule' },
    { category: 'Line', md: '***', result: 'Horizontal rule' },
    { category: 'Line', md: '___', result: 'Horizontal rule' },
    { category: 'Escape', md: '\\*', result: 'Escape special chars' },
    { category: 'Task', md: '- [ ] task', result: 'Unchecked task' },
    { category: 'Task', md: '- [x] done', result: 'Checked task' },
    { category: 'HTML', md: '<br>', result: 'Raw HTML allowed' },
    { category: 'HTML', md: '<details>', result: 'Collapsible content' },
  ];

  const filtered = syntax.filter(s =>
    filter === '' ||
    s.category.toLowerCase().includes(filter.toLowerCase()) ||
    s.md.toLowerCase().includes(filter.toLowerCase()) ||
    s.result.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Headers: 'bg-blue-100 text-blue-700',
    Emphasis: 'bg-green-100 text-green-700',
    Links: 'bg-purple-100 text-purple-700',
    Images: 'bg-pink-100 text-pink-700',
    Lists: 'bg-orange-100 text-orange-700',
    Code: 'bg-teal-100 text-teal-700',
    Blockquote: 'bg-yellow-100 text-yellow-700',
    Table: 'bg-indigo-100 text-indigo-700',
    Line: 'bg-zinc-100 text-zinc-700',
    Escape: 'bg-red-100 text-red-700',
    Task: 'bg-cyan-100 text-cyan-700',
    HTML: 'bg-gray-100 text-gray-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Markdown Cheat Sheet</h1>
      <p className="text-zinc-600">Complete Markdown syntax reference. Headers, emphasis, links, images, lists, code blocks, tables. Essential for GitHub, documentation, and blog writing.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search syntax..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Headers', 'Emphasis', 'Links', 'Images', 'Lists', 'Code', 'Table'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Markdown Syntax ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((s, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[s.category]}`}>
                {s.category}
              </div>
              <div className="w-48 font-mono text-sm bg-zinc-100 rounded px-2 py-1">
                {s.md}
              </div>
              <div className="flex-1 text-sm text-zinc-600">{s.result}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Example Document</h3>
        <div className="bg-white rounded p-3 font-mono text-xs">
          # Title<br />
          <br />
          **Bold** and *italic* text.<br />
          <br />
          - List item 1<br />
          - List item 2<br />
          <br />
          [Link](https://example.com)<br />
          <br />
          `inline code`<br />
          <br />
          ```javascript<br />
          const x = 1;<br />
          ```
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">GitHub Flavored Markdown</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Tasks:</span> - [ ] and - [x]</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Tables:</span> | a | b |</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Autolinks:</span> URLs auto-link</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Strikethrough:</span> ~~text~~</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Syntax:</span> ```lang</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Mentions:</span> @user #issue</div>
        </div>
      </div>
    </main>
  );
}