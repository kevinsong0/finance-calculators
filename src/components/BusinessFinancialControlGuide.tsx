'use client'

export default function BusinessFinancialControlGuide() {
  const areas = [
    { area: 'Budgetary control', focus: 'Spending limits', purpose: 'Cost management' },
    { area: 'Cash control', focus: 'Cash flows', purpose: 'Liquidity management' },
    { area: 'Asset control', focus: 'Asset usage', purpose: 'Resource efficiency' },
    { area: 'Credit control', focus: 'Credit extension', purpose: 'Risk management' },
  ];

  const mechanisms = [
    'Budget approval process',
    'Expense authorization',
    'Cash flow monitoring',
    'Payment verification',
    'Asset tracking system',
    'Credit limit enforcement',
    'Financial reporting',
    'Variance analysis',
    'Internal audits',
    'Control reviews',
  ];

  const principles = [
    { principle: 'Authorization limits', implementation: 'Spending thresholds', benefit: 'Control boundaries' },
    { principle: 'Segregation duties', implementation: 'Separate responsibilities', benefit: 'Fraud prevention' },
    { principle: 'Documentation requirements', implementation: 'Record keeping', benefit: 'Audit trail' },
    { principle: 'Review procedures', implementation: 'Regular checks', benefit: 'Error detection' },
  ];

  const metrics = [
    'Control compliance rate',
    'Budget variance percentage',
    'Cash accuracy rate',
    'Asset tracking accuracy',
    'Credit policy compliance',
    'Audit finding reduction',
    'Control effectiveness score',
    'Error detection rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Financial Control Guide</h1>
      <p className="text-zinc-600">Areas, mechanisms, principles, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Purpose: {a.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Mechanisms</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mechanisms.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Control Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Implementation: {p.implementation}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
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
        <h3 className="font-medium mb-2">Financial Control Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish budgetary controls. 2. Implement expense authorization. 3. Monitor cash flows daily. 4. Verify payments thoroughly. 5. Track assets systematically. 6. Enforce credit limits. 7. Report financial status. 8. Analyze variances regularly. 9. Conduct internal audits. 10. Review controls periodically. Financial control = accountability. Budgets established. Expenses authorized. Cash monitored. Payments verified. Assets tracked. Limits enforced. Status reported. Variances analyzed. Audits conducted. Controls reviewed.
        </div>
      </div>
    </main>
  );
}
