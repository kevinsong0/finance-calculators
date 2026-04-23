'use client'

export default function ApiVersioningGuide() {
  const strategies = [
    { strategy: 'URL path', implementation: '/v1/resource', pros: 'Explicit, cacheable' },
    { strategy: 'Query parameter', implementation: '?version=1', pros: 'Flexible' },
    { strategy: 'Header', implementation: 'Accept-Version: v1', pros: 'Clean URLs' },
    { strategy: 'Content negotiation', implementation: 'Accept header', pros: 'HTTP standard' },
  ];

  const practices = [
    'Semantic versioning',
    'Deprecation policy',
    'Migration guides',
    'Version documentation',
    'Backward compatibility',
    'Breaking change management',
    'Version lifecycle',
    'Client notifications',
  ];

  const transitions = [
    'Plan version release',
    'Document changes',
    'Announce deprecation',
    'Provide migration path',
    'Support transition period',
    'Monitor adoption',
    'Complete migration',
    'Remove old version',
  ];

  const considerations = [
    'Breaking vs non-breaking',
    'Client compatibility',
    'Documentation updates',
    'Testing requirements',
    'Deployment strategy',
    'Rollback capability',
    'Support timeline',
    'Communication plan',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Versioning Guide</h1>
      <p className="text-zinc-600">Strategies, practices, transitions, and considerations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Versioning Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Implementation: {s.implementation}</div>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Versioning Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Transition Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {transitions.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Versioning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose versioning strategy. 2. Define version policy. 3. Document current version. 4. Plan version lifecycle. 5. Communicate changes. 6. Provide migration guides. 7. Support transition period. 8. Monitor adoption rate. 9. Execute migration. 10. Retire old versions. Good versioning = API longevity. Strategy chosen. Policy defined. Version documented. Lifecycle planned. Changes communicated. Guides provided. Period supported. Adoption monitored. Migration executed. Versions retired.
        </div>
      </div>
    </main>
  );
}
