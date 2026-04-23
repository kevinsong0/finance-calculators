'use client'

export default function BusinessPricingStrategyGuide() {
  const models = [
    { model: 'Cost-plus pricing', basis: 'Cost + margin', advantage: 'Simple, predictable' },
    { model: 'Value-based pricing', basis: 'Customer value', advantage: 'Higher margins' },
    { model: 'Competitive pricing', basis: 'Market rates', advantage: 'Market aligned' },
    { model: 'Dynamic pricing', basis: 'Demand fluctuations', advantage: 'Revenue optimization' },
    { model: 'Freemium pricing', basis: 'Free + premium', advantage: 'User acquisition' },
    { model: 'Subscription pricing', basis: 'Recurring charge', advantage: 'Stable revenue' },
  ];

  const factors = [
    'Production costs',
    'Customer willingness to pay',
    'Competitor prices',
    'Market positioning',
    'Product differentiation',
    'Customer segment',
    'Distribution channel',
    'Brand perception',
  ];

  const tactics = [
    { tactic: 'Bundling', benefit: 'Value increase', approach: 'Package combinations' },
    { tactic: 'Tiered pricing', benefit: 'Segment coverage', approach: 'Feature levels' },
    { tactic: 'Psychological pricing', benefit: 'Perception impact', approach: 'Price endings' },
    { tactic: 'Promotional pricing', benefit: 'Sales boost', approach: 'Temporary discounts' },
  ];

  const optimization = [
    'Test price points',
    'Analyze elasticity',
    'Monitor competitor moves',
    'Track customer response',
    'Measure profit impact',
    'Evaluate market share',
    'Assess brand perception',
    'Adjust based on data',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Pricing Strategy Guide</h1>
      <p className="text-zinc-600">Models, factors, tactics, and optimization.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pricing Models</h3>
        <div className="space-y-1 text-xs">
          {models.map((m) => (
            <div key={m.model} className="bg-white rounded p-2">
              <strong>{m.model}</strong>
              <div className="text-zinc-500 mt-1">Basis: {m.basis}</div>
              <div className="text-green-600 mt-1">Advantage: {m.advantage}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pricing Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pricing Tactics</h3>
        <div className="space-y-1 text-xs">
          {tactics.map((t) => (
            <div key={t.tactic} className="bg-white rounded p-2">
              <strong>{t.tactic}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {t.benefit}</div>
              <div className="text-green-600 mt-1">Approach: {t.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {optimization.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pricing Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate pricing model. 2. Consider all pricing factors. 3. Apply pricing tactics strategically. 4. Test price points scientifically. 5. Analyze price elasticity. 6. Monitor competitor moves. 7. Track customer response. 8. Measure profit impact. 9. Evaluate market share. 10. Adjust based on data. Pricing strategy = profit maximization. Model chosen. Factors considered. Tactics applied. Prices tested. Elasticity analyzed. Competitors monitored. Response tracked. Impact measured. Share evaluated. Prices adjusted.
        </div>
      </div>
    </main>
  );
}