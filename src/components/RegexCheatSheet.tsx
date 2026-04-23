'use client'

import { useState } from 'react';

export default function RegexCheatSheet() {
  const [filter, setFilter] = useState('');

  const cheats = [
    { category: 'Character', syntax: '\\d', name: 'Digit' },
    { category: 'Character', syntax: '\\D', name: 'Non-digit' },
    { category: 'Character', syntax: '\\w', name: 'Word char' },
    { category: 'Character', syntax: '\\W', name: 'Non-word' },
    { category: 'Character', syntax: '\\s', name: 'Whitespace' },
    { category: 'Character', syntax: '\\S', name: 'Non-space' },
    { category: 'Character', syntax: '.', name: 'Any char' },
    { category: 'Anchor', syntax: '^', name: 'Start' },
    { category: 'Anchor', syntax: '$', name: 'End' },
    { category: 'Anchor', syntax: '\\b', name: 'Word boundary' },
    { category: 'Anchor', syntax: '\\B', name: 'Non-boundary' },
    { category: 'Quantifier', syntax: '*', name: '0 or more' },
    { category: 'Quantifier', syntax: '+', name: '1 or more' },
    { category: 'Quantifier', syntax: '?', name: '0 or 1' },
    { category: 'Quantifier', syntax: 'quant', name: 'Exact count' },
    { category: 'Group', syntax: '(...)', name: 'Capture' },
    { category: 'Group', syntax: '(?:...)', name: 'Non-capture' },
    { category: 'Group', syntax: '(?=...)', name: 'Lookahead' },
    { category: 'Group', syntax: '(?!...)', name: 'Neg lookahead' },
    { category: 'Set', syntax: '[abc]', name: 'Character set' },
    { category: 'Set', syntax: '[^abc]', name: 'Neg set' },
    { category: 'Set', syntax: '[a-z]', name: 'Range' },
    { category: 'Modifier', syntax: 'i', name: 'Case insensitive' },
    { category: 'Modifier', syntax: 'g', name: 'Global' },
    { category: 'Modifier', syntax: 'm', name: 'Multiline' },
    { category: 'Escape', syntax: '\\', name: 'Escape char' },
    { category: 'Escape', syntax: '\\.', name: 'Literal dot' },
    { category: 'Escape', syntax: '\\*', name: 'Literal star' },
  ];

  const filtered = cheats.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.syntax.toLowerCase().includes(filter.toLowerCase()) ||
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Character: 'bg-blue-100 text-blue-700',
    Anchor: 'bg-green-100 text-green-700',
    Quantifier: 'bg-orange-100 text-orange-700',
    Group: 'bg-purple-100 text-purple-700',
    Set: 'bg-teal-100 text-teal-700',
    Modifier: 'bg-pink-100 text-pink-700',
    Escape: 'bg-red-100 text-red-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Regex Cheat Sheet</h1>
      <p className="text-zinc-600">Complete regex syntax reference. Character classes, anchors, quantifiers, groups, sets, modifiers. Quick reference for JavaScript, Python, PHP regex patterns.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Filter by Category</label>
          <div className="flex gap-2">
            {['', 'Character', 'Anchor', 'Quantifier', 'Group', 'Set', 'Modifier', 'Escape'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Regex Syntax ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[c.category] || 'bg-zinc-100'}`}>
                {c.category}
              </div>
              <div className="w-20 text-center px-3 py-2 rounded font-mono font-bold bg-zinc-100">
                {c.syntax}
              </div>
              <div className="flex-1">
                <div className="font-medium">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Patterns</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Email:</span> [\\w.-]+@[\\w.-]+\\.[a-z]+</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Phone:</span> \\d{3}-\\d{3}-\\d{4}</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">URL:</span> https?:\\/\\/\\S+</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">IP:</span> \\d+.\\d+.\\d+.\\d+</div>
        </div>
      </div>
    </main>
  );
}