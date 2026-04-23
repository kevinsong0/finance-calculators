'use client'

export default function BusinessCostManagementStrategyGuide() {
  const approaches = [
    { approach: 'Cost reduction', method: 'Eliminate unnecessary costs', outcome: 'Immediate savings' },
    { approach: 'Cost control', method: 'Monitor and limit spending', outcome: 'Sustainable efficiency' },
    { approach: 'Cost avoidance', method: 'Prevent future costs', outcome: 'Proactive savings' },
    { approach: 'Value engineering', method: 'Optimize cost-value ratio', outcome: 'Smart spending' },
  ];

  const techniques = [
    'Activity-based costing',
    'Lean cost management',
    'Target costing',
    'Kaizen costing',
    'Standard costing',
    'Life-cycle costing',
    'Benchmarking analysis',
    'Process improvement',
    'Supplier negotiations',
    'Automation investment',
  ];

  const areas = [
    { area: 'Direct costs', focus: 'Production expenses', potential: 'High impact' },
    { area: 'Indirect costs', focus: 'Support expenses', potential: 'Medium impact' },
    { area: 'Fixed costs', focus: 'Ongoing commitments', potential: 'Long-term focus' },
    { area: 'Variable costs', focus: 'Volume-dependent', potential: 'Quick wins' },
  ];

  const metrics = [
    'Cost per unit',
    'Cost efficiency ratio',
    'Cost reduction percentage',
    'Budget variance',
    'Cost avoidance achieved',
    'ROI on cost initiatives',
    'Operating expense ratio',
    'Cost per transaction',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Cost Management Strategy Guide</h1>
      <p className="text-zinc-600">Approaches, techniques, areas, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">Method: {a.method}</div>
              <div className="text-green-600 mt-1">Outcome: {a.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Focus Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Potential: {a.potential}</div>
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
        <h3 className="font-medium mb-2">Cost Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify cost reduction opportunities. 2. Implement cost control mechanisms. 3. Plan cost avoidance strategies. 4. Apply value engineering principles. 5. Use activity-based costing. 6. Benchmark against peers. 7. Negotiate supplier terms. 8. Automate processes strategically. 9. Measure cost metrics regularly. 10. Review cost strategy annually. Cost management = competitive advantage. Opportunities identified. Controls implemented. Avoidance planned. Engineering applied. Costing used. Benchmarks compared. Terms negotiated. Automation invested. Metrics measured. Strategy reviewed.
        </div>
      </div>
    </main>
  );
}