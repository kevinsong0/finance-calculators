'use client'

export default function BusinessGrowthStrategyGuide() {
  const strategies = [
    { strategy: 'Market penetration', approach: 'Increase market share', requirement: 'Existing markets' },
    { strategy: 'Market development', approach: 'Enter new markets', requirement: 'New segments' },
    { strategy: 'Product development', approach: 'New products', requirement: 'R&D capability' },
    { strategy: 'Diversification', approach: 'New businesses', requirement: 'Risk tolerance' },
  ];

  const drivers = [
    'Customer demand',
    'Competitive pressure',
    'Technology change',
    'Market opportunity',
    'Resource availability',
    'Strategic vision',
    'Financial capacity',
    'Regulatory changes',
  ];

  const phases = [
    'Strategy assessment',
    'Opportunity identification',
    'Strategy selection',
    'Resource planning',
    'Implementation execution',
    'Performance monitoring',
    'Strategy adjustment',
    'Sustained growth',
  ];

  const metrics = [
    'Revenue growth rate',
    'Market share change',
    'Customer acquisition',
    'Product adoption',
    'Geographic expansion',
    'New segment growth',
    'Profitability improvement',
    'Growth sustainability',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Growth Strategy Guide</h1>
      <p className="text-zinc-600">Strategies, drivers, phases, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Requirement: {s.requirement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Drivers</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {drivers.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Phases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {phases.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Growth Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess growth capacity. 2. Identify growth drivers. 3. Evaluate opportunities. 4. Select growth strategy. 5. Plan resources. 6. Execute implementation. 7. Monitor performance. 8. Adjust strategy. 9. Sustain growth. 10. Scale operations. Growth strategy = business success. Capacity assessed. Drivers identified. Opportunities evaluated. Strategy selected. Resources planned. Implementation executed. Performance monitored. Strategy adjusted. Growth sustained. Operations scaled.
        </div>
      </div>
    </main>
  );
}
