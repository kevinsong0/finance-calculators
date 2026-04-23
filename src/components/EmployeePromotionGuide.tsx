'use client'

export default function EmployeePromotionGuide() {
  const criteria = [
    { criteria: 'Performance', weight: 'Primary', evidence: 'Results achieved' },
    { criteria: 'Skills', weight: 'Important', evidence: 'Competency level' },
    { criteria: 'Experience', weight: 'Considered', evidence: 'Time in role' },
    { criteria: 'Leadership', weight: 'For leadership roles', evidence: 'Leadership demonstrated' },
    { criteria: 'Potential', weight: 'Future-focused', evidence: 'Growth capability' },
    { criteria: 'Fit', weight: 'Essential', evidence: 'Role alignment' },
  ];

  const types = [
    'Vertical promotion',
    'Horizontal move',
    'Lateral transfer',
    'Temporary assignment',
    'Stretch project',
    'Career path progression',
    'Skill-based advancement',
    'Leadership track',
  ];

  const process = [
    'Identify promotion need',
    'Define criteria',
    'Assess candidates',
    'Review performance',
    'Evaluate potential',
    'Select candidate',
    'Prepare transition',
    'Communicate decision',
    'Provide support',
    'Monitor transition',
  ];

  const fairness = [
    'Consistent criteria',
    'Objective assessment',
    'Multiple evaluators',
    'Documentation',
    'Communication',
    'Opportunity awareness',
    'Bias prevention',
    'Appeal process',
    'Diversity consideration',
    'Merit focus',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Promotion Guide</h1>
      <p className="text-zinc-600">Criteria, types, process, and fairness.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Promotion Criteria</h3>
        <div className="space-y-1 text-xs">
          {criteria.map((c) => (
            <div key={c.criteria} className="bg-white rounded p-2">
              <strong>{c.criteria}</strong>
              <div className="text-zinc-500 mt-1">Weight: {c.weight}</div>
              <div className="text-green-600 mt-1">Evidence: {c.evidence}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Promotion Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {types.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Promotion Process</h3>
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
        <h3 className="font-medium mb-2">Promotion Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define promotion criteria clearly. 2. Communicate criteria to employees. 3. Document performance consistently. 4. Assess candidates objectively. 5. Review with multiple evaluators. 6. Consider potential and fit. 7. Ensure diversity opportunity. 8. Document decision rationale. 9. Communicate decision fairly. 10. Provide transition support. 11. Set new expectations. 12. Monitor adjustment period. Promotion = merit-based advancement. Clear criteria. Objective assessment. Fair process. Diversity opportunity. Documentation. Communication. Transition support. Ongoing monitoring.
        </div>
      </div>
    </main>
  );
}