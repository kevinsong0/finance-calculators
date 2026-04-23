'use client'

export default function BusinessCashFlowManagementGuide() {
  const components = [
    { component: 'Operating cash', source: 'Business operations', importance: 'Core funding' },
    { component: 'Investing cash', source: 'Asset transactions', importance: 'Capital decisions' },
    { component: 'Financing cash', source: 'Debt, equity', importance: 'External funding' },
    { component: 'Working capital', source: 'Current assets', importance: 'Short-term liquidity' },
    { component: 'Reserve funds', source: 'Saved cash', importance: 'Emergency buffer' },
    { component: 'Credit access', source: 'Borrowing capacity', importance: 'Flexibility' },
  ];

  const process = [
    'Track all cash movements',
    'Categorize cash flows',
    'Project future cash',
    'Identify shortfalls',
    'Plan mitigation actions',
    'Monitor cash position',
    'Optimize timing',
    'Manage receivables',
    'Control payables',
    'Review regularly',
  ];

  const strategies = [
    { strategy: 'Accelerate receivables', benefit: 'Cash inflow faster', implementation: 'Invoice promptly' },
    { strategy: 'Delay payables', benefit: 'Cash retention longer', implementation: 'Negotiate terms' },
    { strategy: 'Reduce expenses', benefit: 'Lower cash outflow', implementation: 'Cost cutting' },
    { strategy: 'Build reserves', benefit: 'Safety buffer', implementation: 'Regular saving' },
  ];

  const challenges = [
    'Seasonal fluctuations',
    'Unexpected expenses',
    'Delayed payments',
    'Overextension',
    'Insufficient reserves',
    'Poor forecasting',
    'Timing mismatches',
    'Credit constraints',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Cash Flow Management Guide</h1>
      <p className="text-zinc-600">Components, process, strategies, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Source: {c.source}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {s.benefit}</div>
              <div className="text-green-600 mt-1">Implementation: {s.implementation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {challenges.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Track all cash movements daily. 2. Categorize flows accurately. 3. Project future cash needs. 4. Identify potential shortfalls early. 5. Plan mitigation actions proactively. 6. Monitor cash position continuously. 7. Optimize transaction timing. 8. Manage receivables aggressively. 9. Control payables strategically. 10. Review cash position regularly. Cash flow management = business survival. Movements tracked. Flows categorized. Future projected. Shortfalls identified. Mitigation planned. Position monitored. Timing optimized. Receivables managed. Payables controlled. Reviews conducted.
        </div>
      </div>
    </main>
  );
}