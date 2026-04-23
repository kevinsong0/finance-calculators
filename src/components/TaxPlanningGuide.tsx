'use client'

export default function TaxPlanningGuide() {
  const strategies = [
    { strategy: 'Maximize Deductions', desc: 'Track all eligible deductions', benefit: 'Reduce taxable income' },
    { strategy: 'Tax-Advantaged Accounts', desc: '401k, IRA, HSA', benefit: 'Pre-tax contributions' },
    { strategy: 'Timing Income/Expenses', desc: 'Defer income, accelerate expenses', benefit: 'Lower current year tax' },
    { strategy: 'Capital Gains Management', desc: 'Hold >1 year, offset with losses', benefit: 'Lower rates, deductions' },
    { strategy: 'Charitable Giving', desc: 'Donate appreciated assets', benefit: 'Deduction + avoid gains' },
  ];

  const deductions = [
    { deduction: 'Standard vs Itemized', desc: 'Choose higher amount' },
    { deduction: 'Mortgage Interest', desc: 'Up to limits' },
    { deduction: 'State/Local Taxes', desc: 'SALT capped at $10k' },
    { deduction: 'Charitable Donations', desc: 'Up to income limits' },
    { deduction: 'Medical Expenses', desc: 'Exceed 7.5% AGI' },
    { deduction: 'Business Expenses', desc: 'If self-employed' },
  ];

  const accounts = [
    { account: '401(k)', limit: '$22,500 (2023)', benefit: 'Pre-tax, employer match' },
    { account: 'Traditional IRA', limit: '$6,500', benefit: 'Pre-tax deduction' },
    { account: 'Roth IRA', limit: '$6,500', benefit: 'Tax-free growth' },
    { account: 'HSA', limit: '$3,850 (single)', benefit: 'Triple tax advantage' },
  ];

  const tips = [
    'Start planning early',
    'Track expenses throughout year',
    'Understand your bracket',
    'Max retirement contributions',
    'Review before year-end',
    'Consider professional help',
    'Document everything',
    'Review annually',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tax Planning Guide</h1>
      <p className="text-zinc-600">Tax strategies, deductions, accounts, and planning tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Benefit: {s.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Deductions</h3>
        <div className="space-y-1 text-xs">
          {deductions.map((d) => (
            <div key={d.deduction} className="bg-white rounded p-2">
              <strong>{d.deduction}</strong>
              <div className="text-zinc-500 mt-1">{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax-Advantaged Accounts</h3>
        <div className="space-y-1 text-xs">
          {accounts.map((a) => (
            <div key={a.account} className="bg-white rounded p-2">
              <strong>{a.account}</strong>: Limit {a.limit}
              <div className="text-green-600 mt-1">Benefit: {a.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tax Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Understand your tax bracket. 2. Track all potential deductions. 3. Max retirement contributions. 4. Review investment gains/losses. 5. Consider HSA if eligible. 6. Evaluate standard vs itemized. 7. Plan charitable giving. 8. Review before December 31. 9. Gather documentation. 10. Consider professional advice. 11. File accurately. 12. Review outcome for next year. Tax planning = year-round. Not just at filing time. Legal strategies reduce taxes.
        </div>
      </div>
    </main>
  );
}