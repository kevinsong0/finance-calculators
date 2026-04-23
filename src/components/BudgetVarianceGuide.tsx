'use client'

export default function BudgetVarianceGuide() {
  const varianceTypes = [
    { type: 'Revenue Variance', desc: 'Actual vs planned income', causes: 'Market changes, pricing' },
    { type: 'Expense Variance', desc: 'Actual vs planned costs', causes: 'Unexpected costs, inefficiency' },
    { type: 'Volume Variance', desc: 'Quantity differences', causes: 'Demand changes, capacity' },
    { type: 'Price Variance', desc: 'Cost per unit changes', causes: 'Supplier changes, inflation' },
    { type: 'Efficiency Variance', desc: 'Resource utilization', causes: 'Process issues, waste' },
    { type: 'Mix Variance', desc: 'Product/service ratio', causes: 'Customer preference shifts' },
  ];

  const analysisSteps = [
    'Identify variance',
    'Calculate amount',
    'Determine cause',
    'Assess significance',
    'Investigate root cause',
    'Document findings',
    'Propose corrective action',
    'Monitor improvement',
  ];

  const thresholds = [
    '5% variance: Monitor',
    '10% variance: Investigate',
    '15% variance: Urgent action',
    '20% variance: Escalate',
    'Positive variance: Review',
    'Negative variance: Address',
  ];

  const actions = [
    'Adjust future budgets',
    'Implement cost controls',
    'Revise revenue forecasts',
    'Process improvement',
    'Pricing adjustments',
    'Resource reallocation',
    'Stakeholder communication',
    'Regular review schedule',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Budget Variance Analysis Guide</h1>
      <p className="text-zinc-600">Variance types, analysis steps, thresholds, and corrective actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Variance Types</h3>
        <div className="space-y-1 text-xs">
          {varianceTypes.map((v) => (
            <div key={v.type} className="bg-white rounded p-2">
              <strong>{v.type}</strong>
              <div className="text-zinc-500 mt-1">{v.desc}</div>
              <div className="text-red-600 mt-1">Causes: {v.causes}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {analysisSteps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Variance Thresholds</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {thresholds.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Corrective Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {actions.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Variance Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Compare actual to budget monthly. 2. Calculate variance percentage. 3. Identify favorable vs unfavorable. 4. Determine if variance is significant (threshold). 5. Investigate root cause. 6. Document findings. 7. Implement corrective action. 8. Update forecasts. 9. Communicate to stakeholders. 10. Monitor improvement. 11. Adjust future budgets. 12. Regular review cadence. Budget variance = actual - budget. Positive = favorable (good), negative = unfavorable (bad). Act on significant variances. Continuous monitoring essential."
        </div>
      </div>
    </main>
  );
}