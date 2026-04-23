'use client'

export default function BusinessShareholderValueGuide() {
  const sources = [
    { source: 'Revenue growth', driver: 'Top-line expansion', mechanism: 'Profit increase' },
    { source: 'Margin improvement', driver: 'Efficiency gains', mechanism: 'Cost reduction' },
    { source: 'Asset optimization', driver: 'Capital efficiency', mechanism: 'Return increase' },
    { source: 'Risk reduction', driver: 'Uncertainty decrease', mechanism: 'Value stability' },
  ];

  const metrics = [
    'Shareholder return',
    'Total shareholder return',
    'Dividend yield',
    'Capital appreciation',
    'Market value added',
    'Economic value added',
    'Return on equity',
    'Price-to-book ratio',
  ];

  const strategies = [
    { strategy: 'Profit maximization', approach: 'Revenue and cost focus', impact: 'Direct value' },
    { strategy: 'Capital efficiency', approach: 'Asset utilization', impact: 'Return increase' },
    { strategy: 'Risk management', approach: 'Uncertainty control', impact: 'Value stability' },
    { strategy: 'Strategic investments', approach: 'Growth opportunities', impact: 'Future value' },
  ];

  const activities = [
    'Set shareholder objectives',
    'Analyze value drivers',
    'Develop value strategies',
    'Implement value initiatives',
    'Monitor value metrics',
    'Report value creation',
    'Evaluate value performance',
    'Adjust value approach',
    'Communicate to shareholders',
    'Align management incentives',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Shareholder Value Guide</h1>
      <p className="text-zinc-600">Sources, metrics, strategies, and activities.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Value Sources</h3>
        <div className="space-y-1 text-xs">
          {sources.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong>{s.source}</strong>
              <div className="text-zinc-500 mt-1">Driver: {s.driver}</div>
              <div className="text-green-600 mt-1">Mechanism: {s.mechanism}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Value Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Value Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Impact: {s.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Value Activities</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {activities.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Shareholder Value Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set shareholder objectives clearly. 2. Analyze value drivers thoroughly. 3. Develop value strategies strategically. 4. Implement value initiatives effectively. 5. Monitor value metrics continuously. 6. Report value creation transparently. 7. Evaluate value performance honestly. 8. Adjust value approach flexibly. 9. Communicate to shareholders regularly. 10. Align management incentives appropriately. Shareholder value = business purpose. Objectives set. Drivers analyzed. Strategies developed. Initiatives implemented. Metrics monitored. Creation reported. Performance evaluated. Approach adjusted. Communication done. Incentives aligned.
        </div>
      </div>
    </main>
  );
}
