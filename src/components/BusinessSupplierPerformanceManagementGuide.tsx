'use client'

export default function BusinessSupplierPerformanceManagementGuide() {
  const criteria = [
    { criterion: 'Quality', measure: 'Defect rate', weight: 'High' },
    { criterion: 'Delivery', measure: 'On-time rate', weight: 'High' },
    { criterion: 'Cost', measure: 'Price competitiveness', weight: 'Medium' },
    { criterion: 'Service', measure: 'Response quality', weight: 'Medium' },
    { criterion: 'Flexibility', measure: 'Adaptability', weight: 'Low' },
    { criterion: 'Innovation', measure: 'New solutions', weight: 'Low' },
  ];

  const process = [
    'Set performance standards',
    'Define measurement metrics',
    'Collect performance data',
    'Calculate performance scores',
    'Analyze performance trends',
    'Identify performance issues',
    'Develop improvement plans',
    'Communicate performance results',
    'Implement improvement actions',
    'Review performance changes',
  ];

  const methods = [
    { method: 'Scorecards', approach: 'Multi-criteria rating', benefit: 'Comprehensive view' },
    { method: 'KPI tracking', approach: 'Key metrics monitoring', benefit: 'Focus clarity' },
    { method: 'Audits', approach: 'On-site evaluation', benefit: 'Deep insight' },
    { method: 'Surveys', approach: 'Stakeholder feedback', benefit: 'Perspective breadth' },
  ];

  const actions = [
    'Recognition programs',
    'Development support',
    'Warning notices',
    'Remediation plans',
    'Contract adjustments',
    'Vendor replacement',
    'Performance bonuses',
    'Capacity changes',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Supplier Performance Management Guide</h1>
      <p className="text-zinc-600">Criteria, process, methods, and actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Criteria</h3>
        <div className="space-y-1 text-xs">
          {criteria.map((c) => (
            <div key={c.criterion} className="bg-white rounded p-2">
              <strong>{c.criterion}</strong>
              <div className="text-zinc-500 mt-1">Measure: {c.measure}</div>
              <div className="text-green-600 mt-1">Weight: {c.weight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assessment Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Approach: {m.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {m.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {actions.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Supplier Performance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear performance standards. 2. Define precise measurement metrics. 3. Collect accurate performance data. 4. Calculate fair performance scores. 5. Analyze performance trends carefully. 6. Identify performance issues promptly. 7. Develop effective improvement plans. 8. Communicate performance results clearly. 9. Implement improvement actions decisively. 10. Review performance changes regularly. Supplier performance = supply quality. Standards set. Metrics defined. Data collected. Scores calculated. Trends analyzed. Issues identified. Plans developed. Results communicated. Actions implemented. Changes reviewed.
        </div>
      </div>
    </main>
  );
}