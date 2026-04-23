'use client'

export default function BusinessWorkingCapitalManagementGuide() {
  const components = [
    { component: 'Current assets', items: 'Cash, receivables, inventory', purpose: 'Operating resources' },
    { component: 'Current liabilities', items: 'Payables, short-term debt', purpose: 'Operating obligations' },
    { component: 'Working capital', items: 'Assets minus liabilities', purpose: 'Operating buffer' },
    { component: 'Net working capital', items: 'Adjusted working capital', purpose: 'True liquidity' },
  ];

  const strategies = [
    'Optimize cash balance',
    'Accelerate collections',
    'Manage inventory levels',
    'Negotiate payment terms',
    'Use credit facilities',
    'Forecast cash needs',
    'Monitor liquidity ratios',
    'Control credit extension',
    'Streamline payables',
    'Balance working capital',
  ];

  const ratios = [
    { ratio: 'Current ratio', formula: 'Current assets/Current liabilities', target: 'Above 1.5' },
    { ratio: 'Quick ratio', formula: '(Cash+Receivables)/Liabilities', target: 'Above 1.0' },
    { ratio: 'Cash conversion cycle', formula: 'DSO+DIO-DPO', target: 'Minimize days' },
    { ratio: 'Working capital turnover', formula: 'Revenue/Working capital', target: 'Maximize ratio' },
  ];

  const risks = [
    'Liquidity crisis',
    'Cash flow mismatch',
    'Collection delays',
    'Inventory buildup',
    'Credit extension risks',
    'Supplier payment issues',
    'Seasonal fluctuations',
    'Growth capital needs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Working Capital Management Guide</h1>
      <p className="text-zinc-600">Components, strategies, ratios, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Working Capital Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Items: {c.items}</div>
              <div className="text-green-600 mt-1">Purpose: {c.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Ratios</h3>
        <div className="space-y-1 text-xs">
          {ratios.map((r) => (
            <div key={r.ratio} className="bg-white rounded p-2">
              <strong>{r.ratio}</strong>
              <div className="text-zinc-500 mt-1">Formula: {r.formula}</div>
              <div className="text-green-600 mt-1">Target: {r.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Working Capital Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Optimize cash balance carefully. 2. Accelerate collections aggressively. 3. Manage inventory levels efficiently. 4. Negotiate payment terms strategically. 5. Use credit facilities wisely. 6. Forecast cash needs accurately. 7. Monitor liquidity ratios regularly. 8. Control credit extension prudently. 9. Streamline payables efficiently. 10. Balance working capital continuously. Working capital management = operational liquidity. Cash optimized. Collections accelerated. Inventory managed. Terms negotiated. Facilities used. Needs forecasted. Ratios monitored. Credit controlled. Payables streamlined. Capital balanced.
        </div>
      </div>
    </main>
  );
}