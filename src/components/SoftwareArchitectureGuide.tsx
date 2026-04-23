'use client'

export default function SoftwareArchitectureGuide() {
  const patterns = [
    { pattern: 'Monolithic', desc: 'Single unified codebase', use: 'Small teams, simple apps' },
    { pattern: 'Microservices', desc: 'Independent services', use: 'Large scale, teams' },
    { pattern: 'Layered', desc: 'Presentation, business, data layers', use: 'Traditional enterprise' },
    { pattern: 'Event-Driven', desc: 'Events trigger actions', use: 'Async systems, real-time' },
    { pattern: 'Serverless', desc: 'Cloud-managed functions', use: 'Variable workloads, cost-optimal' },
  ];

  const principles = [
    { principle: 'Separation of Concerns', desc: 'Divide into distinct sections' },
    { principle: 'Single Responsibility', desc: 'Each module has one purpose' },
    { principle: 'Dependency Injection', desc: 'Decouple components' },
    { principle: 'Interface Segregation', desc: 'Specific interfaces over general' },
    { principle: 'Fail Fast', desc: 'Validate early, error early' },
  ];

  const decisions = [
    { decision: 'Monolith vs Microservices', factors: 'Team size, scale, complexity' },
    { decision: 'SQL vs NoSQL', factors: 'Data structure, query needs' },
    { decision: 'Sync vs Async', factors: 'Performance, user experience' },
    { decision: 'Cache Strategy', factors: 'Data freshness, performance' },
    { decision: 'State Management', factors: 'Complexity, scale' },
  ];

  const bestPractices = [
    'Document architecture decisions',
    'Design for change',
    'Plan for failure',
    'Keep it simple initially',
    'Measure performance',
    'Security from start',
    'Consider operational costs',
    'Align with team structure',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Software Architecture Guide</h1>
      <p className="text-zinc-600">Architecture patterns, principles, decisions, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Architecture Patterns</h3>
        <div className="space-y-1 text-xs">
          {patterns.map((p) => (
            <div key={p.pattern} className="bg-white rounded p-2">
              <strong>{p.pattern}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Use: {p.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Decisions</h3>
        <div className="space-y-1 text-xs">
          {decisions.map((d) => (
            <div key={d.decision} className="bg-white rounded p-2">
              <strong>{d.decision}</strong>
              <div className="text-zinc-500 mt-1">Factors: {d.factors}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Architecture Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Understand requirements. 2. Define constraints (scale, budget, team). 3. Choose pattern (start simple). 4. Define boundaries. 5. Plan data architecture. 6. Design for failure. 7. Consider security. 8. Plan operations. 9. Document decisions. 10. Measure and iterate. Architecture = foundation. Decisions matter. Iterate, don&apos;t over-design initially.
        </div>
      </div>
    </main>
  );
}