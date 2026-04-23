'use client'

export default function BusinessCapitalBudgetingGuide() {
  const methods = [
    { method: 'NPV analysis', description: 'Net present value calculation', benefit: 'Value measurement' },
    { method: 'IRR analysis', description: 'Internal rate of return', benefit: 'Return rate' },
    { method: 'Payback analysis', description: 'Investment recovery time', benefit: 'Time horizon' },
    { method: 'Profitability index', description: 'Benefit-cost ratio', benefit: 'Relative value' },
  ];

  const steps = [
    'Identify investment opportunities',
    'Estimate cash flows',
    'Determine discount rate',
    'Calculate NPV',
    'Calculate IRR',
    'Assess payback period',
    'Evaluate risk factors',
    'Compare alternatives',
    'Rank investment options',
    'Make investment decision',
  ];

  const factors = [
    { factor: 'Initial investment', type: 'Outflow', timing: 'Immediate' },
    { factor: 'Operating cash flows', type: 'Inflow', timing: 'Periodic' },
    { factor: 'Terminal value', type: 'Inflow', timing: 'End period' },
    { factor: 'Discount rate', type: 'Rate', timing: 'Applied throughout' },
  ];

  const risks = [
    'Cash flow uncertainty',
    'Discount rate estimation',
    'Project duration risk',
    'Technology obsolescence',
    'Market condition changes',
    'Regulatory changes',
    'Competition impact',
    'Execution capability',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Capital Budgeting Guide</h1>
      <p className="text-zinc-600">Methods, steps, factors, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budgeting Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budgeting Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cash Flow Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Type: {f.type}</div>
              <div className="text-green-600 mt-1">Timing: {f.timing}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Capital Budgeting Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify investment opportunities systematically. 2. Estimate cash flows accurately. 3. Determine discount rate appropriately. 4. Calculate NPV correctly. 5. Calculate IRR precisely. 6. Assess payback period realistically. 7. Evaluate risk factors thoroughly. 8. Compare alternatives fairly. 9. Rank investment options logically. 10. Make investment decision confidently. Capital budgeting = wise investments. Opportunities identified. Flows estimated. Rate determined. NPV calculated. IRR calculated. Period assessed. Risks evaluated. Alternatives compared. Options ranked. Decision made.
        </div>
      </div>
    </main>
  );
}