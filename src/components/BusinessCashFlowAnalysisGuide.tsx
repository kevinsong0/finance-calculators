'use client'

export default function BusinessCashFlowAnalysisGuide() {
  const types = [
    { type: 'Operating cash flow', source: 'Core business', importance: 'Primary' },
    { type: 'Investing cash flow', source: 'Asset activities', importance: 'Secondary' },
    { type: 'Financing cash flow', source: 'Capital activities', importance: 'Secondary' },
    { type: 'Free cash flow', source: 'Available capital', importance: 'Key metric' },
  ];

  const methods = [
    'Direct method analysis',
    'Indirect method analysis',
    'Cash flow forecasting',
    'Break-even analysis',
    'Working capital analysis',
    'Cash conversion cycle',
    'Liquidity ratio analysis',
    'Cash budgeting',
    'Trend analysis',
    'Comparative analysis',
  ];

  const indicators = [
    { indicator: 'Cash ratio', formula: 'Cash/Current liabilities', interpretation: 'Immediate liquidity' },
    { indicator: 'Quick ratio', formula: '(Cash+Receivables)/Liabilities', interpretation: 'Near-term liquidity' },
    { indicator: 'Operating cash ratio', formula: 'OCF/Current liabilities', interpretation: 'Operational liquidity' },
    { indicator: 'Cash burn rate', formula: 'Cash/Monthly expenses', interpretation: 'Survival months' },
  ];

  const actions = [
    'Accelerate receivables',
    'Delay payables',
    'Reduce inventory',
    'Cut operating costs',
    'Increase sales velocity',
    'Negotiate better terms',
    'Optimize payment timing',
    'Improve collection process',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Cash Flow Analysis Guide</h1>
      <p className="text-zinc-600">Types, methods, indicators, and actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Source: {t.source}</div>
              <div className="text-green-600 mt-1">Importance: {t.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Indicators</h3>
        <div className="space-y-1 text-xs">
          {indicators.map((i) => (
            <div key={i.indicator} className="bg-white rounded p-2">
              <strong>{i.indicator}</strong>
              <div className="text-zinc-500 mt-1">Formula: {i.formula}</div>
              <div className="text-green-600 mt-1">Interpretation: {i.interpretation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {actions.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze operating cash flow primarily. 2. Review investing cash flow secondarily. 3. Examine financing cash flow carefully. 4. Calculate free cash flow regularly. 5. Forecast cash needs accurately. 6. Monitor liquidity ratios daily. 7. Track cash conversion cycle. 8. Accelerate receivables collection. 9. Optimize payment timing. 10. Maintain adequate reserves. Cash flow analysis = financial health. Operating flow analyzed. Investing flow reviewed. Financing flow examined. Free flow calculated. Needs forecasted. Ratios monitored. Cycle tracked. Receivables accelerated. Timing optimized. Reserves maintained.
        </div>
      </div>
    </main>
  );
}