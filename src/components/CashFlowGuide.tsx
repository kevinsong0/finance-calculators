'use client'

export default function CashFlowGuide() {
  const flowTypes = [
    { type: 'Operating Cash Flow', desc: 'Day-to-day business activities', importance: 'Primary focus' },
    { type: 'Investing Cash Flow', desc: 'Asset purchases/sales', importance: 'Long-term planning' },
    { type: 'Financing Cash Flow', desc: 'Debt/equity transactions', importance: 'Capital structure' },
    { type: 'Free Cash Flow', desc: 'Cash available after expenses', importance: 'Growth indicator' },
  ];

  const managementTips = [
    'Monitor receivables closely',
    'Negotiate payment terms',
    'Maintain cash reserves',
    'Forecast regularly',
    'Control disbursements',
    'Accelerate collections',
    'Manage inventory levels',
    'Plan for seasonality',
  ];

  const problems = [
    { problem: 'Negative cash flow', solution: 'Cut costs, increase sales' },
    { problem: 'Delayed payments', solution: 'Invoice promptly, follow up' },
    { problem: 'Excessive inventory', solution: 'Reduce stock, improve turnover' },
    { problem: 'Unexpected expenses', solution: 'Emergency fund, insurance' },
    { problem: 'Seasonal fluctuations', solution: 'Reserve cash during highs' },
    { problem: 'Growth strain', solution: 'Plan financing ahead' },
  ];

  const metrics = [
    'Cash conversion cycle',
    'Days sales outstanding',
    'Days payable outstanding',
    'Operating cash flow ratio',
    'Cash runway months',
    'Quick ratio',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cash Flow Management Guide</h1>
      <p className="text-zinc-600">Cash flow types, problems, solutions, and management tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Types</h3>
        <div className="space-y-1 text-xs">
          {flowTypes.map((f) => (
            <div key={f.type} className="bg-white rounded p-2">
              <strong>{f.type}</strong>
              <div className="text-zinc-500 mt-1">{f.desc}</div>
              <div className="text-green-600 mt-1">{f.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {managementTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Problems & Solutions</h3>
        <div className="space-y-1 text-xs">
          {problems.map((p) => (
            <div key={p.problem} className="bg-white rounded p-2">
              <strong className="text-red-600">{p.problem}</strong>
              <div className="text-green-600 mt-1">→ {p.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Create cash flow forecast monthly. 2. Track actual vs forecast. 3. Monitor accounts receivable aging. 4. Follow up on overdue invoices. 5. Negotiate favorable payment terms. 6. Maintain minimum cash buffer. 7. Review expenses regularly. 8. Plan for seasonal variations. 9. Keep emergency fund available. 10. Understand cash conversion cycle. 11. Manage inventory efficiently. 12. Secure financing before needed. Cash flow = cash in minus cash out. Profit ≠ cash (timing matters). Cash flow survival essential. Forecast, monitor, act."
        </div>
      </div>
    </main>
  );
}