'use client'

export default function EmployeeCompensationPlanningGuide() {
  const components = [
    { component: 'Base salary', importance: 'Foundation', determination: 'Market, role' },
    { component: 'Bonuses', importance: 'Variable', determination: 'Performance' },
    { component: 'Commissions', importance: 'Sales roles', determination: 'Sales results' },
    { component: 'Stock options', importance: 'Long-term', determination: 'Company value' },
    { component: 'Benefits', importance: 'Package', determination: 'Policy' },
    { component: 'Perks', importance: 'Supplemental', determination: 'Company choice' },
  ];

  const factors = [
    { factor: 'Market rates', impact: 'External benchmark', application: 'Salary surveys' },
    { factor: 'Role level', impact: 'Position value', application: 'Job evaluation' },
    { factor: 'Experience', impact: 'Capability', application: 'Skill assessment' },
    { factor: 'Performance', impact: 'Results', application: 'Merit determination' },
    { factor: 'Budget', impact: 'Constraint', application: 'Affordability' },
    { factor: 'Equity', impact: 'Fairness', application: 'Internal consistency' },
  ];

  const process = [
    'Define compensation philosophy',
    'Benchmark market rates',
    'Evaluate job levels',
    'Design pay structure',
    'Set pay ranges',
    'Determine variable pay',
    'Plan benefits package',
    'Budget allocation',
    'Review regularly',
    'Adjust as needed',
  ];

  const fairness = [
    'Consistent criteria',
    'Market alignment',
    'Internal equity',
    'Transparent process',
    'Bias avoidance',
    'Regular review',
    'Documentation',
    'Appeal process',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Compensation Planning Guide</h1>
      <p className="text-zinc-600">Components, factors, process, and fairness.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Importance: {c.importance}</div>
              <div className="text-green-600 mt-1">Determination: {c.determination}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pay Determination Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {f.impact}</div>
              <div className="text-green-600 mt-1">Application: {f.application}</div>
            </div>
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
        <h3 className="font-medium mb-2">Fairness Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {fairness.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define compensation philosophy. 2. Benchmark market rates regularly. 3. Evaluate job levels properly. 4. Design clear pay structure. 5. Set appropriate pay ranges. 6. Include variable pay options. 7. Plan comprehensive benefits. 8. Allocate budget realistically. 9. Review compensation annually. 10. Adjust for market changes. 11. Ensure internal equity. 12. Document decisions clearly. Compensation = strategic planning. Philosophy defined. Market benchmarked. Structure clear. Ranges set. Benefits included. Budget allocated. Regular review. Fairness ensured.
        </div>
      </div>
    </main>
  );
}