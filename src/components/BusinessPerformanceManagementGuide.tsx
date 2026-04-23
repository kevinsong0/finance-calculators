'use client'

export default function BusinessPerformanceManagementGuide() {
  const frameworks = [
    { framework: 'KPI system', purpose: 'Measure key metrics', benefit: 'Performance tracking' },
    { framework: 'Balanced scorecard', purpose: 'Multi-dimensional view', benefit: 'Holistic management' },
    { framework: 'OKR', purpose: 'Goal alignment', benefit: 'Focus and clarity' },
    { framework: 'Performance reviews', purpose: 'Individual assessment', benefit: 'Development' },
  ];

  const dimensions = [
    'Financial performance',
    'Operational performance',
    'Customer performance',
    'Employee performance',
    'Strategic performance',
    'Process performance',
    'Quality performance',
    'Innovation performance',
  ];

  const processes = [
    'Goal setting',
    'Performance planning',
    'Performance monitoring',
    'Performance feedback',
    'Performance review',
    'Performance improvement',
    'Performance recognition',
    'Performance development',
  ];

  const metrics = [
    'Revenue achievement',
    'Profit margin',
    'Customer satisfaction',
    'Employee engagement',
    'Process efficiency',
    'Quality score',
    'Strategic progress',
    'Innovation rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Performance Management Guide</h1>
      <p className="text-zinc-600">Frameworks, dimensions, processes, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {f.purpose}</div>
              <div className="text-green-600 mt-1">Benefit: {f.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Dimensions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {dimensions.map((d, idx) => (
            <div key={d} className="bg-white rounded p-2">{idx + 1}. {d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear goals. 2. Define performance metrics. 3. Establish measurement systems. 4. Monitor performance regularly. 5. Provide feedback timely. 6. Conduct reviews effectively. 7. Implement improvements. 8. Recognize achievements. 9. Develop capabilities. 10. Sustain performance. Performance management = organizational excellence. Goals set. Metrics defined. Systems established. Performance monitored. Feedback provided. Reviews conducted. Improvements implemented. Achievements recognized. Capabilities developed. Performance sustained.
        </div>
      </div>
    </main>
  );
}
