'use client'

export default function TaxEfficientInvestingGuide() {
  const accountTypes = [
    { account: '401(k) Traditional', benefit: 'Tax-deferred growth', when: 'High current income' },
    { account: 'Roth IRA', benefit: 'Tax-free growth & withdrawal', when: 'Lower current income, young' },
    { account: 'HSA', benefit: 'Triple tax advantage', when: 'Healthcare expenses, extra savings' },
    { account: '529 Plan', benefit: 'Tax-free for education', when: 'College savings goal' },
    { account: 'Taxable Brokerage', benefit: 'No limits, flexibility', when: 'Maxed other accounts' },
    { account: 'Municipal Bonds', benefit: 'Tax-free interest', when: 'High tax bracket' },
  ];

  const strategies = [
    'Max employer match first',
    'Fill tax-advantaged accounts',
    'Roth vs Traditional by income',
    'HSA for triple benefit',
    'Tax-loss harvesting',
    'Asset location optimization',
    'Hold long-term for lower rates',
    'Avoid frequent trading',
  ];

  const assetLocation = [
    { asset: 'Bonds, REITs', location: 'Tax-advantaged', reason: 'High taxable income' },
    { asset: 'High-yield stocks', location: 'Tax-advantaged', reason: 'Dividend taxation' },
    { asset: 'Index funds', location: 'Taxable OK', reason: 'Low turnover, efficient' },
    { asset: 'Growth stocks', location: 'Taxable OK', reason: 'Long-term capital gains' },
    { asset: 'Municipal bonds', location: 'Taxable', reason: 'Already tax-free' },
  ];

  const capitalGains = [
    'Short-term: Ordinary income rate',
    'Long-term (1+ year): Lower rates',
    '0% rate: Income under $44,625',
    '15% rate: Most taxpayers',
    '20% rate: High income',
    'Hold 1+ year for advantage',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax-Efficient Investing Guide</h1>
      <p className="text-zinc-600">Account types, strategies, and asset location optimization.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax-Advantaged Accounts</h3>
        <div className="space-y-1 text-xs">
          {accountTypes.map((a) => (
            <div key={a.account} className="bg-white rounded p-2">
              <strong>{a.account}</strong>
              <div className="text-green-600 mt-1">{a.benefit}</div>
              <div className="text-zinc-500 mt-1">When: {a.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Asset Location</h3>
        <div className="space-y-1 text-xs">
          {assetLocation.map((a) => (
            <div key={a.asset} className="bg-white rounded p-2">
              <strong>{a.asset}</strong>
              <div className="text-green-600 mt-1">→ {a.location}</div>
              <div className="text-zinc-500 mt-1">{a.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Gains Rates</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {capitalGains.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax-Efficiency Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Maximize employer 401(k) match. 2. Choose Roth vs Traditional based on tax situation. 3. Fill tax-advantaged accounts first. 4. Use HSA for triple benefit. 5. Place tax-inefficient assets in tax-advantaged accounts. 6. Hold investments 1+ years for long-term rates. 7. Consider tax-loss harvesting annually. 8. Avoid high-turnover funds in taxable. 9. Municipal bonds for high tax brackets. 10. Review annually with tax changes. Tax efficiency = higher net returns. 1% tax savings compounds. Account choice, asset location, holding period matter."
        </div>
      </div>
    </main>
  );
}