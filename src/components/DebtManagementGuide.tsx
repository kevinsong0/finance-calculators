'use client'

export default function DebtManagementGuide() {
  const types = [
    { type: 'Credit Card', desc: 'High interest, revolving', strategy: 'Pay highest first, negotiate rates' },
    { type: 'Student Loans', desc: 'Education financing', strategy: 'Consider income-based repayment' },
    { type: 'Auto Loans', desc: 'Vehicle financing', strategy: 'Refinance if rates improved' },
    { type: 'Mortgage', desc: 'Home financing', strategy: 'Refinance, consider payoff strategy' },
    { type: 'Personal Loans', desc: 'Unsecured loans', strategy: 'Consolidate for lower rate' },
  ];

  const strategies = [
    { strategy: 'Snowball', desc: 'Pay smallest first, build momentum', pros: 'Psychological wins' },
    { strategy: 'Avalanche', desc: 'Pay highest interest first', pros: 'Mathematically optimal' },
    { strategy: 'Consolidation', desc: 'Combine into single loan', pros: 'Single payment, lower rate' },
    { strategy: 'Balance Transfer', desc: 'Move to low/zero rate card', pros: 'Interest savings' },
  ];

  const steps = [
    'List all debts with details',
    'Calculate total owed',
    'Choose payoff strategy',
    'Create payment plan',
    'Automate payments',
    'Track progress',
    'Negotiate rates',
    'Build emergency fund',
  ];

  const tips = [
    'Pay more than minimum',
    'Don&apos;t add new debt',
    'Negotiate interest rates',
    'Consider consolidation',
    'Track every payment',
    'Celebrate milestones',
    'Build habits first',
    'Seek professional help if needed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Debt Management Guide</h1>
      <p className="text-zinc-600">Debt types, payoff strategies, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Strategy: {t.strategy}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. List all debts (amount, rate, min payment). 2. Calculate total debt. 3. Assess income vs payments. 4. Choose strategy (snowball/avalanche). 5. Set payoff timeline. 6. Automate minimum payments. 7. Apply extra to target debt. 8. Track progress monthly. 9. Adjust as income changes. 10. Celebrate each payoff. 11. Build emergency fund. 12. Avoid new debt. Debt freedom = discipline + plan + patience.
        </div>
      </div>
    </main>
  );
}