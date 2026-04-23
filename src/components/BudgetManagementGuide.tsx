'use client'

export default function BudgetManagementGuide() {
  const methods = [
    { method: '50/30/20 Rule', desc: 'Needs/wants/savings split', action: '50% needs, 30% wants, 20% savings' },
    { method: 'Zero-Based', desc: 'Every dollar assigned', action: 'Plan all income allocation' },
    { method: 'Envelope Method', desc: 'Cash categories', action: 'Physical envelopes per category' },
    { method: 'Pay Yourself First', desc: 'Savings priority', action: 'Save before spending' },
    { method: 'Line-Item Budget', desc: 'Detailed categories', action: 'Track each expense type' },
    { method: 'Percentage Budget', desc: 'Income percentages', action: 'Fixed % per category' },
  ];

  const categories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Insurance',
    'Healthcare',
    'Savings',
    'Debt payments',
    'Entertainment',
    'Personal',
  ];

  const bestPractices = [
    'Track all expenses',
    'Review monthly',
    'Adjust as needed',
    'Include irregular expenses',
    'Build emergency fund',
    'Plan for large purchases',
    'Avoid lifestyle inflation',
    'Automate savings',
  ];

  const mistakes = [
    'Not tracking expenses',
    'Ignoring irregular costs',
    'No emergency fund',
    'Budgeting too tight',
    'Not reviewing regularly',
    'Lifestyle inflation',
    'No debt plan',
    'Impulse purchases',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Budget Management Guide</h1>
      <p className="text-zinc-600">Budgeting methods, categories, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budgeting Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Action: {m.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {categories.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
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
        <h3 className="font-medium mb-2">Budget Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate total income. 2. List all fixed expenses. 3. Estimate variable expenses. 4. Include irregular costs (annual). 5. Set savings target. 6. Allocate debt payments. 7. Plan discretionary spending. 8. Track daily expenses. 9. Review weekly progress. 10. Adjust monthly. 11. Evaluate quarterly. 12. Annual review and planning. Budget = spending plan. No budget = overspending. Track, plan, review, adjust. Financial control foundation."
        </div>
      </div>
    </main>
  );
}