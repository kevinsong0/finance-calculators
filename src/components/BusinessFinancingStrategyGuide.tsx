'use client'

export default function BusinessFinancingStrategyGuide() {
  const sources = [
    { source: 'Internal financing', method: 'Retained earnings', benefit: 'No external cost' },
    { source: 'Bank financing', method: 'Loans and credit', benefit: 'Flexible access' },
    { source: 'Equity financing', method: 'Share issuance', benefit: 'Permanent capital' },
    { source: 'Bond financing', method: 'Debt securities', benefit: 'Market access' },
  ];

  const strategies = [
    'Match financing to needs',
    'Optimize cost of capital',
    'Balance risk and return',
    'Maintain financing flexibility',
    'Plan financing timing',
    'Diversify funding sources',
    'Monitor market conditions',
    'Prepare financing contingencies',
    'Evaluate financing alternatives',
    'Execute financing decisions',
  ];

  const considerations = [
    { consideration: 'Cost', factor: 'Interest/dividend expense', evaluation: 'Cost analysis' },
    { consideration: 'Risk', factor: 'Financial obligations', evaluation: 'Risk assessment' },
    { consideration: 'Control', factor: 'Ownership dilution', evaluation: 'Control preservation' },
    { consideration: 'Flexibility', factor: 'Future financing access', evaluation: 'Capacity planning' },
  ];

  const metrics = [
    'Cost of capital',
    'Financing mix ratio',
    'Interest expense ratio',
    'Debt service coverage',
    'Financing availability',
    'Refinancing success',
    'Capital raise efficiency',
    'Financing timeline',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financing Strategy Guide</h1>
      <p className="text-zinc-600">Sources, strategies, considerations, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Financing Sources</h3>
        <div className="space-y-1 text-xs">
          {sources.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong>{s.source}</strong>
              <div className="text-zinc-500 mt-1">Method: {s.method}</div>
              <div className="text-green-600 mt-1">Benefit: {s.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategy Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Factor: {c.factor}</div>
              <div className="text-green-600 mt-1">Evaluation: {c.evaluation}</div>
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
        <h3 className="font-medium mb-2">Financing Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Match financing to needs precisely. 2. Optimize cost of capital carefully. 3. Balance risk and return appropriately. 4. Maintain financing flexibility continuously. 5. Plan financing timing strategically. 6. Diversify funding sources wisely. 7. Monitor market conditions vigilantly. 8. Prepare financing contingencies proactively. 9. Evaluate financing alternatives thoroughly. 10. Execute financing decisions confidently. Financing strategy = capital access. Needs matched. Cost optimized. Balance achieved. Flexibility maintained. Timing planned. Sources diversified. Conditions monitored. Contingencies prepared. Alternatives evaluated. Decisions executed.
        </div>
      </div>
    </main>
  );
}
