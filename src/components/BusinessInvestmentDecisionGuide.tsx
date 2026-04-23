'use client'

export default function BusinessInvestmentDecisionGuide() {
  const criteria = [
    { criterion: 'Financial return', measure: 'NPV, IRR, ROI', importance: 'Primary' },
    { criterion: 'Strategic fit', measure: 'Alignment with goals', importance: 'High' },
    { criterion: 'Risk level', measure: 'Uncertainty assessment', importance: 'High' },
    { criterion: 'Resource availability', measure: 'Capital, talent, time', importance: 'Medium' },
  ];

  const frameworks = [
    'NPV decision rule',
    'IRR threshold rule',
    'Payback period rule',
    'Profitability index rule',
    'Strategic alignment matrix',
    'Risk-adjusted return',
    'Multi-criteria scoring',
    'Decision tree analysis',
    'Real options analysis',
    'Scenario-based decision',
  ];

  const considerations = [
    { consideration: 'Time horizon', impact: 'Long vs short term', evaluation: 'Fit with strategy' },
    { consideration: 'Cash requirements', impact: 'Capital intensity', evaluation: 'Affordability' },
    { consideration: 'Risk tolerance', impact: 'Uncertainty acceptance', evaluation: 'Risk capacity' },
    { consideration: 'Opportunity cost', impact: 'Alternative foregone', evaluation: 'Relative value' },
  ];

  const outcomes = [
    'Accept investment',
    'Reject investment',
    'Delay investment',
    'Modify investment',
    'Seek alternatives',
    'Reduce scale',
    'Stage investment',
    'Exit investment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Investment Decision Guide</h1>
      <p className="text-zinc-600">Criteria, frameworks, considerations, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Criteria</h3>
        <div className="space-y-1 text-xs">
          {criteria.map((c) => (
            <div key={c.criterion} className="bg-white rounded p-2">
              <strong>{c.criterion}</strong>
              <div className="text-zinc-500 mt-1">Measure: {c.measure}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Frameworks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {frameworks.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Impact: {c.impact}</div>
              <div className="text-green-600 mt-1">Evaluation: {c.evaluation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Outcomes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outcomes.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Investment Decision Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Evaluate financial return thoroughly. 2. Assess strategic fit carefully. 3. Analyze risk level comprehensively. 4. Check resource availability. 5. Apply decision framework. 6. Consider time horizon. 7. Evaluate cash requirements. 8. Assess risk tolerance. 9. Calculate opportunity cost. 10. Make informed decision. Investment decision = capital allocation. Return evaluated. Fit assessed. Risk analyzed. Resources checked. Framework applied. Horizon considered. Requirements evaluated. Tolerance assessed. Cost calculated. Decision made.
        </div>
      </div>
    </main>
  );
}