'use client'

export default function DependencyManagementGuide() {
  const types = [
    { type: 'Direct dependencies', desc: 'Explicitly declared', risk: 'Version control' },
    { type: 'Transitive dependencies', desc: 'Indirectly required', risk: 'Hidden changes' },
    { type: 'Dev dependencies', desc: 'Development only', risk: 'Dev environment' },
    { type: 'Peer dependencies', desc: 'Compatible packages', risk: 'Version matching' },
    { type: 'Optional dependencies', desc: 'Enhancement features', risk: 'Missing features' },
  ];

  const concerns = [
    'Version conflicts',
    'Security vulnerabilities',
    'License compliance',
    'Abandoned packages',
    'Size impact',
    'Performance effects',
    'Update frequency',
    'Breaking changes',
  ];

  const strategies = [
    'Lock file usage',
    'Regular updates',
    'Security scanning',
    'License checking',
    'Minimal dependencies',
    'Version pinning',
    'Dependency audit',
    'Automated updates',
  ];

  const tools = [
    'npm/yarn/pnpm',
    'pip/poetry',
    'Maven/Gradle',
    'NuGet',
    'Go modules',
    'Cargo',
    'Composer',
    'RubyGems',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dependency Management Guide</h1>
      <p className="text-zinc-600">Types, concerns, strategies, and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dependency Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-red-600 mt-1">Risk: {t.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Concerns</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {concerns.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dependency Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Use lock files consistently. 2. Declare dependencies explicitly. 3. Check for vulnerabilities. 4. Review license compatibility. 5. Update dependencies regularly. 6. Pin versions for stability. 7. Audit dependencies periodically. 8. Minimize unnecessary dependencies. 9. Document dependency decisions. 10. Automate security checks. 11. Monitor for abandoned packages. 12. Plan for breaking changes. Dependencies = managed carefully. Lock files used. Explicit declarations. Security checked. Licenses reviewed. Regular updates. Minimal dependencies. Automated monitoring.
        </div>
      </div>
    </main>
  );
}