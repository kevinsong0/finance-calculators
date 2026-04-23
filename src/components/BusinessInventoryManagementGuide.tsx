'use client'

export default function BusinessInventoryManagementGuide() {
  const methods = [
    { method: 'ABC analysis', basis: 'Value classification', benefit: 'Focus priority' },
    { method: 'EOQ model', basis: 'Economic order quantity', benefit: 'Cost optimization' },
    { method: 'Just-in-time', basis: 'Demand timing', benefit: 'Waste reduction' },
    { method: 'Safety stock', basis: 'Buffer inventory', benefit: 'Risk protection' },
    { method: 'Perpetual tracking', basis: 'Continuous update', benefit: 'Real-time accuracy' },
    { method: 'Periodic review', basis: 'Scheduled checks', benefit: 'Control cycles' },
  ];

  const controls = [
    'Stock level monitoring',
    ' reorder point setting',
    'Lead time tracking',
    'Supplier management',
    'Demand forecasting',
    'Quality inspection',
    'Warehouse organization',
    'Inventory auditing',
  ];

  const metrics = [
    { metric: 'Inventory turnover', formula: 'Sales / Average inventory', insight: 'Efficiency' },
    { metric: 'Days inventory', formula: 'Inventory / Daily sales', insight: 'Holding time' },
    { metric: 'Fill rate', formula: 'Orders filled / Orders', insight: 'Service level' },
    { metric: 'Carrying cost', formula: 'Storage, handling costs', insight: 'Cost burden' },
  ];

  const challenges = [
    { challenge: 'Overstock', issue: 'Excess inventory', solution: 'Demand forecasting' },
    { challenge: 'Stockout', issue: 'Inventory shortage', solution: 'Safety stock' },
    { challenge: 'Obsolescence', issue: 'Expired inventory', solution: 'Turnover management' },
    { challenge: 'Tracking errors', issue: ' inaccurate counts', solution: 'System updates' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Inventory Management Guide</h1>
      <p className="text-zinc-600">Methods, controls, metrics, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Basis: {m.basis}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Inventory Controls</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {controls.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Formula: {m.formula}</div>
              <div className="text-green-600 mt-1">Insight: {m.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">Issue: {c.issue}</div>
              <div className="text-green-600 mt-1">Solution: {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Inventory Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate method. 2. Implement inventory controls. 3. Track key metrics. 4. Address challenges proactively. 5. Monitor stock levels. 6. Set reorder points. 7. Track lead times. 8. Manage suppliers. 9. Forecast demand. 10. Conduct regular audits. Inventory management = balance optimization. Method chosen. Controls implemented. Metrics tracked. Challenges addressed. Levels monitored. Reorder points set. Lead times tracked. Suppliers managed. Demand forecasted. Audits conducted.
        </div>
      </div>
    </main>
  );
}