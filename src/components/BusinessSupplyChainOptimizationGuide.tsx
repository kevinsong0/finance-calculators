'use client'

export default function BusinessSupplyChainOptimizationGuide() {
  const areas = [
    { area: 'Inventory optimization', focus: 'Stock levels', benefit: 'Cost reduction' },
    { area: 'Logistics optimization', focus: 'Transport efficiency', benefit: 'Speed' },
    { area: 'Supplier optimization', focus: 'Source selection', benefit: 'Quality' },
    { area: 'Process optimization', focus: 'Workflow efficiency', benefit: 'Productivity' },
    { area: 'Cost optimization', focus: 'Expense reduction', benefit: 'Margin' },
    { area: 'Risk optimization', focus: 'Disruption prevention', benefit: 'Reliability' },
  ];

  const methods = [
    'Analyze current supply chain',
    'Identify optimization opportunities',
    'Evaluate optimization options',
    'Design optimization solutions',
    'Implement optimization changes',
    'Monitor optimization results',
    'Measure optimization impact',
    'Adjust optimization approach',
    'Scale optimization success',
    'Sustain optimization gains',
  ];

  const techniques = [
    { technique: 'Lean principles', application: 'Waste elimination', outcome: 'Efficiency' },
    { technique: 'Technology integration', application: 'System automation', outcome: 'Speed' },
    { technique: 'Network redesign', application: 'Structure changes', outcome: 'Cost' },
    { technique: 'Collaboration enhancement', application: 'Partner coordination', outcome: 'Alignment' },
  ];

  const metrics = [
    'Supply chain cost',
    'Order fulfillment rate',
    'Inventory turnover',
    'Lead time reduction',
    'Supplier performance',
    'Logistics efficiency',
    'Supply chain flexibility',
    'Customer satisfaction',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Supply Chain Optimization Guide</h1>
      <p className="text-zinc-600">Areas, methods, techniques, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Benefit: {a.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Outcome: {t.outcome}</div>
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
        <h3 className="font-medium mb-2">Supply Chain Optimization Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze current supply chain thoroughly. 2. Identify optimization opportunities systematically. 3. Evaluate optimization options carefully. 4. Design optimization solutions effectively. 5. Implement optimization changes smoothly. 6. Monitor optimization results continuously. 7. Measure optimization impact accurately. 8. Adjust optimization approach as needed. 9. Scale optimization success widely. 10. Sustain optimization gains permanently. Supply chain optimization = competitive advantage. Chain analyzed. Opportunities identified. Options evaluated. Solutions designed. Changes implemented. Results monitored. Impact measured. Approach adjusted. Success scaled. Gains sustained.
        </div>
      </div>
    </main>
  );
}