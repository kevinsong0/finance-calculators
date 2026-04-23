'use client'

export default function BusinessDividendPolicyGuide() {
  const policies = [
    { policy: 'Stable dividend', approach: 'Consistent payouts', benefit: 'Investor confidence' },
    { policy: 'Residual dividend', approach: 'Remaining profits', benefit: 'Investment priority' },
    { policy: 'Constant payout ratio', approach: 'Fixed percentage', benefit: 'Profitability link' },
    { policy: 'Low regular plus extra', approach: 'Base plus special', benefit: 'Flexibility' },
  ];

  const factors = [
    'Profitability level',
    'Cash flow stability',
    'Growth opportunities',
    'Capital requirements',
    'Debt obligations',
    'Tax considerations',
    'Shareholder preferences',
    'Industry practices',
    'Economic conditions',
    'Legal restrictions',
  ];

  const decisions = [
    { decision: 'Payout ratio', consideration: 'Distribution percentage', impact: 'Cash retention' },
    { decision: 'Dividend frequency', consideration: 'Payment schedule', impact: 'Cash timing' },
    { decision: 'Dividend growth', consideration: 'Increase rate', impact: 'Expectations' },
    { decision: 'Special dividends', consideration: 'Extra payouts', impact: 'Flexibility' },
  ];

  const metrics = [
    'Dividend payout ratio',
    'Dividend yield',
    'Dividend growth rate',
    'Dividend coverage ratio',
    'Dividend per share',
    'Total dividend payout',
    'Retention ratio',
    'Dividend stability index',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Dividend Policy Guide</h1>
      <p className="text-zinc-600">Policies, factors, decisions, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Types</h3>
        <div className="space-y-1 text-xs">
          {policies.map((p) => (
            <div key={p.policy} className="bg-white rounded p-2">
              <strong>{p.policy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {p.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Influencing Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Decisions</h3>
        <div className="space-y-1 text-xs">
          {decisions.map((d) => (
            <div key={d.decision} className="bg-white rounded p-2">
              <strong>{d.decision}</strong>
              <div className="text-zinc-500 mt-1">Consideration: {d.consideration}</div>
              <div className="text-green-600 mt-1">Impact: {d.impact}</div>
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
        <h3 className="font-medium mb-2">Dividend Policy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze profitability level. 2. Assess cash flow stability. 3. Evaluate growth opportunities. 4. Determine capital requirements. 5. Consider debt obligations. 6. Evaluate tax effects. 7. Understand shareholder preferences. 8. Review industry practices. 9. Assess economic conditions. 10. Comply with legal requirements. Dividend policy = shareholder value. Profitability analyzed. Cash assessed. Growth evaluated. Requirements determined. Debt considered. Tax evaluated. Preferences understood. Practices reviewed. Conditions assessed. Legal compliance met.
        </div>
      </div>
    </main>
  );
}
