'use client'

export default function BusinessOperationsManagementGuide() {
  const functions = [
    { function: 'Process management', scope: 'Workflow optimization', outcome: 'Efficiency' },
    { function: 'Quality control', scope: 'Standard compliance', outcome: 'Consistency' },
    { function: 'Supply chain', scope: 'Material flow', outcome: 'Availability' },
    { function: 'Inventory management', scope: 'Stock control', outcome: 'Balance' },
    { function: 'Capacity planning', scope: 'Resource allocation', outcome: 'Utilization' },
    { function: 'Cost management', scope: 'Expense control', outcome: 'Profitability' },
  ];

  const principles = [
    'Continuous improvement',
    'Process standardization',
    'Quality focus',
    'Efficiency optimization',
    'Resource efficiency',
    'Customer satisfaction',
    'Cost effectiveness',
    'Risk management',
  ];

  const tools = [
    { tool: 'Process mapping', application: 'Visual workflows', benefit: 'Clarity' },
    { tool: 'Lean principles', application: 'Waste elimination', benefit: 'Efficiency' },
    { tool: 'Six sigma', application: 'Variation reduction', benefit: 'Quality' },
    { tool: 'KPI tracking', application: 'Performance monitoring', benefit: 'Accountability' },
  ];

  const metrics = [
    'Process efficiency',
    'Quality rate',
    'On-time delivery',
    'Inventory turnover',
    'Capacity utilization',
    'Cost per unit',
    'Productivity rate',
    'Customer satisfaction',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Operations Management Guide</h1>
      <p className="text-zinc-600">Functions, principles, tools, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operations Functions</h3>
        <div className="space-y-1 text-xs">
          {functions.map((f) => (
            <div key={f.function} className="bg-white rounded p-2">
              <strong>{f.function}</strong>
              <div className="text-zinc-500 mt-1">Scope: {f.scope}</div>
              <div className="text-green-600 mt-1">Outcome: {f.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operations Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operations Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operations Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define operations functions clearly. 2. Apply operations principles consistently. 3. Implement management tools effectively. 4. Track operations metrics actively. 5. Optimize processes continuously. 6. Control quality rigorously. 7. Manage supply chain proactively. 8. Balance inventory appropriately. 9. Plan capacity strategically. 10. Control costs carefully. Operations management = competitive advantage. Functions defined. Principles applied. Tools implemented. Metrics tracked. Processes optimized. Quality controlled. Supply chain managed. Inventory balanced. Capacity planned. Costs controlled.
        </div>
      </div>
    </main>
  );
}