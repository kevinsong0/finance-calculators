'use client'

export default function EmployeeCareerDevelopmentGuide() {
  const paths = [
    { path: 'Vertical advancement', direction: 'Upward', focus: 'Leadership roles' },
    { path: 'Specialization', direction: 'Deep skill', focus: 'Expert mastery' },
    { path: 'Cross-functional', direction: 'Broad exposure', focus: 'Varied experience' },
    { path: 'Lateral growth', direction: 'Horizontal', focus: 'New skills' },
    { path: 'Project leadership', direction: 'Opportunity', focus: 'Visibility' },
    { path: 'Management track', direction: 'Leadership', focus: 'Team leadership' },
  ];

  const development = [
    { method: 'Training programs', benefit: 'Skill building', application: 'Learning focus' },
    { method: 'Stretch assignments', benefit: 'Experience', application: 'Challenge growth' },
    { method: 'Mentorship', benefit: 'Guidance', application: 'Wisdom transfer' },
    { method: 'Coaching', benefit: 'Support', application: 'Personalized help' },
    { method: 'Cross-training', benefit: 'Versatility', application: 'Breadth building' },
    { method: 'Education support', benefit: 'Knowledge', application: 'Formal learning' },
  ];

  const planning = [
    'Assess current skills',
    'Identify career goals',
    'Map development needs',
    'Create development plan',
    'Set milestones',
    'Identify opportunities',
    'Track progress',
    'Adjust plan',
  ];

  const support = [
    'Career conversations',
    'Development opportunities',
    'Training access',
    'Mentorship programs',
    'Stretch assignments',
    'Feedback regular',
    'Progress reviews',
    'Goal alignment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Career Development Guide</h1>
      <p className="text-zinc-600">Paths, development methods, planning, and support.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Paths</h3>
        <div className="space-y-1 text-xs">
          {paths.map((p) => (
            <div key={p.path} className="bg-white rounded p-2">
              <strong>{p.path}</strong>
              <div className="text-zinc-500 mt-1">Direction: {p.direction}</div>
              <div className="text-green-600 mt-1">Focus: {p.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Development Methods</h3>
        <div className="space-y-1 text-xs">
          {development.map((d) => (
            <div key={d.method} className="bg-white rounded p-2">
              <strong>{d.method}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {d.benefit}</div>
              <div className="text-green-600 mt-1">Application: {d.application}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {planning.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Support Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {support.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Career Development Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Discuss career goals regularly. 2. Assess current skills objectively. 3. Identify development needs. 4. Create development plan. 5. Set specific milestones. 6. Provide learning opportunities. 7. Assign stretch projects. 8. Offer mentorship connections. 9. Give regular feedback. 10. Review progress periodically. 11. Adjust plans as needed. 12. Celebrate development achievements. Career development = ongoing investment. Goal discussions. Skill assessment. Development plan. Learning opportunities. Stretch assignments. Regular feedback. Progress tracking. Plan adjustment. Celebration moments.
        </div>
      </div>
    </main>
  );
}