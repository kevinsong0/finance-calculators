'use client'

export default function BusinessTechnologyStrategyGuide() {
  const components = [
    { component: 'Technology vision', purpose: 'Future direction', outcome: 'Strategic alignment' },
    { component: 'Technology roadmap', purpose: 'Implementation path', outcome: 'Execution clarity' },
    { component: 'Technology investment', purpose: 'Resource allocation', outcome: 'Capability building' },
    { component: 'Technology governance', purpose: 'Decision framework', outcome: 'Risk management' },
  ];

  const processes = [
    'Assess technology needs',
    'Evaluate technology options',
    'Select technology solutions',
    'Plan technology implementation',
    'Allocate technology investment',
    'Build technology capabilities',
    'Implement technology systems',
    'Monitor technology performance',
    'Optimize technology usage',
    'Evolve technology strategy',
  ];

  const considerations = [
    { consideration: 'Business alignment', factor: 'Strategy fit', priority: 'Primary' },
    { consideration: 'Technical feasibility', factor: 'Implementation capability', priority: 'High' },
    { consideration: 'Cost effectiveness', factor: 'Value creation', priority: 'High' },
    { consideration: 'Risk management', factor: 'Uncertainty control', priority: 'Medium' },
  ];

  const metrics = [
    'Technology ROI',
    'Technology utilization',
    'System reliability',
    'Implementation success',
    'Capability development',
    'Cost efficiency',
    'Innovation contribution',
    'Strategic alignment score',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Technology Strategy Guide</h1>
      <p className="text-zinc-600">Components, processes, considerations, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategy Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {c.purpose}</div>
              <div className="text-green-600 mt-1">Outcome: {c.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategy Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Factor: {c.factor}</div>
              <div className="text-green-600 mt-1">Priority: {c.priority}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Technology Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess technology needs thoroughly. 2. Evaluate technology options comprehensively. 3. Select technology solutions wisely. 4. Plan technology implementation clearly. 5. Allocate technology investment strategically. 6. Build technology capabilities systematically. 7. Implement technology systems effectively. 8. Monitor technology performance continuously. 9. Optimize technology usage actively. 10. Evolve technology strategy continuously. Technology strategy = digital foundation. Needs assessed. Options evaluated. Solutions selected. Implementation planned. Investment allocated. Capabilities built. Systems implemented. Performance monitored. Usage optimized. Strategy evolved.
        </div>
      </div>
    </main>
  );
}
