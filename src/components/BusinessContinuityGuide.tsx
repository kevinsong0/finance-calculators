'use client'

export default function BusinessContinuityGuide() {
  const elements = [
    { element: 'Risk Assessment', desc: 'Identify potential disruptions', output: 'Risk register' },
    { element: 'Impact Analysis', desc: 'Assess disruption effects', output: 'Business impact analysis' },
    { element: 'Recovery Strategies', desc: 'Plan response methods', output: 'Recovery options' },
    { element: 'Plan Development', desc: 'Document procedures', output: 'BCP document' },
    { element: 'Training', desc: 'Train employees', output: 'Competent team' },
    { element: 'Testing', desc: 'Validate plan works', output: 'Test results' },
  ];

  const priorities = [
    { priority: 'Critical', systems: 'Must restore immediately', tolerance: 'Minutes/hours' },
    { priority: 'Essential', systems: 'Restore within hours', tolerance: 'Hours to 1 day' },
    { priority: 'Important', systems: 'Restore within days', tolerance: '1-3 days' },
    { priority: 'Non-critical', systems: 'Restore when possible', tolerance: 'Week+ acceptable' },
  ];

  const components = [
    'Risk assessment',
    'Business impact analysis',
    'Recovery strategies',
    'Plan documentation',
    'Communication protocols',
    'Alternate facilities',
    'Backup systems',
    'Testing program',
  ];

  const testing = [
    'Tabletop exercises',
    'Walkthrough testing',
    'Component testing',
    'Full simulation',
    'Annual comprehensive test',
    'Post-test improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Continuity Guide</h1>
      <p className="text-zinc-600">BCP elements, priorities, components, and testing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">BCP Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">{e.desc}</div>
              <div className="text-green-600 mt-1">Output: {e.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">System Priorities</h3>
        <div className="space-y-1 text-xs">
          {priorities.map((p) => (
            <div key={p.priority} className="bg-white rounded p-2">
              <strong className="text-red-600">{p.priority}</strong>
              <div className="text-zinc-500 mt-1">{p.systems}</div>
              <div className="text-green-600 mt-1">Tolerance: {p.tolerance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">BCP Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Program</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {testing.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Business Continuity Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Conduct risk assessment. 2. Perform business impact analysis. 3. Identify critical functions. 4. Define recovery priorities. 5. Develop recovery strategies. 6. Document comprehensive plan. 7. Establish communication protocols. 8. Identify alternate facilities. 9. Train all employees. 10. Test plan regularly. 11. Update based on test results. 12. Review annually. Business continuity = keep business running. Assess risks. Prioritize systems. Document plan. Train team. Test regularly. Update continuously."
        </div>
      </div>
    </main>
  );
}