'use client'

export default function BusinessCostControlGuide() {
  const categories = [
    { category: 'Direct costs', type: 'Production-related', control: 'Material, labor' },
    { category: 'Indirect costs', type: 'Overhead', control: 'Facilities, support' },
    { category: 'Fixed costs', type: 'Time-independent', control: 'Rent, salaries' },
    { category: 'Variable costs', type: 'Volume-dependent', control: 'Materials, utilities' },
    { category: 'Semi-variable costs', type: 'Partially fixed', control: 'Utilities, labor' },
    { category: 'Opportunity costs', type: 'Alternative foregone', control: 'Decision analysis' },
  ];

  const methods = [
    'Cost accounting',
    'Activity-based costing',
    'Standard costing',
    'Variance analysis',
    'Cost allocation',
    'Break-even analysis',
    'Target costing',
    'Life-cycle costing',
  ];

  const strategies = [
    { strategy: 'Eliminate waste', benefit: 'Direct savings', approach: 'Lean principles' },
    { strategy: 'Optimize processes', benefit: 'Efficiency gains', approach: 'Automation' },
    { strategy: 'Negotiate terms', benefit: 'Cost reduction', approach: 'Vendor management' },
    { strategy: 'Consolidate operations', benefit: 'Scale savings', approach: 'Centralization' },
  ];

  const monitoring = [
    'Track cost trends',
    'Compare to budget',
    'Analyze variances',
    'Identify outliers',
    'Review cost drivers',
    'Benchmark against peers',
    'Assess cost efficiency',
    'Report findings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Cost Control Guide</h1>
      <p className="text-zinc-600">Categories, methods, strategies, and monitoring.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-500 mt-1">Type: {c.type}</div>
              <div className="text-green-600 mt-1">Control: {c.control}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {s.benefit}</div>
              <div className="text-green-600 mt-1">Approach: {s.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Activities</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {monitoring.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Control Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Classify all costs properly. 2. Apply appropriate costing methods. 3. Eliminate identified waste. 4. Optimize inefficient processes. 5. Negotiate favorable terms. 6. Consolidate where beneficial. 7. Track cost trends continuously. 8. Compare costs to budget. 9. Analyze significant variances. 10. Report findings regularly. Cost control = competitive advantage. Costs classified. Methods applied. Waste eliminated. Processes optimized. Terms negotiated. Operations consolidated. Trends tracked. Budget compared. Variances analyzed. Findings reported.
        </div>
      </div>
    </main>
  );
}