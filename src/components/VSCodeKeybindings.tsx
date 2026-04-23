'use client'

import { useState } from 'react';

export default function VSCodeKeybindings() {
  const [filter, setFilter] = useState('');
  const [platform, setPlatform] = useState<'win' | 'mac' | 'linux'>('win');

  const shortcuts = [
    { category: 'File', win: 'Ctrl+S', mac: 'Cmd+S', linux: 'Ctrl+S', desc: 'Save file' },
    { category: 'File', win: 'Ctrl+O', mac: 'Cmd+O', linux: 'Ctrl+O', desc: 'Open file' },
    { category: 'File', win: 'Ctrl+N', mac: 'Cmd+N', linux: 'Ctrl+N', desc: 'New file' },
    { category: 'File', win: 'Ctrl+W', mac: 'Cmd+W', linux: 'Ctrl+W', desc: 'Close tab' },
    { category: 'File', win: 'Ctrl+K Ctrl+S', mac: 'Cmd+K Cmd+S', linux: 'Ctrl+K Ctrl+S', desc: 'Save all' },
    { category: 'Edit', win: 'Ctrl+Z', mac: 'Cmd+Z', linux: 'Ctrl+Z', desc: 'Undo' },
    { category: 'Edit', win: 'Ctrl+Y', mac: 'Cmd+Shift+Z', linux: 'Ctrl+Y', desc: 'Redo' },
    { category: 'Edit', win: 'Ctrl+C', mac: 'Cmd+C', linux: 'Ctrl+C', desc: 'Copy' },
    { category: 'Edit', win: 'Ctrl+V', mac: 'Cmd+V', linux: 'Ctrl+V', desc: 'Paste' },
    { category: 'Edit', win: 'Ctrl+X', mac: 'Cmd+X', linux: 'Ctrl+X', desc: 'Cut' },
    { category: 'Edit', win: 'Ctrl+F', mac: 'Cmd+F', linux: 'Ctrl+F', desc: 'Find' },
    { category: 'Edit', win: 'Ctrl+H', mac: 'Cmd+Option+F', linux: 'Ctrl+H', desc: 'Replace' },
    { category: 'Navigation', win: 'Ctrl+G', mac: 'Cmd+G', linux: 'Ctrl+G', desc: 'Go to line' },
    { category: 'Navigation', win: 'Ctrl+P', mac: 'Cmd+P', linux: 'Ctrl+P', desc: 'Quick open file' },
    { category: 'Navigation', win: 'Ctrl+Shift+P', mac: 'Cmd+Shift+P', linux: 'Ctrl+Shift+P', desc: 'Command palette' },
    { category: 'Navigation', win: 'Ctrl+Tab', mac: 'Cmd+Tab', linux: 'Ctrl+Tab', desc: 'Switch tabs' },
    { category: 'Code', win: 'Ctrl+Space', mac: 'Cmd+Space', linux: 'Ctrl+Space', desc: 'IntelliSense' },
    { category: 'Code', win: 'Ctrl+/', mac: 'Cmd+/', linux: 'Ctrl+/', desc: 'Toggle comment' },
    { category: 'Code', win: 'Ctrl+Shift+K', mac: 'Cmd+Shift+K', linux: 'Ctrl+Shift+K', desc: 'Delete line' },
    { category: 'Code', win: 'Alt+Up', mac: 'Option+Up', linux: 'Alt+Up', desc: 'Move line up' },
    { category: 'Code', win: 'Alt+Down', mac: 'Option+Down', linux: 'Alt+Down', desc: 'Move line down' },
    { category: 'Code', win: 'Ctrl+Shift+Enter', mac: 'Cmd+Shift+Enter', linux: 'Ctrl+Shift+Enter', desc: 'Insert line above' },
    { category: 'Code', win: 'Ctrl+Enter', mac: 'Cmd+Enter', linux: 'Ctrl+Enter', desc: 'Insert line below' },
    { category: 'Multi', win: 'Alt+Click', mac: 'Option+Click', linux: 'Alt+Click', desc: 'Multi-cursor click' },
    { category: 'Multi', win: 'Ctrl+Alt+Up', mac: 'Cmd+Option+Up', linux: 'Ctrl+Alt+Up', desc: 'Add cursor above' },
    { category: 'Multi', win: 'Ctrl+Alt+Down', mac: 'Cmd+Option+Down', linux: 'Ctrl+Alt+Down', desc: 'Add cursor below' },
    { category: 'Multi', win: 'Ctrl+D', mac: 'Cmd+D', linux: 'Ctrl+D', desc: 'Select next occurrence' },
    { category: 'Terminal', win: 'Ctrl+`', mac: 'Cmd+`', linux: 'Ctrl+`', desc: 'Toggle terminal' },
    { category: 'Terminal', win: 'Ctrl+Shift+`', mac: 'Cmd+Shift+`', linux: 'Ctrl+Shift+`', desc: 'New terminal' },
    { category: 'View', win: 'Ctrl+B', mac: 'Cmd+B', linux: 'Ctrl+B', desc: 'Toggle sidebar' },
    { category: 'View', win: 'Ctrl+Shift+E', mac: 'Cmd+Shift+E', linux: 'Ctrl+Shift+E', desc: 'Explorer view' },
    { category: 'View', win: 'Ctrl+Shift+F', mac: 'Cmd+Shift+F', linux: 'Ctrl+Shift+F', desc: 'Search view' },
    { category: 'View', win: 'F11', mac: 'F11', linux: 'F11', desc: 'Full screen' },
    { category: 'Debug', win: 'F5', mac: 'F5', linux: 'F5', desc: 'Start debug' },
    { category: 'Debug', win: 'F9', mac: 'F9', linux: 'F9', desc: 'Toggle breakpoint' },
    { category: 'Debug', win: 'F10', mac: 'F10', linux: 'F10', desc: 'Step over' },
    { category: 'Debug', win: 'F11', mac: 'F11', linux: 'F11', desc: 'Step into' },
    { category: 'Debug', win: 'Shift+F11', mac: 'Shift+F11', linux: 'Shift+F11', desc: 'Step out' },
  ];

  const filtered = shortcuts.filter(s =>
    filter === '' ||
    s.category.toLowerCase().includes(filter.toLowerCase()) ||
    s.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const getKey = (s: typeof shortcuts[0]) => {
    if (platform === 'win') return s.win;
    if (platform === 'mac') return s.mac;
    return s.linux;
  };

  const categoryColors: Record<string, string> = {
    File: 'bg-blue-100 text-blue-700',
    Edit: 'bg-green-100 text-green-700',
    Navigation: 'bg-purple-100 text-purple-700',
    Code: 'bg-orange-100 text-orange-700',
    Multi: 'bg-teal-100 text-teal-700',
    Terminal: 'bg-pink-100 text-pink-700',
    View: 'bg-yellow-100 text-yellow-700',
    Debug: 'bg-red-100 text-red-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">VS Code Keyboard Shortcuts</h1>
      <p className="text-zinc-600">Complete VS Code keybindings reference. File operations, editing, navigation, multi-cursor, terminal, view, and debug shortcuts for Windows, Mac, and Linux.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Platform</label>
          <div className="flex gap-2">
            {['win', 'mac', 'linux'].map((p) => (
              <button key={p} onClick={() => setPlatform(p as typeof platform)} className={`px-4 py-2 rounded ${platform === p ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {p === 'win' ? 'Windows' : p === 'mac' ? 'Mac' : 'Linux'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search shortcuts..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'File', 'Edit', 'Navigation', 'Code', 'Multi', 'Terminal', 'View', 'Debug'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Keyboard Shortcuts ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((s, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[s.category]}`}>
                {s.category}
              </div>
              <div className="w-32 text-center px-3 py-2 rounded font-mono font-bold bg-zinc-100">
                {getKey(s)}
              </div>
              <div className="flex-1 text-sm text-zinc-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Most Used Shortcuts</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Save:</span> Ctrl+S</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Find:</span> Ctrl+F</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Quick Open:</span> Ctrl+P</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Terminal:</span> Ctrl+`</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Command:</span> Ctrl+Shift+P</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Comment:</span> Ctrl+/</div>
          <div className="bg-white rounded p-2"><span className="text-yellow-600 font-medium">Sidebar:</span> Ctrl+B</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Debug:</span> F5</div>
        </div>
      </div>
    </main>
  );
}