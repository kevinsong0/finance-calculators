'use client'

export default function BusinessProcurementStrategyGuide() {
  const strategies = [
    { strategy: 'Cost leadership', approach: 'Lowest price sourcing', outcome: 'Savings' },
    { strategy: 'Quality focus', approach: 'Premium supplier selection', outcome: 'Reliability' },
    { strategy: 'Speed priority', approach: 'Quick delivery sourcing', outcome: 'Agility' },
    { strategy: 'Risk mitigation', approach: 'Diversified suppliers', outcome: 'Security' },
  ];

  const processes = [
    'Define procurement requirements',
    'Develop sourcing strategy',
    'Identify potential suppliers',
    'Evaluate supplier options',
    'Negotiate procurement terms',
    'Select supplier partners',
    'Execute procurement contracts',
    'Manage supplier relationships',
    'Monitor procurement performance',
    'Optimize procurement process',
  ];

  const methods = [
    { method: 'Competitive bidding', description: 'Multiple supplier quotes', benefit: 'Best price' },
    { method: 'Direct negotiation', description: 'Single supplier deal', benefit: 'Speed' },
    { method: 'E-procurement', description: 'Digital sourcing platform', benefit: 'Efficiency' },
    { method: 'Group purchasing', description: 'Consolidated buying', benefit: 'Volume leverage' },
  ];

  const metrics = [
    'Procurement cost savings',
    'Supplier compliance rate',
    'Order accuracy rate',
    'Delivery performance',
    'Procurement cycle time',
    'Supplier satisfaction',
    'Contract utilization',
    'Spend under management',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Procurement Strategy Guide</h1>
      <p className="text-zinc-600">Strategies, processes, methods, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Procurement Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Outcome: {s.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Procurement Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sourcing Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
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
        <h3 className="font-medium mb-2">Procurement Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define procurement requirements clearly. 2. Develop sourcing strategy strategically. 3. Identify potential suppliers thoroughly. 4. Evaluate supplier options comprehensively. 5. Negotiate procurement terms effectively. 6. Select supplier partners carefully. 7. Execute procurement contracts formally. 8. Manage supplier relationships actively. 9. Monitor procurement performance continuously. 10. Optimize procurement process systematically. Procurement strategy = cost efficiency. Requirements defined. Strategy developed. Suppliers identified. Options evaluated. Terms negotiated. Partners selected. Contracts executed. Relationships managed. Performance monitored. Process optimized.
        </div>
      </div>
    </main>
  );
}