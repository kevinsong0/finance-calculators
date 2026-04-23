'use client'

export default function BusinessCostBenefitAnalysisGuide() {
  const methods = [
    { method: 'Net Present Value', description: 'Discounted cash flow analysis', outcome: 'Investment value' },
    { method: 'ROI analysis', description: 'Return on investment ratio', outcome: 'Profitability' },
    { method: 'Break-even analysis', description: 'Cost recovery point', outcome: 'Risk threshold' },
    { method: 'Payback period', description: 'Investment recovery time', outcome: 'Time to profit' },
  ];

  const steps = [
    'Identify decision options',
    'List all costs',
    'List all benefits',
    'Quantify monetary values',
    'Account for time factors',
    'Apply discount rates',
    'Calculate net benefits',
    'Compare alternatives',
    'Assess qualitative factors',
    'Make informed decision',
  ];

  const factors = [
    { factor: 'Direct costs', type: 'Quantifiable', consideration: 'Explicit expenses' },
    { factor: 'Indirect costs', type: 'Estimated', consideration: 'Hidden expenses' },
    { factor: 'Tangible benefits', type: 'Measurable', consideration: 'Concrete gains' },
    { factor: 'Intangible benefits', type: 'Subjective', consideration: 'Qualitative value' },
  ];

  const applications = [
    'Project evaluation',
    'Investment decisions',
    'Policy assessment',
    'Technology adoption',
    'Process changes',
    'Vendor selection',
    'Resource allocation',
    'Risk assessment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Cost-Benefit Analysis Guide</h1>
      <p className="text-zinc-600">Methods, steps, factors, and applications.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Description: {m.description}</div>
              <div className="text-green-600 mt-1">Outcome: {m.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost-Benefit Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Type: {f.type}</div>
              <div className="text-green-600 mt-1">Consideration: {f.consideration}</div>
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
        <h3 className="font-medium mb-2">Cost-Benefit Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify decision options clearly. 2. List all costs comprehensively. 3. List all benefits thoroughly. 4. Quantify monetary values accurately. 5. Account for time factors appropriately. 6. Apply discount rates correctly. 7. Calculate net benefits precisely. 8. Compare alternatives systematically. 9. Assess qualitative factors honestly. 10. Make informed decision confidently. Cost-benefit analysis = rational decisions. Options identified. Costs listed. Benefits listed. Values quantified. Time accounted. Rates applied. Benefits calculated. Alternatives compared. Factors assessed. Decision made.
        </div>
      </div>
    </main>
  );
}