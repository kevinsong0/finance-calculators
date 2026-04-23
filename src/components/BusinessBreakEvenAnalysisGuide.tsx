'use client'

export default function BusinessBreakEvenAnalysisGuide() {
  const types = [
    { type: 'Unit break-even', formula: 'Fixed costs/Contribution margin', purpose: 'Volume target' },
    { type: 'Revenue break-even', formula: 'Fixed costs/Margin ratio', purpose: 'Sales target' },
    { type: 'Time break-even', formula: 'Fixed costs/Monthly contribution', purpose: 'Months target' },
    { type: 'Cash break-even', formula: 'Cash fixed costs/Margin', purpose: 'Cash flow target' },
  ];

  const components = [
    'Fixed costs',
    'Variable costs',
    'Selling price',
    'Contribution margin',
    'Contribution ratio',
    'Operating costs',
    'Revenue level',
    'Profit margin',
  ];

  const analyses = [
    { analysis: 'Cost structure', method: 'Fixed vs variable', insight: 'Cost flexibility' },
    { analysis: 'Margin analysis', method: 'Price minus cost', insight: 'Unit profitability' },
    { analysis: 'Volume sensitivity', method: 'Price changes', insight: 'Break-even shifts' },
    { analysis: 'Safety margin', method: 'Actual vs break-even', insight: 'Risk buffer' },
  ];

  const applications = [
    'New product launch',
    'Business startup',
    'Pricing decisions',
    'Cost reduction',
    'Sales planning',
    'Profit forecasting',
    'Investment evaluation',
    'Risk assessment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Break-Even Analysis Guide</h1>
      <p className="text-zinc-600">Types, components, analyses, and applications.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Break-Even Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Formula: {t.formula}</div>
              <div className="text-green-600 mt-1">Purpose: {t.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="space-y-1 text-xs">
          {analyses.map((a) => (
            <div key={a.analysis} className="bg-white rounded p-2">
              <strong>{a.analysis}</strong>
              <div className="text-zinc-500 mt-1">Method: {a.method}</div>
              <div className="text-green-600 mt-1">Insight: {a.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Applications</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {applications.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Break-Even Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify fixed costs accurately. 2. Determine variable costs precisely. 3. Calculate contribution margin correctly. 4. Compute break-even point accurately. 5. Analyze cost structure thoroughly. 6. Evaluate margin sensitivity. 7. Calculate safety margin. 8. Apply to decisions appropriately. 9. Monitor actual performance. 10. Adjust for changes regularly. Break-even analysis = profit threshold. Costs identified. Variables determined. Margin calculated. Point computed. Structure analyzed. Sensitivity evaluated. Safety measured. Decisions informed. Performance monitored. Changes adjusted.
        </div>
      </div>
    </main>
  );
}
