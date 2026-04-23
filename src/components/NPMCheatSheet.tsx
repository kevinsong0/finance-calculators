'use client'

import { useState } from 'react';

export default function NPMCheatSheet() {
  const [filter, setFilter] = useState('');

  const commands = [
    { category: 'Install', cmd: 'npm install', desc: 'Install all dependencies' },
    { category: 'Install', cmd: 'npm install <package>', desc: 'Install package' },
    { category: 'Install', cmd: 'npm install <package>@version', desc: 'Install specific version' },
    { category: 'Install', cmd: 'npm install -g <package>', desc: 'Install globally' },
    { category: 'Install', cmd: 'npm install --save-dev <pkg>', desc: 'Install as dev dependency' },
    { category: 'Install', cmd: 'npm ci', desc: 'Clean install from lock file' },
    { category: 'Update', cmd: 'npm update', desc: 'Update all packages' },
    { category: 'Update', cmd: 'npm update <package>', desc: 'Update specific package' },
    { category: 'Update', cmd: 'npm outdated', desc: 'Check outdated packages' },
    { category: 'Remove', cmd: 'npm uninstall <package>', desc: 'Remove package' },
    { category: 'Remove', cmd: 'npm uninstall -g <package>', desc: 'Remove global package' },
    { category: 'Remove', cmd: 'npm prune', desc: 'Remove extraneous packages' },
    { category: 'Run', cmd: 'npm run <script>', desc: 'Run package.json script' },
    { category: 'Run', cmd: 'npm test', desc: 'Run test script' },
    { category: 'Run', cmd: 'npm start', desc: 'Run start script' },
    { category: 'Run', cmd: 'npm build', desc: 'Run build script' },
    { category: 'Info', cmd: 'npm list', desc: 'List installed packages' },
    { category: 'Info', cmd: 'npm list --depth=0', desc: 'List top-level packages' },
    { category: 'Info', cmd: 'npm list -g', desc: 'List global packages' },
    { category: 'Info', cmd: 'npm view <package>', desc: 'View package info' },
    { category: 'Info', cmd: 'npm view <package> versions', desc: 'View all versions' },
    { category: 'Cache', cmd: 'npm cache clean', desc: 'Clear npm cache' },
    { category: 'Cache', cmd: 'npm cache verify', desc: 'Verify cache integrity' },
    { category: 'Publish', cmd: 'npm publish', desc: 'Publish package' },
    { category: 'Publish', cmd: 'npm version <type>', desc: 'Bump version (major/minor/patch)' },
    { category: 'Publish', cmd: 'npm deprecate <pkg> "msg"', desc: 'Deprecate package' },
    { category: 'Init', cmd: 'npm init', desc: 'Create package.json' },
    { category: 'Init', cmd: 'npm init -y', desc: 'Create package.json with defaults' },
    { category: 'Config', cmd: 'npm config list', desc: 'Show npm config' },
    { category: 'Config', cmd: 'npm config set <key> <value>', desc: 'Set config value' },
    { category: 'Config', cmd: 'npm config get <key>', desc: 'Get config value' },
    { category: 'Other', cmd: 'npm audit', desc: 'Check for vulnerabilities' },
    { category: 'Other', cmd: 'npm audit fix', desc: 'Fix vulnerabilities' },
    { category: 'Other', cmd: 'npm doctor', desc: 'Check npm environment' },
    { category: 'Other', cmd: 'npx <package>', desc: 'Run package without install' },
  ];

  const filtered = commands.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.cmd.toLowerCase().includes(filter.toLowerCase()) ||
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Install: 'bg-blue-100 text-blue-700',
    Update: 'bg-green-100 text-green-700',
    Remove: 'bg-red-100 text-red-700',
    Run: 'bg-purple-100 text-purple-700',
    Info: 'bg-orange-100 text-orange-700',
    Cache: 'bg-teal-100 text-teal-700',
    Publish: 'bg-pink-100 text-pink-700',
    Init: 'bg-yellow-100 text-yellow-700',
    Config: 'bg-indigo-100 text-indigo-700',
    Other: 'bg-zinc-100 text-zinc-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">NPM Cheat Sheet</h1>
      <p className="text-zinc-600">Complete NPM command reference. Install, update, remove packages. Run scripts, publish packages, manage cache. Essential for Node.js development workflows.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search commands..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Install', 'Update', 'Remove', 'Run', 'Info', 'Cache', 'Publish', 'Init', 'Config', 'Other'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">NPM Commands ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[c.category]}`}>
                {c.category}
              </div>
              <div className="w-56 font-mono text-sm bg-zinc-100 rounded px-2 py-1">
                {c.cmd}
              </div>
              <div className="flex-1 text-sm text-zinc-600">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common package.json Scripts</h3>
        <div className="bg-white rounded p-3 font-mono text-sm">
          "scripts": {"{"}
          <br />
          {"  "} "start": "node index.js",<br />
          {"  "} "dev": "nodemon index.js",<br />
          {"  "} "test": "jest",<br />
          {"  "} "build": "webpack --mode production"<br />
          {"}"}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">NPM vs Yarn vs PNPM</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">NPM</div>
            <div className="bg-white rounded p-2 font-mono">
              npm install<br />
              npm run test<br />
              npm publish
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Yarn</div>
            <div className="bg-white rounded p-2 font-mono">
              yarn install<br />
              yarn test<br />
              yarn publish
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">PNPM</div>
            <div className="bg-white rounded p-2 font-mono">
              pnpm install<br />
              pnpm test<br />
              pnpm publish
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}