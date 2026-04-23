'use client'

export default function InventoryGuide() {
  const methods = [
    { method: 'ABC Analysis', desc: 'Categorize by value/importance', use: 'Prioritize management' },
    { method: 'Just-in-Time', desc: 'Minimize inventory levels', use: 'Reduce holding costs' },
    { method: 'Safety Stock', desc: 'Buffer for demand variability', use: 'Prevent stockouts' },
    { method: 'EOQ Model', desc: 'Optimal order quantity', use: 'Minimize total costs' },
    { method: 'FIFO/LIFO', desc: 'Inventory flow methods', use: 'Accounting choice' },
    { method: 'Perpetual System', desc: 'Real-time tracking', use: 'Accurate counts' },
  ];

  const metrics = [
    'Inventory turnover ratio',
    'Days inventory outstanding',
    'Stockout rate',
    'Carrying cost percentage',
    'Order accuracy rate',
    'Inventory accuracy',
  ];

  const controls = [
    'Regular cycle counting',
    'Reorder point alerts',
    'Lead time tracking',
    'Vendor performance review',
    'Obsolete inventory review',
    'Storage optimization',
    'Access control',
    'Documentation procedures',
  ];

  const costs = [
    { cost: 'Holding costs', components: 'Storage, insurance, depreciation' },
    { cost: 'Ordering costs', components: 'Processing, shipping, receiving' },
    { cost: 'Stockout costs', components: 'Lost sales, customer dissatisfaction' },
    { cost: 'Purchase costs', components: 'Unit price, quantity discounts' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Inventory Management Guide</h1>
      <p className="text-zinc-600">Methods, metrics, controls, and cost components.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Use: {m.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {controls.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Components</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.cost} className="bg-white rounded p-2">
              <strong>{c.cost}</strong>
              <div className="text-zinc-500 mt-1">{c.components}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Inventory Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate inventory method. 2. Set reorder points per item. 3. Calculate safety stock levels. 4. Monitor turnover ratios. 5. Review slow-moving items. 6. Implement cycle counting. 7. Track lead times accurately. 8. Evaluate vendor performance. 9. Minimize obsolete stock. 10. Optimize storage layout. 11. Document procedures. 12. Train staff on controls. Inventory = balance between shortage and excess. Too much = wasted capital, too little = lost sales. Track, analyze, optimize continuously."
        </div>
      </div>
    </main>
  );
}