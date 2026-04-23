'use client'

export default function BusinessCareerPathingGuide() {
  const paths = [
    { path: 'Vertical progression', movement: 'Upward promotion', benefit: 'Authority growth' },
    { path: 'Horizontal movement', movement: 'Cross-functional', benefit: 'Skill breadth' },
    { path: 'Expert deepening', movement: 'Specialization', benefit: 'Expertise' },
    { path: 'Leadership track', movement: 'Management roles', benefit: 'Leadership' },
    { path: 'Project leadership', movement: 'Project ownership', benefit: 'Responsibility' },
    { path: 'Entrepreneurial path', movement: 'New ventures', benefit: 'Innovation' },
  ];

  const process = [
    'Assess current skills',
    'Identify career interests',
    'Explore career options',
    'Define career goals',
    'Plan career milestones',
    'Identify skill gaps',
    'Create development plan',
    'Execute development actions',
    'Seek career opportunities',
    'Review and adjust path',
  ];

  const factors = [
    { factor: 'Skills and abilities', consideration: 'Current strengths', action: 'Assessment' },
    { factor: 'Organization needs', consideration: 'Future roles', action: 'Alignment' },
    { factor: 'Personal interests', consideration: 'Career preferences', action: 'Exploration' },
    { factor: 'Market opportunities', consideration: 'External options', action: 'Research' },
  ];

  const support = [
    'Career counseling',
    'Mentoring programs',
    'Development plans',
    'Training opportunities',
    'Job rotations',
    'Stretch assignments',
    'Leadership programs',
    'Career conversations',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Career Pathing Guide</h1>
      <p className="text-zinc-600">Paths, process, factors, and support systems.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Paths</h3>
        <div className="space-y-1 text-xs">
          {paths.map((p) => (
            <div key={p.path} className="bg-white rounded p-2">
              <strong>{p.path}</strong>
              <div className="text-zinc-500 mt-1">Movement: {p.movement}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pathing Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong>
              <div className="text-zinc-500 mt-1">Consideration: {f.consideration}</div>
              <div className="text-green-600 mt-1">Action: {f.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Support Systems</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {support.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Pathing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess current skills accurately. 2. Identify career interests clearly. 3. Explore all career options thoroughly. 4. Define achievable career goals. 5. Plan realistic career milestones. 6. Identify skill gaps proactively. 7. Create detailed development plan. 8. Execute development actions consistently. 9. Seek appropriate career opportunities. 10. Review and adjust path regularly. Career pathing = employee growth and retention. Skills assessed. Interests identified. Options explored. Goals defined. Milestones planned. Gaps identified. Plan created. Actions executed. Opportunities sought. Path reviewed.
        </div>
      </div>
    </main>
  );
}