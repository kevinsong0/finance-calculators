'use client'

export default function MicroservicesGuide() {
  const patterns = [
    { pattern: 'API Gateway', desc: 'Single entry point, routing, auth', use: 'Client-facing services' },
    { pattern: 'Service Registry', desc: 'Discover services dynamically', use: 'Dynamic service discovery' },
    { pattern: 'Circuit Breaker', desc: 'Fail gracefully, prevent cascade', use: 'Service resilience' },
    { pattern: 'Event Bus', desc: 'Async communication via events', use: 'Decoupled services' },
    { pattern: 'CQRS', desc: 'Separate read/write paths', use: 'Complex read/write patterns' },
  ];

  const pros = [
    'Independent deployment',
    'Technology flexibility',
    'Team autonomy',
    'Fault isolation',
    'Scalability per service',
  ];

  const cons = [
    'Complexity overhead',
    'Distributed system challenges',
    'Testing complexity',
    'Operational burden',
    'Network latency',
  ];

  const bestPractices = [
    'Start with monolith',
    'Break by business domain',
    'Keep services small',
    'API contracts first',
    'Automate deployment',
    'Monitor everything',
    'Design for failure',
    'Document boundaries',
  ];

  const challenges = [
    { challenge: 'Data consistency', solution: 'Eventual consistency, sagas' },
    { challenge: 'Service discovery', solution: 'Registry (Eureka, Consul)' },
    { challenge: 'Testing', solution: 'Contract tests, integration tests' },
    { challenge: 'Monitoring', solution: 'Distributed tracing (Jaeger, Zipkin)' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Microservices Architecture Guide</h1>
      <p className="text-zinc-600">Patterns, pros/cons, challenges, and best practices.</p>

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
        <h3 className="font-medium mb-2">Pros & Cons</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <strong className="text-green-600">Pros</strong>
            {pros.map((p) => (<div key={p} className="text-green-600">• {p}</div>))}
          </div>
          <div className="bg-white rounded p-2">
            <strong className="text-red-600">Cons</strong>
            {cons.map((c) => (<div key={c} className="text-red-600">• {c}</div>))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">Solution: {c.solution}</div>
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
        <h3 className="font-medium mb-2">Microservices Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify business domains. 2. Define service boundaries. 3. Design API contracts. 4. Choose communication pattern. 5. Plan data strategy. 6. Set up monitoring. 7. Implement CI/CD. 8. Design for failure. 9. Test distributed scenarios. 10. Document architecture. Microservices = complexity + flexibility. Start simple, decompose when needed.
        </div>
      </div>
    </main>
  );
}