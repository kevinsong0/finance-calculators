'use client'

export default function BusinessProfitMarginAnalysisGuide() {
  const types = [
    { type: 'Gross margin', calculation: 'Revenue - COGS', focus: 'Production efficiency' },
    { type: 'Operating margin', calculation: 'Operating profit', focus: 'Operational efficiency' },
    { type: 'Net margin', calculation: 'Net profit', focus: 'Overall profitability' },
    { type: 'EBITDA margin', calculation: 'EBITDA', focus: 'Cash profitability' },
  ];

  const analyses = [
    'Margin trend analysis',
    'Industry benchmark comparison',
    'Product margin analysis',
    'Customer margin analysis',
    'Channel margin analysis',
    'Geographic margin analysis',
    'Cost structure analysis',
    'Price sensitivity analysis',
    'Volume impact analysis',
    'Mix impact analysis',
  ];

  const factors = [
    { factor: 'Pricing power', influence: 'Price realization', impact: 'Margin expansion' },
    { factor: 'Cost efficiency', influence: 'Expense control', impact: 'Margin improvement' },
    { factor: 'Product mix', influence: 'Revenue composition', impact: 'Margin quality' },
    { factor: 'Volume scale', influence: 'Economies of scale', impact: 'Margin leverage' },
  ];

  const improvements = [
    'Increase prices strategically',
    'Reduce production costs',
    'Optimize product portfolio',
    'Improve sales efficiency',
    'Negotiate supplier terms',
    'Automate processes',
    'Reduce overhead expenses',
    'Focus on high-margin products',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Profit Margin Analysis Guide</h1>
      <p className="text-zinc-600">Types, analyses, factors, and improvements.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Margin Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Calculation: {t.calculation}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {analyses.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Margin Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Influence: {f.influence}</div>
              <div className="text-green-600 mt-1">Impact: {f.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {improvements.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Profit Margin Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate all margin types. 2. Analyze margin trends. 3. Compare to industry benchmarks. 4. Analyze product margins. 5. Analyze customer margins. 6. Identify margin factors. 7. Assess pricing power. 8. Evaluate cost efficiency. 9. Implement margin improvements. 10. Monitor margin changes. Profit margin analysis = business health. Types calculated. Trends analyzed. Benchmarks compared. Products analyzed. Customers analyzed. Factors identified. Power assessed. Efficiency evaluated. Improvements implemented. Changes monitored.
        </div>
      </div>
    </main>
  );
}