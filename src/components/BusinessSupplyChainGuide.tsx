'use client'

export default function BusinessSupplyChainGuide() {
  const components = [
    { component: 'Suppliers', function: 'Source materials', importance: 'Quality inputs' },
    { component: 'Manufacturing', function: 'Transform materials', importance: 'Production capacity' },
    { component: 'Warehousing', function: 'Store inventory', importance: 'Availability buffer' },
    { component: 'Distribution', function: 'Move products', importance: 'Delivery capability' },
    { component: 'Retail', function: 'Sell to customers', importance: 'Market reach' },
    { component: 'Customers', function: 'Purchase products', importance: 'Demand source' },
  ];

  const flows = [
    'Material flow (physical goods)',
    'Information flow (data)',
    'Financial flow (money)',
    'Product flow (finished goods)',
    'Service flow (support)',
    'Reverse flow (returns)',
  ];

  const strategies = [
    { strategy: 'Lean supply chain', approach: 'Minimize waste', benefit: 'Cost reduction' },
    { strategy: 'Agile supply chain', approach: 'Flexibility focus', benefit: 'Responsiveness' },
    { strategy: 'Resilient supply chain', approach: 'Risk mitigation', benefit: 'Stability' },
    { strategy: 'Sustainable supply chain', approach: 'Environmental focus', benefit: 'Responsibility' },
  ];

  const challenges = [
    'Demand volatility',
    'Supply disruption',
    'Inventory imbalance',
    'Cost pressure',
    'Quality issues',
    'Delivery delays',
    'Information gaps',
    'Global complexity',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Supply Chain Guide</h1>
      <p className="text-zinc-600">Components, flows, strategies, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supply Chain Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Function: {c.function}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supply Chain Flows</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {flows.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {s.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {challenges.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supply Chain Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Map all supply chain components. 2. Understand flow directions. 3. Choose appropriate strategy. 4. Identify key challenges. 5. Build supplier relationships. 6. Optimize inventory levels. 7. Improve logistics efficiency. 8. Implement tracking systems. 9. Develop contingency plans. 10. Monitor performance metrics. Supply chain = operational backbone. Components mapped. Flows understood. Strategy chosen. Challenges identified. Relationships built. Inventory optimized. Logistics improved. Tracking implemented. Contingencies developed. Performance monitored.
        </div>
      </div>
    </main>
  );
}