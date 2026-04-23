'use client'

export default function RetirementPlanningGuide() {
  const planningSteps = [
    { step: 'Set Retirement Goal', desc: 'Target savings amount', action: 'Calculate needed income' },
    { step: 'Choose Accounts', desc: '401k, IRA, Roth', action: 'Maximize tax benefits' },
    { step: 'Set Contribution Rate', desc: 'Monthly amount', action: '10-15% minimum' },
    { step: 'Asset Allocation', desc: 'Stocks/bonds mix', action: 'Age-based allocation' },
    { step: 'Automate Savings', desc: 'Regular contributions', action: 'Auto deductions' },
    { step: 'Monitor Progress', desc: 'Track growth', action: 'Annual review' },
  ];

  const accountTypes = [
    { account: '401(k)', limit: '$22,500/yr', benefit: 'Tax-deferred, employer match' },
    { account: 'Traditional IRA', limit: '$6,500/yr', benefit: 'Tax-deferred growth' },
    { account: 'Roth IRA', limit: '$6,500/yr', benefit: 'Tax-free withdrawals' },
    { account: 'Roth 401(k)', limit: '$22,500/yr', benefit: 'Tax-free withdrawals' },
    { account: 'SEP IRA', limit: '$66,000/yr', benefit: 'Self-employed, high limit' },
    { account: 'HSA', limit: '$3,850/yr', benefit: 'Triple tax advantage' },
  ];

  const milestones = [
    'Age 30: 1x annual salary',
    'Age 40: 3x annual salary',
    'Age 50: 6x annual salary',
    'Age 60: 8-10x annual salary',
    'Age 67: 10-12x annual salary',
  ];

  const factors = [
    'Expected retirement age',
    'Life expectancy',
    'Desired lifestyle',
    'Healthcare costs',
    'Social Security timing',
    'Inflation rate',
    'Investment returns',
    'Other income sources',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Retirement Planning Guide</h1>
      <p className="text-zinc-600">Planning steps, account types, milestones, and factors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Steps</h3>
        <div className="space-y-1 text-xs">
          {planningSteps.map((p) => (
            <div key={p.step} className="bg-white rounded p-2">
              <strong>{p.step}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Account Types</h3>
        <div className="space-y-1 text-xs">
          {accountTypes.map((a) => (
            <div key={a.account} className="bg-white rounded p-2">
              <strong>{a.account}</strong>
              <div className="text-green-600 mt-1">Limit: {a.limit}</div>
              <div className="text-zinc-500 mt-1">{a.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Savings Milestones</h3>
        <div className="space-y-1 text-xs">
          {milestones.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f) => (
            <div key={f} className="bg-white rounded p-2">{f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retirement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate retirement income needs (70-80% of current). 2. Estimate Social Security benefit. 3. Choose optimal account types. 4. Maximize employer match. 5. Set up automatic contributions. 6. Review asset allocation annually. 7. Increase contributions with raises. 8. Catch-up contributions after 50. 9. Plan healthcare coverage. 10. Consider retirement timing. 11. Review withdrawal strategy. 12. Update estate planning. Retirement = long-term planning. Start early, automate, increase regularly. Tax advantages compound over decades."
        </div>
      </div>
    </main>
  );
}