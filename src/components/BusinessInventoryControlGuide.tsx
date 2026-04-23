'use client'

export default function BusinessInventoryControlGuide() {
  const methods = [
    { method: 'ABC analysis', description: 'Classify by value importance', benefit: 'Focus efficiency' },
    { method: 'Just-in-time', description: 'Minimize stock levels', benefit: 'Cost reduction' },
    { method: 'Safety stock', description: 'Buffer inventory', benefit: 'Risk mitigation' },
    { method: 'EOQ model', description: 'Optimal order quantity', benefit: 'Balance cost' },
  ];

  const controls = [
    'Set inventory policies',
    'Define reorder points',
    'Calculate safety stock',
    'Monitor stock levels',
    'Track inventory turnover',
    'Manage stock locations',
    'Audit inventory counts',
    'Adjust inventory records',
    'Forecast demand needs',
    'Optimize stock mix',
  ];

  const metrics = [
    { metric: 'Inventory turnover', formula: 'Sales/Average inventory', purpose: 'Efficiency measure' },
    { metric: 'Days inventory', formula: '365/Turnover ratio', purpose: 'Cash flow indicator' },
    { metric: 'Stock accuracy', formula: 'Correct counts/Total', purpose: 'Reliability measure' },
    { metric: 'Fill rate', formula: 'Orders filled/Total', purpose: 'Service level' },
  ];

  const challenges = [
    'Overstock costs',
    'Stockout risks',
    'Demand variability',
    'Lead time uncertainty',
    'Storage constraints',
    'Shrinkage losses',
    'Obsolescence risks',
    'Coordination complexity',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Inventory Control Guide</h1>
      <p className="text-zinc-600">Methods, controls, metrics, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Methods</h3>
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
        <h3 className="font-medium mb-2">Control Process</h3>
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
              <div className="text-green-600 mt-1">Purpose: {m.purpose}</div>
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
        <h3 className="font-medium mb-2">Inventory Control Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set inventory policies clearly. 2. Define reorder points accurately. 3. Calculate safety stock appropriately. 4. Monitor stock levels continuously. 5. Track inventory turnover regularly. 6. Manage stock locations efficiently. 7. Audit inventory counts periodically. 8. Adjust inventory records promptly. 9. Forecast demand needs accurately. 10. Optimize stock mix strategically. Inventory control = operational efficiency. Policies set. Reorder points defined. Safety stock calculated. Levels monitored. Turnover tracked. Locations managed. Counts audited. Records adjusted. Demand forecasted. Mix optimized.
        </div>
      </div>
    </main>
  );
}