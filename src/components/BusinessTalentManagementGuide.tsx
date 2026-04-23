'use client'

export default function BusinessTalentManagementGuide() {
  const components = [
    { component: 'Talent acquisition', focus: 'Hiring strategy', outcome: 'Quality hires' },
    { component: 'Talent development', focus: 'Learning programs', outcome: 'Skill growth' },
    { component: 'Talent retention', focus: 'Engagement efforts', outcome: 'Employee loyalty' },
    { component: 'Talent succession', focus: 'Future planning', outcome: 'Leadership pipeline' },
  ];

  const process = [
    'Define talent needs',
    'Identify talent gaps',
    'Develop talent strategy',
    'Create talent programs',
    'Implement talent initiatives',
    'Monitor talent metrics',
    'Evaluate talent outcomes',
    'Adjust talent approach',
    'Build talent culture',
    'Sustain talent pipeline',
  ];

  const practices = [
    { practice: 'Competency frameworks', approach: 'Skill definition', benefit: 'Clear standards' },
    { practice: 'Career pathing', approach: 'Growth planning', benefit: 'Employee development' },
    { practice: 'Mentoring programs', approach: 'Knowledge transfer', benefit: 'Learning culture' },
    { practice: 'Performance coaching', approach: 'Regular feedback', benefit: 'Continuous improvement' },
  ];

  const metrics = [
    'Time to hire',
    'Quality of hire',
    'Employee engagement',
    'Retention rate',
    'Internal mobility',
    'Training completion',
    'Leadership pipeline',
    'Performance ratings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Talent Management Guide</h1>
      <p className="text-zinc-600">Components, process, practices, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Talent Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Focus: {c.focus}</div>
              <div className="text-green-600 mt-1">Outcome: {c.outcome}</div>
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
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">Approach: {p.approach}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
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
        <h3 className="font-medium mb-2">Talent Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define talent needs accurately. 2. Identify talent gaps proactively. 3. Develop comprehensive talent strategy. 4. Create effective talent programs. 5. Implement talent initiatives consistently. 6. Monitor talent metrics regularly. 7. Evaluate talent outcomes honestly. 8. Adjust talent approach as needed. 9. Build strong talent culture. 10. Sustain talent pipeline continuously. Talent management = organizational capability. Needs defined. Gaps identified. Strategy developed. Programs created. Initiatives implemented. Metrics monitored. Outcomes evaluated. Approach adjusted. Culture built. Pipeline sustained.
        </div>
      </div>
    </main>
  );
}