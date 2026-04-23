'use client'

export default function BusinessBudgetAnalysisGuide() {
  const methods = [
    { method: 'Incremental budgeting', basis: 'Previous budget', benefit: 'Simple, stable' },
    { method: 'Zero-based budgeting', basis: 'Start from zero', benefit: 'Cost justification' },
    { method: 'Activity-based budgeting', basis: 'Activities', benefit: 'Cost accuracy' },
    { method: 'Value proposition budgeting', basis: 'Value created', benefit: 'Outcome focus' },
    { method: 'Flexible budgeting', basis: 'Activity levels', benefit: 'Adaptability' },
    { method: 'Rolling budgeting', basis: 'Continuous update', benefit: 'Timeliness' },
  ];

  var steps = [
    'Set budget objectives',
    'Define budget period',
    'Identify budget items',
    'Estimate revenues',
    'Estimate expenses',
    'Allocate resources',
    'Set budget targets',
    'Review and approve',
    'Implement budget',
    'Monitor performance',
  ];

  const analysis = [
    'Variance analysis',
    'Trend analysis',
    'Ratio analysis',
    'Performance comparison',
    'Forecasting accuracy',
    'Cost efficiency',
    'Resource utilization',
    'ROI measurement',
  ];

  const actions = [
    { action: 'Identify variances', trigger: 'Budget vs actual', response: 'Investigate causes' },
    { action: 'Adjust forecasts', trigger: 'Significant changes', response: 'Update budget' },
    { action: 'Control spending', trigger: 'Over budget areas', response: 'Implement limits' },
    { action: 'Reallocate resources', trigger: 'Priority changes', response: 'Modify allocation' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Budget Analysis Guide</h1>
      <p className="text-zinc-600">Methods, steps, analysis, and actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budgeting Methods</h3>
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
        <h3 className="font-medium mb-2">Budget Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {analysis.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Actions</h3>
        <div className="space-y-1 text-xs">
          {actions.map((a) => (
            <div key={a.action} className="bg-white rounded p-2">
              <strong>{a.action}</strong>
              <div className="text-zinc-500 mt-1">Trigger: {a.trigger}</div>
              <div className="text-green-600 mt-1">Response: {a.response}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear budget objectives. 2. Define budget period appropriately. 3. Identify all budget items. 4. Estimate revenues accurately. 5. Estimate expenses carefully. 6. Allocate resources strategically. 7. Set realistic budget targets. 8. Review and approve thoroughly. 9. Implement budget consistently. 10. Monitor performance regularly. Budget analysis = financial control. Objectives set. Period defined. Items identified. Revenues estimated. Expenses calculated. Resources allocated. Targets set. Budget approved. Implementation done. Performance monitored.
        </div>
      </div>
    </main>
  );
}