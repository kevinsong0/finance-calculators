'use client'

export default function BusinessWorkforcePlanningGuide() {
  const components = [
    { component: 'Demand forecasting', focus: 'Future needs', method: 'Workload analysis' },
    { component: 'Supply analysis', focus: 'Current workforce', method: 'Skills inventory' },
    { component: 'Gap analysis', focus: 'Differences', method: 'Comparison modeling' },
    { component: 'Solution development', focus: 'Actions', method: 'Strategy planning' },
  ];

  const steps = [
    'Analyze business strategy',
    'Forecast workforce demand',
    'Assess current workforce',
    'Identify workforce gaps',
    'Develop workforce plans',
    'Create staffing strategies',
    'Plan talent development',
    'Implement workforce actions',
    'Monitor workforce metrics',
    'Adjust workforce plans',
  ];

  const factors = [
    { factor: 'Business growth', impact: 'Headcount needs', consideration: 'Expansion pace' },
    { factor: 'Technology changes', impact: 'Skill evolution', consideration: 'Automation' },
    { factor: 'Turnover rates', impact: 'Replacement needs', consideration: 'Retention' },
    { factor: 'Regulatory changes', impact: 'Compliance needs', consideration: 'Legal' },
  ];

  const metrics = [
    'Headcount ratios',
    'Skill coverage',
    'Succession readiness',
    'Turnover rates',
    'Hiring effectiveness',
    'Development progress',
    'Workforce costs',
    'Productivity metrics',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Workforce Planning Guide</h1>
      <p className="text-zinc-600">Components, steps, factors, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Focus: {c.focus}</div>
              <div className="text-green-600 mt-1">Method: {c.method}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {f.impact}</div>
              <div className="text-green-600 mt-1">Consideration: {f.consideration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workforce Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze business strategy thoroughly. 2. Forecast workforce demand accurately. 3. Assess current workforce honestly. 4. Identify workforce gaps proactively. 5. Develop comprehensive workforce plans. 6. Create effective staffing strategies. 7. Plan talent development systematically. 8. Implement workforce actions decisively. 9. Monitor workforce metrics regularly. 10. Adjust workforce plans as needed. Workforce planning = strategic capability. Strategy analyzed. Demand forecasted. Workforce assessed. Gaps identified. Plans developed. Strategies created. Development planned. Actions implemented. Metrics monitored. Plans adjusted.
        </div>
      </div>
    </main>
  );
}