'use client'

export default function CompensationGuide() {
  const components = [
    { component: 'Base Salary', desc: 'Fixed compensation', factors: 'Role, market, experience' },
    { component: 'Bonus', desc: 'Performance-based', factors: 'Goals, targets, results' },
    { component: 'Commission', desc: 'Sales-based', factors: 'Sales volume, rate' },
    { component: 'Equity', desc: 'Ownership stake', factors: 'Company stage, role' },
    { component: 'Benefits', desc: 'Non-cash compensation', factors: 'Company policy' },
  ];

  const structures = [
    { structure: 'Traditional', desc: 'Fixed salary only', pros: 'Simple, predictable' },
    { structure: 'Performance-based', desc: 'Salary + bonus', pros: 'Motivates achievement' },
    { structure: 'Commission', desc: 'Sales-driven', pros: 'Direct link to results' },
    { structure: 'Equity-heavy', desc: 'Lower salary + equity', pros: 'Long-term alignment' },
  ];

  const factors = [
    'Market benchmarks',
    'Internal equity',
    'Role complexity',
    'Experience level',
    'Performance history',
    'Company budget',
    'Geographic location',
    'Industry standards',
  ];

  const review = [
    'Annual market analysis',
    'Performance assessment',
    'Budget availability',
    'Internal equity check',
    'Individual adjustments',
    'Communication to employees',
    'Documentation updates',
    'Legal compliance',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Compensation Strategy Guide</h1>
      <p className="text-zinc-600">Components, structures, factors, and review process.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Factors: {c.factors}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Structure Types</h3>
        <div className="space-y-1 text-xs">
          {structures.map((s) => (
            <div key={s.structure} className="bg-white rounded p-2">
              <strong>{s.structure}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Setting Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f) => (
            <div key={f} className="bg-white rounded p-2">{f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {review.map((r, i) => (
            <div key={r} className="bg-white rounded p-2">{i + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compensation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define compensation philosophy. 2. Analyze market benchmarks. 3. Ensure internal equity. 4. Balance fixed vs variable pay. 5. Link to performance appropriately. 6. Consider total compensation value. 7. Communicate clearly to employees. 8. Review annually. 9. Document decisions and rationale. 10. Comply with legal requirements. 11. Budget appropriately. 12. Track compensation metrics. Compensation = total value to employee. Market-competitive. Internally fair. Performance-linked. Clear communication. Regular review."
        </div>
      </div>
    </main>
  );
}