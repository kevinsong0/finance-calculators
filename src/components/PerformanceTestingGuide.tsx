'use client'

export default function PerformanceTestingGuide() {
  const types = [
    { type: 'Load Testing', desc: 'Expected load conditions', goal: 'Verify performance under normal load' },
    { type: 'Stress Testing', desc: 'Beyond normal capacity', goal: 'Find breaking points' },
    { type: 'Spike Testing', desc: 'Sudden load increase', goal: 'Test sudden traffic handling' },
    { type: 'Endurance Testing', desc: 'Sustained load over time', goal: 'Check stability, memory leaks' },
    { type: 'Volume Testing', desc: 'Large data amounts', goal: 'Test data volume handling' },
    { type: 'Scalability Testing', desc: 'Incremental load', goal: 'Test scaling capability' },
  ];

  const metrics = [
    { metric: 'Response Time', target: 'Under defined threshold', importance: 'User experience' },
    { metric: 'Throughput', target: 'Requests per second', importance: 'Capacity' },
    { metric: 'Error Rate', target: 'Below acceptable percentage', importance: 'Reliability' },
    { metric: 'Resource Usage', target: 'CPU, memory, network limits', importance: 'Efficiency' },
    { metric: 'Concurrent Users', target: 'Maximum supported', importance: 'Capacity' },
  ];

  const tools = [
    'JMeter - Java-based, comprehensive',
    'Gatling - Scala-based, high performance',
    'Locust - Python-based, distributed',
    'k6 - JavaScript, modern',
    'LoadRunner - Enterprise, comprehensive',
    'Apache Benchmark (ab) - Simple, quick',
  ];

  const process = [
    'Define performance goals',
    'Identify test scenarios',
    'Create test scripts',
    'Configure test environment',
    'Execute tests',
    'Monitor and collect data',
    'Analyze results',
    'Identify bottlenecks',
    'Optimize and retest',
    'Document findings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Performance Testing Guide</h1>
      <p className="text-zinc-600">Testing types, metrics, tools, and process.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Goal: {t.goal}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Target: {m.target}</div>
              <div className="text-green-600 mt-1">Importance: {m.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.split(' ')[0]} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Testing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define clear performance requirements. 2. Identify critical user scenarios. 3. Choose appropriate test types. 4. Select testing tools. 5. Create realistic test data. 6. Configure test environment. 7. Set monitoring/metrics collection. 8. Execute tests systematically. 9. Analyze results thoroughly. 10. Identify bottlenecks. 11. Optimize iteratively. 12. Document and report findings. Performance testing = verify speed and capacity. Define goals first. Test before production. Measure key metrics. Find and fix bottlenecks. Regular testing essential."
        </div>
      </div>
    </main>
  );
}