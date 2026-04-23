'use client'

export default function BusinessCreditManagementGuide() {
  const types = [
    { type: 'Trade credit', source: 'Supplier financing', focus: 'Working capital' },
    { type: 'Bank credit', source: 'Bank financing', focus: 'Liquidity' },
    { type: 'Customer credit', source: 'Customer receivables', focus: 'Revenue collection' },
    { type: 'Line of credit', source: 'Flexible borrowing', focus: 'Cash flexibility' },
  ];

  const processes = [
    'Credit assessment',
    'Credit approval',
    'Credit monitoring',
    'Credit collection',
    'Credit adjustment',
    'Credit reporting',
    'Credit risk evaluation',
    'Credit limit setting',
    'Credit terms negotiation',
    'Credit policy enforcement',
  ];

  const policies = [
    { policy: 'Credit limits', purpose: 'Risk containment', implementation: 'Customer categorization' },
    { policy: 'Credit terms', purpose: 'Payment timing', implementation: 'Standard terms' },
    { policy: 'Collection procedures', purpose: 'Receivables recovery', implementation: 'Step-by-step process' },
    { policy: 'Credit review', purpose: 'Regular assessment', implementation: 'Periodic evaluation' },
  ];

  const metrics = [
    'Days sales outstanding',
    'Credit utilization ratio',
    'Bad debt percentage',
    'Collection efficiency',
    'Credit loss ratio',
    'Average collection period',
    'Credit approval rate',
    'Credit risk score',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Credit Management Guide</h1>
      <p className="text-zinc-600">Types, processes, policies, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Source: {t.source}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Policies</h3>
        <div className="space-y-1 text-xs">
          {policies.map((p) => (
            <div key={p.policy} className="bg-white rounded p-2">
              <strong>{p.policy}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {p.purpose}</div>
              <div className="text-green-600 mt-1">Implementation: {p.implementation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess credit applications thoroughly. 2. Approve credit appropriately. 3. Monitor credit usage continuously. 4. Collect receivables promptly. 5. Adjust credit terms flexibly. 6. Report credit status regularly. 7. Evaluate credit risks carefully. 8. Set credit limits strategically. 9. Negotiate terms effectively. 10. Enforce policies consistently. Credit management = financial discipline. Applications assessed. Credit approved. Usage monitored. Receivables collected. Terms adjusted. Status reported. Risks evaluated. Limits set. Terms negotiated. Policies enforced.
        </div>
      </div>
    </main>
  );
}
