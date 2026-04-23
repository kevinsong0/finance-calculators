'use client'

export default function ApiDesignGuide() {
  const styles = [
    { style: 'REST', characteristics: 'Resource-based', useCases: 'Standard web APIs' },
    { style: 'GraphQL', characteristics: 'Query-based', useCases: 'Flexible data fetching' },
    { style: 'WebSocket', characteristics: 'Real-time', useCases: 'Live updates' },
    { style: 'RPC', characteristics: 'Action-based', useCases: 'Internal services' },
  ];

  const principles = [
    'Consistent naming',
    'Clear versioning',
    'Proper error handling',
    'Comprehensive documentation',
    'Security by design',
    'Performance optimization',
    'Scalability planning',
    'Developer experience',
  ];

  const components = [
    'Endpoints',
    'Request/response formats',
    'Authentication',
    'Authorization',
    'Rate limiting',
    'Error responses',
    'Pagination',
    'Caching',
  ];

  const bestPractices = [
    'Use standard HTTP methods',
    'Implement proper status codes',
    'Design resource hierarchies',
    'Handle errors gracefully',
    'Document thoroughly',
    'Version your API',
    'Monitor performance',
    'Test comprehensively',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Design Guide</h1>
      <p className="text-zinc-600">Styles, principles, components, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Styles</h3>
        <div className="space-y-1 text-xs">
          {styles.map((s) => (
            <div key={s.style} className="bg-white rounded p-2">
              <strong>{s.style}</strong>
              <div className="text-zinc-500 mt-1">Characteristics: {s.characteristics}</div>
              <div className="text-green-600 mt-1">Use cases: {s.useCases}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">API Design Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose API style. 2. Define naming conventions. 3. Design endpoints. 4. Plan authentication. 5. Implement versioning. 6. Handle errors properly. 7. Document thoroughly. 8. Test comprehensively. 9. Monitor performance. 10. Iterate improvements. Good API design = developer success. Style chosen. Conventions defined. Endpoints designed. Authentication planned. Versioning implemented. Errors handled. Documentation thorough. Testing comprehensive. Performance monitored. Improvements iterated.
        </div>
      </div>
    </main>
  );
}
