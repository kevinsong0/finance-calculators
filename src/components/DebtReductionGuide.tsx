'use client'

export default function DebtReductionGuide() {
  const strategies = [
    { strategy: 'Avalanche Method', desc: 'Highest interest first', benefit: 'Saves most interest' },
    { strategy: 'Snowball Method', desc: 'Smallest balance first', benefit: 'Quick wins, motivation' },
    { strategy: 'Hybrid Approach', desc: 'Combine both methods', benefit: 'Balance of savings and wins' },
    { strategy: 'Consolidation', desc: 'Single loan for multiple debts', benefit: 'Simplify, potentially lower rate' },
    { strategy: 'Balance Transfer', desc: 'Move to 0% APR card', benefit: 'Interest-free period' },
  ];

  const debtTypes = [
    { type: 'Credit Cards', priority: 'Highest', rate: '15-25% typical' },
    { type: 'Personal Loans', priority: 'High', rate: '5-15% typical' },
    { type: 'Auto Loans', priority: 'Medium', rate: '4-8% typical' },
    { type: 'Student Loans', priority: 'Lower', rate: '3-7% typical' },
    { type: 'Mortgage', priority: 'Last', rate: '3-6% typical' },
  ];

  const steps = [
    'List all debts',
    'Record balances',
    'Note interest rates',
    'Choose strategy',
    'Set payoff order',
    'Calculate timeline',
    'Allocate payments',
    'Track progress',
  ];

  const tips = [
    'Pay more than minimum',
    'Stop new debt',
    'Negotiate rates',
    'Consider consolidation',
    'Use windfalls wisely',
    'Automate payments',
    'Celebrate milestones',
    'Stay motivated',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Debt Reduction Strategy Guide</h1>
      <p className="text-zinc-600">Payoff strategies, debt prioritization, and timeline planning.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Strategies</h3>
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
        <h3 className="font-medium mb-2">Debt Types & Priority</h3>
        <div className="space-y-1 text-xs">
          {debtTypes.map((d) => (
            <div key={d.type} className="bg-white rounded p-2">
              <strong>{d.type}</strong>
              <div className="text-red-600 mt-1">Priority: {d.priority}</div>
              <div className="text-zinc-500 mt-1">Rate: {d.rate}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Payoff Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debt Reduction Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. List every debt (balance, rate, minimum). 2. Calculate total debt and monthly payments. 3. Choose payoff strategy. 4. Determine extra payment amount. 5. Apply extra to target debt. 6. Continue minimums on others. 7. When debt paid, roll payment to next. 8. Track progress monthly. 9. Celebrate each debt cleared. 10. Avoid new debt. 11. Consider rate negotiations. 12. Evaluate consolidation options. Debt payoff = freedom journey. Stop adding, start reducing. Strategy, consistency, celebration."
        </div>
      </div>
    </main>
  );
}