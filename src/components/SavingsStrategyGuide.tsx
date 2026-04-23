'use client'

export default function SavingsStrategyGuide() {
  const strategies = [
    { strategy: 'Pay Yourself First', desc: 'Save before spending', action: 'Auto-transfer on payday' },
    { strategy: '50/30/20 Rule', desc: 'Budget-based savings', action: '20% to savings automatically' },
    { strategy: 'Round-Up Savings', desc: 'Small amounts from purchases', action: 'Round up spare change' },
    { strategy: 'Goal-Based Savings', desc: 'Separate accounts per goal', action: 'Dedicated savings accounts' },
    { strategy: 'Challenge Savings', desc: 'Gamified saving', action: '52-week challenge, no-spend days' },
    { strategy: 'Windfall Savings', desc: 'Save unexpected money', action: 'Bonus, gift, refund → savings' },
  ];

  const accountTypes = [
    { type: 'High-Yield Savings', rate: '4-5% APY', use: 'Emergency fund, short-term' },
    { type: 'Money Market', rate: '4-5% APY', use: 'Larger balances, limited withdrawals' },
    { type: 'CD (Certificate)', rate: '4-6% APY', use: 'Fixed timeline, guaranteed rate' },
    { type: 'Treasury Bills', rate: '4-5%', use: 'Government-backed, short-term' },
    { type: 'I Bonds', rate: 'Inflation-adjusted', use: 'Inflation protection' },
    { type: 'Regular Savings', rate: '0.01-0.5%', use: 'Avoid - too low' },
  ];

  const automationTips = [
    'Auto-transfer on payday',
    'Direct deposit split',
    'Round-up apps enabled',
    'Automatic investment',
    'Scheduled recurring transfers',
    'Bill pay automation',
    'Savings goal reminders',
    'Progress notifications',
  ];

  const mistakes = [
    'Waiting until end of month',
    'No separate account',
    'Easy access to savings',
    'No specific goal',
    'Saving leftover only',
    'Low-interest accounts',
    'Not increasing with income',
    'One-time not consistent',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Savings Strategy Guide</h1>
      <p className="text-zinc-600">Saving methods, account types, and automation tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Savings Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Action: {s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Savings Account Types</h3>
        <div className="space-y-1 text-xs">
          {accountTypes.map((a) => (
            <div key={a.type} className="bg-white rounded p-2">
              <strong>{a.type}</strong>
              <div className="text-green-600 mt-1">Rate: {a.rate}</div>
              <div className="text-zinc-500 mt-1">Use: {a.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Automation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {automationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Savings Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set specific savings goals. 2. Open high-yield savings account. 3. Automate transfers on payday. 4. Save before spending (pay yourself first). 5. Keep savings separate from spending. 6. Increase savings rate with raises. 7. Save windfalls immediately. 8. Use round-up apps for extra. 9. Review savings rate quarterly. 10. Celebrate milestone achievements. Savings = financial security foundation. No savings = vulnerable to setbacks. Automate, separate account, increase over time. Consistency over amount at first."
        </div>
      </div>
    </main>
  );
}