'use client'

export default function BusinessStrategicPlanningGuide() {
  const frameworks = [
    { framework: 'SWOT', focus: 'Internal/external analysis', application: 'Strategy foundation' },
    { framework: 'PESTLE', focus: 'External environment', application: 'Context assessment' },
    { framework: 'Balanced scorecard', focus: 'Performance measures', application: 'Strategy execution' },
    { framework: 'OKR', focus: 'Goals and metrics', application: 'Goal alignment' },
  ];

  const components = [
    'Vision statement',
    'Mission statement',
    'Core values',
    'Strategic objectives',
    'Strategic priorities',
    'Action plans',
    'Resource allocation',
    'Performance measures',
  ];

  const process = [
    'Environmental analysis',
    'Strategic assessment',
    'Strategy formulation',
    'Strategy validation',
    'Implementation planning',
    'Resource allocation',
    'Execution governance',
    'Performance monitoring',
  ];

  const outcomes = [
    'Clear direction',
    'Aligned organization',
    'Focused priorities',
    'Effective execution',
    'Measurable progress',
    'Adaptive capability',
    'Competitive advantage',
    'Sustainable success',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Strategic Planning Guide</h1>
      <p className="text-zinc-600">Frameworks, components, process, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Focus: {f.focus}</div>
              <div className="text-green-600 mt-1">Application: {f.application}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Plan Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Outcomes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outcomes.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Strategic Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define vision and mission. 2. Establish core values. 3. Analyze environment. 4. Assess capabilities. 5. Set strategic objectives. 6. Identify priorities. 7. Develop action plans. 8. Allocate resources. 9. Establish measures. 10. Monitor progress. Strategic planning = organizational direction. Vision defined. Mission established. Values set. Environment analyzed. Capabilities assessed. Objectives set. Priorities identified. Plans developed. Resources allocated. Progress monitored.
        </div>
      </div>
    </main>
  );
}
