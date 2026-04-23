'use client'

export default function FinancialGoalSettingGuide() {
  const goalTypes = [
    { type: 'Short-term', timeframe: 'Under 1 year', example: 'Emergency fund, vacation' },
    { type: 'Medium-term', timeframe: '1-5 years', example: 'Car, home down payment' },
    { type: 'Long-term', timeframe: '5+ years', example: 'Retirement, college fund' },
    { type: 'Lifestyle', timeframe: 'Ongoing', example: 'Debt-free living, travel annually' },
  ];

  const goalSteps = [
    'Define specific goal',
    'Set target amount',
    'Choose deadline',
    'Calculate monthly need',
    'Create action plan',
    'Track progress',
    'Adjust if needed',
    'Celebrate milestone',
  ];

  const smartGoals = [
    'Specific: Clear definition',
    'Measurable: Exact amount',
    'Achievable: Realistic target',
    'Relevant: Matches values',
    'Time-bound: Deadline set',
  ];

  const priorityOrder = [
    '1. Emergency fund (3-6 months)',
    '2. High-interest debt payoff',
    '3. Retirement contributions',
    '4. Medium-term savings goals',
    '5. Long-term wealth building',
    '6. Lifestyle discretionary goals',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Financial Goal Setting Guide</h1>
      <p className="text-zinc-600">Goal types, SMART framework, and priority hierarchy.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Goal Types</h3>
        <div className="space-y-1 text-xs">
          {goalTypes.map((g) => (
            <div key={g.type} className="bg-white rounded p-2">
              <strong>{g.type}</strong>
              <div className="text-zinc-500 mt-1">{g.timeframe}</div>
              <div className="text-green-600 mt-1">Example: {g.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Goal Setting Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {goalSteps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SMART Goal Framework</h3>
        <div className="space-y-1 text-xs">
          {smartGoals.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Priority Order</h3>
        <div className="space-y-1 text-xs">
          {priorityOrder.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Goal Setting Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify what matters to you. 2. Set specific financial goals. 3. Define target amounts. 4. Choose realistic deadlines. 5. Calculate monthly savings needed. 6. Align goals with income reality. 7. Prioritize by importance. 8. Create tracking system. 9. Review progress monthly. 10. Adjust timeline if needed. 11. Automate savings when possible. 12. Celebrate milestones achieved. Goals = financial direction. No goals = drifting. Specific, measurable, achievable, time-bound. Track and adjust."
        </div>
      </div>
    </main>
  );
}