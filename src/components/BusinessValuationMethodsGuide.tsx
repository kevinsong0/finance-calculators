'use client'

export default function BusinessValuationMethodsGuide() {
  const methods = [
    { method: 'Discounted Cash Flow', approach: 'Future cash flow discount', bestFor: 'Going concern' },
    { method: 'Comparable Company', approach: 'Market multiples', bestFor: 'Public comparison' },
    { method: 'Asset-based', approach: 'Net asset value', bestFor: 'Asset-heavy' },
    { method: 'Transaction-based', approach: 'Deal multiples', bestFor: 'M&A context' },
  ];

  const inputs = [
    'Historical financials',
    'Projected cash flows',
    'Discount rate',
    'Market multiples',
    'Comparable data',
    'Asset values',
    'Liability amounts',
    'Growth assumptions',
    'Risk adjustments',
    'Terminal value',
  ];

  const adjustments = [
    { adjustment: 'Control premium', purpose: 'Ownership benefit', range: '20-40%' },
    { adjustment: 'Liquidity discount', purpose: 'Market access', range: '10-30%' },
    { adjustment: 'Synergy value', purpose: 'Combination benefit', range: 'Variable' },
    { adjustment: 'Risk adjustment', purpose: 'Uncertainty factor', range: 'Variable' },
  ];

  const applications = [
    'M&A transactions',
    'Investment analysis',
    'Financial reporting',
    'Tax planning',
    'Estate planning',
    'Partner disputes',
    'IPO preparation',
    'Strategic planning',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Valuation Methods Guide</h1>
      <p className="text-zinc-600">Methods, inputs, adjustments, and applications.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Valuation Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Approach: {m.approach}</div>
              <div className="text-green-600 mt-1">Best For: {m.bestFor}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Valuation Inputs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {inputs.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Valuation Adjustments</h3>
        <div className="space-y-1 text-xs">
          {adjustments.map((a) => (
            <div key={a.adjustment} className="bg-white rounded p-2">
              <strong>{a.adjustment}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {a.purpose}</div>
              <div className="text-green-600 mt-1">Range: {a.range}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Applications</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {applications.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Business Valuation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Gather historical financials. 2. Project future cash flows. 3. Determine discount rate. 4. Select valuation method. 5. Calculate base value. 6. Apply appropriate adjustments. 7. Compare to market data. 8. Document assumptions. 9. Prepare valuation report. 10. Review with stakeholders. Business valuation = informed decisions. Financials gathered. Flows projected. Rate determined. Method selected. Value calculated. Adjustments applied. Market compared. Assumptions documented. Report prepared. Review completed.
        </div>
      </div>
    </main>
  );
}
