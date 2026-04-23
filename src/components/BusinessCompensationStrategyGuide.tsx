'use client'

export default function BusinessCompensationStrategyGuide() {
  const elements = [
    { element: 'Base salary', purpose: 'Market positioning', consideration: 'Competitive levels' },
    { element: 'Incentive pay', purpose: 'Performance drive', consideration: 'Goal alignment' },
    { element: 'Benefits package', purpose: 'Total rewards', consideration: 'Employee needs' },
    { element: 'Equity compensation', purpose: 'Long-term retention', consideration: 'Ownership' },
  ];

  const process = [
    'Conduct market analysis',
    'Define compensation philosophy',
    'Develop pay structures',
    'Create incentive plans',
    'Design benefits programs',
    'Implement compensation systems',
    'Communicate compensation',
    'Review compensation regularly',
    'Adjust compensation levels',
    'Monitor compensation effectiveness',
  ];

  const factors = [
    { factor: 'Market rates', impact: 'Competitive positioning', approach: 'Benchmarking' },
    { factor: 'Internal equity', impact: 'Fairness perception', approach: 'Job evaluation' },
    { factor: 'Performance', impact: 'Pay differentiation', approach: 'Merit systems' },
    { factor: 'Budget constraints', impact: 'Affordability', approach: 'Cost management' },
  ];

  const principles = [
    'External competitiveness',
    'Internal fairness',
    'Performance alignment',
    'Budget responsibility',
    'Legal compliance',
    'Transparency',
    'Flexibility',
    'Communication clarity',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Compensation Strategy Guide</h1>
      <p className="text-zinc-600">Elements, process, factors, and principles.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {e.purpose}</div>
              <div className="text-green-600 mt-1">Consideration: {e.consideration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategy Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {f.impact}</div>
              <div className="text-green-600 mt-1">Approach: {f.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategy Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Conduct thorough market analysis. 2. Define clear compensation philosophy. 3. Develop fair pay structures. 4. Create effective incentive plans. 5. Design comprehensive benefits programs. 6. Implement compensation systems properly. 7. Communicate compensation clearly. 8. Review compensation regularly. 9. Adjust compensation levels appropriately. 10. Monitor compensation effectiveness continuously. Compensation strategy = talent attraction and retention. Market analyzed. Philosophy defined. Structures developed. Incentives created. Benefits designed. Systems implemented. Communication delivered. Reviews conducted. Levels adjusted. Effectiveness monitored.
        </div>
      </div>
    </main>
  );
}