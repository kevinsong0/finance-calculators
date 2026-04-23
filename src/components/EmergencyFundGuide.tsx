'use client'

export default function EmergencyFundGuide() {
  const fundSizes = [
    { situation: 'Stable job, single income', size: '3 months expenses', reason: 'Basic buffer' },
    { situation: 'Variable income, freelance', size: '6-9 months expenses', reason: 'Income volatility' },
    { situation: 'Single income household', size: '6 months expenses', reason: 'No backup income' },
    { situation: 'High medical risk', size: '6+ months expenses', reason: 'Unexpected costs' },
    { situation: 'Job market uncertain', size: '6-9 months expenses', reason: 'Longer job search' },
  ];

  const steps = [
    'Calculate monthly expenses',
    'Determine target size',
    'Set monthly savings goal',
    'Open separate account',
    'Automate transfers',
    'Track progress',
    'Reach first milestone ($1,000)',
    'Continue to full target',
  ];

  const priorities = [
    '1. $1,000 starter fund',
    '2. 1 month expenses',
    '3. 3 months expenses',
    '4. 6 months expenses',
    '5. Extended fund if needed',
  ];

  const uses = [
    'Job loss - living expenses',
    'Medical emergency',
    'Car repair essential',
    'Home repair urgent',
    'Unexpected travel',
    'Family emergency',
  ];

  const dontUse = [
    'Vacations',
    'Planned purchases',
    'Investment opportunities',
    'Debt payoff (use separate)',
    'Non-urgent repairs',
    'Lifestyle upgrades',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Emergency Fund Planning Guide</h1>
      <p className="text-zinc-600">Fund sizing, savings steps, and proper usage.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Fund Size by Situation</h3>
        <div className="space-y-1 text-xs">
          {fundSizes.map((f) => (
            <div key={f.situation} className="bg-white rounded p-2">
              <strong>{f.situation}</strong>
              <div className="text-green-600 mt-1">Size: {f.size}</div>
              <div className="text-zinc-500 mt-1">Reason: {f.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Building Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Priority Milestones</h3>
        <div className="space-y-1 text-xs">
          {priorities.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Appropriate Uses</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {uses.map((u) => (
            <div key={u} className="bg-white rounded p-2 text-green-600">✓ {u}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Not For These</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {dontUse.map((d) => (
            <div key={d} className="bg-white rounded p-2 text-red-600">✗ {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Emergency Fund Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate true monthly expenses (needs only). 2. Assess risk factors (job stability, health, income variability). 3. Set target based on situation. 4. Determine monthly savings needed. 5. Open high-yield savings account separate from spending. 6. Automate monthly transfer. 7. First goal: $1,000 minimum. 8. Second goal: 1 month expenses. 9. Third goal: 3 months expenses. 10. Final goal: full target. 11. Keep liquid (accessible within 1-2 days). 12. Replenish after use. Emergency fund = financial foundation. No buffer = debt spiral risk. Start small, build consistently. Protect from temptation spending."
        </div>
      </div>
    </main>
  );
}