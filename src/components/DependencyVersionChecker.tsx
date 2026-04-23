'use client'

import { useState } from 'react';

export default function DependencyVersionChecker() {
  const [packageJson, setPackageJson] = useState('');
  const [output, setOutput] = useState('');

  const parseAndCheck = () => {
    try {
      const parsed = JSON.parse(packageJson);
      const deps = parsed.dependencies || {};
      const devDeps = parsed.devDependencies || {};

      const results: string[] = [];
      results.push('=== Dependencies Analysis ===\n');

      Object.entries(deps).forEach(([name, version]) => {
        const v = String(version);
        const status = analyzeVersion(v);
        results.push(`${name}: ${v} - ${status}`);
      });

      results.push('\n=== DevDependencies Analysis ===\n');
      Object.entries(devDeps).forEach(([name, version]) => {
        const v = String(version);
        const status = analyzeVersion(v);
        results.push(`${name}: ${v} - ${status}`);
      });

      setOutput(results.join('\n'));
    } catch {
      setOutput('Error: Invalid JSON. Paste valid package.json content.');
    }
  };

  const analyzeVersion = (version: string): string => {
    if (version.startsWith('^')) return 'caret - allows minor updates';
    if (version.startsWith('~')) return 'tilde - allows patch updates';
    if (version.startsWith('>=') || version.startsWith('>')) return 'range - flexible version';
    if (version.startsWith('*') || version === 'latest') return 'WARNING: unstable - any version';
    if (version.match(/^\d/)) return 'fixed - exact version (safe)';
    return 'complex - check npm for details';
  };

  const examplePackageJson = JSON.stringify({
    "dependencies": {
      "react": "^18.2.0",
      "next": "14.0.0",
      "lodash": "~4.17.21"
    },
    "devDependencies": {
      "typescript": "^5.0.0",
      "eslint": "*"
    }
  }, null, 2);

  const versionTypes = [
    { prefix: '^', name: 'Caret', desc: 'Allows minor updates (e.g. ^18.2.0 → 18.x.x)', risk: 'Medium' },
    { prefix: '~', name: 'Tilde', desc: 'Allows patch updates (e.g. ~4.17.21 → 4.17.x)', risk: 'Low' },
    { prefix: 'Fixed', name: 'Exact', desc: 'Exact version (e.g. 14.0.0 → only 14.0.0)', risk: 'None' },
    { prefix: '*', name: 'Any', desc: 'Any version (dangerous)', risk: 'High' },
  ];

  const tips = [
    'Use fixed versions for critical packages',
    'Review changelog before updating',
    'Lock files (package-lock.json) protect versions',
    'Run npm audit for security vulnerabilities',
    'Use npm outdated to check updates',
    'Test after updating dependencies',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dependency Version Checker</h1>
      <p className="text-zinc-600">Analyze package.json dependency versions. Check for risky patterns, understand version semantics. Improve dependency management.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Paste package.json</h3>
        <textarea
          className="w-full h-32 p-3 border rounded font-mono text-sm"
          value={packageJson}
          onChange={(e) => setPackageJson(e.target.value)}
          placeholder="Paste your package.json here..."
        />
        <div className="flex gap-2 mt-2">
          <button onClick={parseAndCheck} className="btn-primary">Analyze Versions</button>
          <button onClick={() => setPackageJson(examplePackageJson)} className="btn-secondary">Load Example</button>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Results</h3>
        <textarea
          className="w-full h-40 p-3 border rounded font-mono text-sm bg-white"
          value={output}
          readOnly
        />
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Version Prefix Types</h3>
        <div className="space-y-1 text-xs">
          {versionTypes.map((v) => (
            <div key={v.prefix} className="bg-white rounded p-2">
              <strong className="font-mono">{v.prefix}</strong> {v.name}: {v.desc}
              <div className="text-zinc-500 mt-1">Risk: {v.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Useful Commands</h3>
        <div className="text-xs font-mono bg-white rounded p-2">
          npm outdated - check outdated packages<br/>
          npm audit - security vulnerabilities<br/>
          npm update - update to allowed versions<br/>
          npm install package@version - specific version<br/>
          npm dedupe - remove duplicates
        </div>
      </div>
    </main>
  );
}