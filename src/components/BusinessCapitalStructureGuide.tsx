'use client'

export default function BusinessCapitalStructureGuide() {
  const components = [
    { component: 'Equity capital', source: 'Owner investment', characteristic: 'Permanent' },
    { component: 'Debt capital', source: 'Borrowed funds', characteristic: 'Temporary' },
    { component: 'Retained earnings', source: 'Profit accumulation', characteristic: 'Internal' },
    { component: 'Hybrid securities', source: 'Mixed instruments', characteristic: 'Flexible' },
  ];

  const decisions = [
    'Determine optimal debt ratio',
    'Evaluate equity needs',
    'Assess financing alternatives',
    'Consider tax implications',
    'Analyze cost of capital',
    'Evaluate risk tolerance',
    'Plan capital raising',
    'Structure financing mix',
    'Monitor capital ratios',
    'Adjust capital structure',
  ];

  const factors = [
    { factor: 'Cost of capital', impact: 'Financing cost', consideration: 'Trade-off analysis' },
    { factor: 'Risk level', impact: 'Financial stability', consideration: 'Risk tolerance' },
    { factor: 'Tax benefits', impact: 'Interest deductibility', consideration: 'Tax efficiency' },
    { factor: 'Control considerations', impact: 'Ownership dilution', consideration: 'Control preservation' },
  ];

  const metrics = [
    'Debt-to-equity ratio',
    'Debt-to-assets ratio',
    'Interest coverage ratio',
    'Cost of capital',
    'Weighted average cost of capital',
    'Return on equity',
    'Financial leverage',
    'Capital efficiency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Capital Structure Guide</h1>
      <p className="text-zinc-600">Components, decisions, factors, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Source: {c.source}</div>
              <div className="text-green-600 mt-1">Characteristic: {c.characteristic}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Structure Decisions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {decisions.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {f.impact}</div>
              <div className="text-green-600 mt-1">Consideration: {f.consideration}</div>
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
        <h3 className="font-medium mb-2">Capital Structure Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Determine optimal debt ratio carefully. 2. Evaluate equity needs accurately. 3. Assess financing alternatives comprehensively. 4. Consider tax implications strategically. 5. Analyze cost of capital precisely. 6. Evaluate risk tolerance realistically. 7. Plan capital raising effectively. 8. Structure financing mix optimally. 9. Monitor capital ratios continuously. 10. Adjust capital structure flexibly. Capital structure = financial foundation. Debt ratio determined. Equity evaluated. Alternatives assessed. Tax considered. Cost analyzed. Tolerance evaluated. Raising planned. Mix structured. Ratios monitored. Structure adjusted.
        </div>
      </div>
    </main>
  );
}
