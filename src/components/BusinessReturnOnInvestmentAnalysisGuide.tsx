'use client'

export default function BusinessReturnOnInvestmentAnalysisGuide() {
  const types = [
    { type: 'ROI ratio', formula: 'Gain/Cost', focus: 'Investment efficiency' },
    { type: 'Annualized ROI', formula: 'ROI per year', focus: 'Time comparison' },
    { type: 'Risk-adjusted ROI', formula: 'ROI adjusted for risk', focus: 'Risk consideration' },
    { type: 'Incremental ROI', formula: 'Marginal gain/cost', focus: 'Additional investment' },
  ];

  const steps = [
    'Identify investment costs',
    'Estimate expected returns',
    'Calculate ROI percentage',
    'Consider time factors',
    'Assess risk factors',
    'Compare alternatives',
    'Determine investment viability',
    'Make investment decision',
    'Monitor actual returns',
    'Evaluate ROI achievement',
  ];

  const considerations = [
    { factor: 'Time horizon', impact: 'Return timing', evaluation: 'Present value' },
    { factor: 'Risk level', impact: 'Return certainty', evaluation: 'Risk adjustment' },
    { factor: 'Alternative uses', impact: 'Opportunity cost', evaluation: 'Comparative ROI' },
    { factor: 'Cash flow pattern', impact: 'Return distribution', evaluation: 'Cash timing' },
  ];

  const applications = [
    'Capital investments',
    'Marketing campaigns',
    'Technology projects',
    'Training programs',
    'Process improvements',
    'New product development',
    'Market expansion',
    'Asset acquisition',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Return on Investment Analysis Guide</h1>
      <p className="text-zinc-600">Types, steps, considerations, and applications.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">ROI Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Formula: {t.formula}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
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
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.factor} className="bg-white rounded p-2">
              <strong>{c.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {c.impact}</div>
              <div className="text-green-600 mt-1">Evaluation: {c.evaluation}</div>
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
        <h3 className="font-medium mb-2">ROI Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify investment costs accurately. 2. Estimate expected returns realistically. 3. Calculate ROI percentage precisely. 4. Consider time factors appropriately. 5. Assess risk factors thoroughly. 6. Compare alternatives fairly. 7. Determine investment viability objectively. 8. Make investment decision confidently. 9. Monitor actual returns continuously. 10. Evaluate ROI achievement honestly. ROI analysis = investment wisdom. Costs identified. Returns estimated. ROI calculated. Time considered. Risk assessed. Alternatives compared. Viability determined. Decision made. Returns monitored. Achievement evaluated.
        </div>
      </div>
    </main>
  );
}
