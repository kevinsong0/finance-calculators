'use client'

export default function BusinessProfitAnalysisGuide() {
  const metrics = [
    { metric: 'Gross profit margin', formula: 'Revenue - COGS / Revenue', insight: 'Production efficiency' },
    { metric: 'Operating profit margin', formula: 'Operating income / Revenue', insight: 'Operational efficiency' },
    { metric: 'Net profit margin', formula: 'Net income / Revenue', insight: 'Overall profitability' },
    { metric: 'EBITDA margin', formula: 'EBITDA / Revenue', insight: 'Cash profitability' },
    { metric: 'Return on assets', formula: 'Net income / Assets', insight: 'Asset utilization' },
    { metric: 'Return on equity', formula: 'Net income / Equity', insight: 'Investor return' },
  ];

  const drivers = [
    { driver: 'Revenue growth', impact: 'Profit increase', action: 'Sales expansion' },
    { driver: 'Cost reduction', impact: 'Margin improvement', action: 'Efficiency focus' },
    { driver: 'Price optimization', impact: 'Revenue per unit', action: 'Value pricing' },
    { driver: 'Volume increase', impact: 'Scale benefits', action: 'Market growth' },
    { driver: 'Product mix', impact: 'Profitability mix', action: 'High-margin focus' },
    { driver: 'Operating efficiency', impact: 'Cost per unit', action: 'Process improvement' },
  ];

  const analysis = [
    'Compare to benchmarks',
    'Track trends over time',
    'Analyze variance causes',
    'Segment by product',
    'Evaluate by channel',
    'Assess by customer',
    'Review by region',
    'Identify improvement opportunities',
  ];

  const improvements = [
    { area: 'Revenue', strategy: 'Market expansion', tactic: 'New markets, products' },
    { area: 'Pricing', strategy: 'Value-based pricing', tactic: 'Price optimization' },
    { area: 'Costs', strategy: 'Process efficiency', tactic: 'Automation, lean' },
    { area: 'Operations', strategy: 'Productivity gains', tactic: 'Training, tools' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Profit Analysis Guide</h1>
      <p className="text-zinc-600">Metrics, drivers, analysis, and improvements.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Profit Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Formula: {m.formula}</div>
              <div className="text-green-600 mt-1">Insight: {m.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Profit Drivers</h3>
        <div className="space-y-1 text-xs">
          {drivers.map((d) => (
            <div key={d.driver} className="bg-white rounded p-2">
              <strong>{d.driver}</strong>
              <div className="text-zinc-500 mt-1">Impact: {d.impact}</div>
              <div className="text-green-600 mt-1">Action: {d.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {analysis.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Strategies</h3>
        <div className="space-y-1 text-xs">
          {improvements.map((i) => (
            <div key={i.area} className="bg-white rounded p-2">
              <strong>{i.area}</strong>
              <div className="text-zinc-500 mt-1">Strategy: {i.strategy}</div>
              <div className="text-green-600 mt-1">Tactic: {i.tactic}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Profit Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Calculate all profit metrics. 2. Compare to industry benchmarks. 3. Track trends over time. 4. Analyze variance causes. 5. Segment by product line. 6. Evaluate by channel type. 7. Assess by customer segment. 8. Review by geographic region. 9. Identify improvement opportunities. 10. Implement improvement strategies. Profit analysis = financial insight. Metrics calculated. Benchmarks compared. Trends tracked. Causes analyzed. Products segmented. Channels evaluated. Customers assessed. Regions reviewed. Opportunities identified. Strategies implemented.
        </div>
      </div>
    </main>
  );
}