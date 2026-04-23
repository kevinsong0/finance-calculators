'use client'

export default function BusinessProfitabilityImprovementGuide() {
  const levers = [
    { lever: 'Revenue growth', mechanism: 'Increase sales volume', impact: 'Top-line expansion' },
    { lever: 'Cost reduction', mechanism: 'Decrease expenses', impact: 'Bottom-line improvement' },
    { lever: 'Margin optimization', mechanism: 'Improve pricing', impact: 'Per-unit profit' },
    { lever: 'Mix optimization', mechanism: 'Shift product focus', impact: 'Profit quality' },
  ];

  const steps = [
    'Analyze current profitability',
    'Identify improvement opportunities',
    'Prioritize improvement actions',
    'Set profitability targets',
    'Implement revenue improvements',
    'Implement cost reductions',
    'Optimize pricing strategies',
    'Adjust product mix',
    'Monitor profitability metrics',
    'Sustain improvement gains',
  ];

  const techniques = [
    { technique: 'Break-even analysis', application: 'Minimum sales target', benefit: 'Risk awareness' },
    { technique: 'Margin analysis', application: 'Profit per unit', benefit: 'Pricing guidance' },
    { technique: 'Cost allocation', application: 'Expense attribution', benefit: 'Cost control' },
    { technique: 'Value chain analysis', application: 'Activity efficiency', benefit: 'Process insight' },
  ];

  const metrics = [
    'Gross profit margin',
    'Operating profit margin',
    'Net profit margin',
    'Return on investment',
    'Profit per employee',
    'Profit per customer',
    'Profit growth rate',
    'Profit stability index',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Profitability Improvement Guide</h1>
      <p className="text-zinc-600">Levers, steps, techniques, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Levers</h3>
        <div className="space-y-1 text-xs">
          {levers.map((l) => (
            <div key={l.lever} className="bg-white rounded p-2">
              <strong>{l.lever}</strong>
              <div className="text-zinc-500 mt-1">Mechanism: {l.mechanism}</div>
              <div className="text-green-600 mt-1">Impact: {l.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-500 mt-1">Application: {t.application}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
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
        <h3 className="font-medium mb-2">Profitability Improvement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze current profitability thoroughly. 2. Identify improvement opportunities systematically. 3. Prioritize improvement actions strategically. 4. Set profitability targets realistically. 5. Implement revenue improvements effectively. 6. Implement cost reductions efficiently. 7. Optimize pricing strategies carefully. 8. Adjust product mix strategically. 9. Monitor profitability metrics continuously. 10. Sustain improvement gains permanently. Profitability improvement = business success. Profitability analyzed. Opportunities identified. Actions prioritized. Targets set. Revenue improved. Costs reduced. Pricing optimized. Mix adjusted. Metrics monitored. Gains sustained.
        </div>
      </div>
    </main>
  );
}