'use client'

export default function BusinessBusinessModelInnovationGuide() {
  const types = [
    { type: 'Product innovation', approach: 'New offerings', outcome: 'Market differentiation' },
    { type: 'Process innovation', approach: 'Operational improvement', outcome: 'Cost efficiency' },
    { type: 'Business model innovation', approach: 'Value creation redesign', outcome: 'Competitive advantage' },
    { type: 'Revenue model innovation', approach: 'Monetization change', outcome: 'Value capture' },
  ];

  const phases = [
    'Identify innovation opportunity',
    'Analyze market dynamics',
    'Evaluate customer needs',
    'Assess competitive landscape',
    'Design innovation concept',
    'Validate business model',
    'Prototype innovation',
    'Test market acceptance',
    'Implement innovation',
    'Scale innovation impact',
  ];

  const strategies = [
    { strategy: 'Disruptive innovation', method: 'Market creation', risk: 'High', reward: 'Transformational' },
    { strategy: 'Incremental innovation', method: 'Continuous improvement', risk: 'Low', reward: 'Steady gains' },
    { strategy: 'Platform innovation', method: 'Ecosystem building', risk: 'Medium', reward: 'Network effects' },
    { strategy: 'Service innovation', method: 'Experience enhancement', risk: 'Low', reward: 'Customer loyalty' },
  ];

  const metrics = [
    'Innovation ROI',
    'Market share change',
    'Revenue growth rate',
    'Customer acquisition cost',
    'Customer retention rate',
    'Time to market',
    'Innovation adoption rate',
    'Competitive position',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Business Model Innovation Guide</h1>
      <p className="text-zinc-600">Types, phases, strategies, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Approach: {t.approach}</div>
              <div className="text-green-600 mt-1">Outcome: {t.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Phases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {phases.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Innovation Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Method: {s.method}</div>
              <div className="text-red-500 mt-1">Risk: {s.risk}</div>
              <div className="text-green-600 mt-1">Reward: {s.reward}</div>
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
        <h3 className="font-medium mb-2">Business Model Innovation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify innovation opportunities systematically. 2. Analyze market dynamics thoroughly. 3. Evaluate customer needs carefully. 4. Assess competitive landscape honestly. 5. Design innovation concepts creatively. 6. Validate business models rigorously. 7. Prototype innovations rapidly. 8. Test market acceptance honestly. 9. Implement innovations effectively. 10. Scale innovation impact strategically. Business model innovation = competitive renewal. Opportunities identified. Dynamics analyzed. Needs evaluated. Landscape assessed. Concepts designed. Models validated. Innovations prototyped. Acceptance tested. Implementation completed. Impact scaled.
        </div>
      </div>
    </main>
  );
}
