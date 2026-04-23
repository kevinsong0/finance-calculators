'use client'

export default function BusinessDebtManagementStrategyGuide() {
  const types = [
    { type: 'Short-term debt', maturity: 'Under 1 year', focus: 'Working capital' },
    { type: 'Long-term debt', maturity: 'Over 1 year', focus: 'Capital structure' },
    { type: 'Bank debt', maturity: 'Variable', focus: 'Financial flexibility' },
    { type: 'Bond debt', maturity: 'Fixed', focus: 'Market access' },
  ];

  const strategies = [
    'Debt reduction',
    'Debt refinancing',
    'Debt restructuring',
    'Debt consolidation',
    'Debt prioritization',
    'Debt scheduling',
    'Interest optimization',
    'Maturity management',
    'Covenant compliance',
    'Debt capacity planning',
  ];

  const techniques = [
    { technique: 'Snowball method', approach: 'Smallest debt first', benefit: 'Quick wins' },
    { technique: 'Avalanche method', approach: 'Highest interest first', benefit: 'Cost savings' },
    { technique: 'Refinancing', approach: 'Replace with lower rate', benefit: 'Interest reduction' },
    { technique: 'Consolidation', approach: 'Combine multiple debts', benefit: 'Simplified management' },
  ];

  const metrics = [
    'Debt-to-equity ratio',
    'Debt service coverage',
    'Interest coverage ratio',
    'Debt maturity profile',
    'Average interest rate',
    'Debt reduction progress',
    'Refinancing savings',
    'Debt capacity utilization',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Debt Management Strategy Guide</h1>
      <p className="text-zinc-600">Types, strategies, techniques, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Maturity: {t.maturity}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reduction Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-500 mt-1">Approach: {t.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
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
        <h3 className="font-medium mb-2">Debt Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all debts. 2. Classify debt types. 3. Calculate debt ratios. 4. Set reduction targets. 5. Apply reduction techniques. 6. Monitor interest rates. 7. Plan refinancing opportunities. 8. Manage maturities. 9. Comply with covenants. 10. Track progress regularly. Debt management = financial freedom. Debts identified. Types classified. Ratios calculated. Targets set. Techniques applied. Rates monitored. Refinancing planned. Maturities managed. Covenants complied. Progress tracked.
        </div>
      </div>
    </main>
  );
}
