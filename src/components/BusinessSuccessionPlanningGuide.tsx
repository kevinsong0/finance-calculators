'use client'

export default function BusinessSuccessionPlanningGuide() {
  const levels = [
    { level: 'CEO succession', focus: 'Executive leadership', approach: 'Board involvement' },
    { level: 'Executive succession', focus: 'Senior management', approach: 'Committee review' },
    { level: 'Management succession', focus: 'Middle management', approach: 'HR coordination' },
    { level: 'Technical succession', focus: 'Specialized roles', approach: 'Skill replacement' },
  ];

  const process = [
    'Identify critical positions',
    'Define position requirements',
    'Assess current talent pool',
    'Identify potential successors',
    'Evaluate successor readiness',
    'Develop succession candidates',
    'Create development plans',
    'Monitor successor progress',
    'Update succession plans',
    'Execute succession events',
  ];

  const criteria = [
    { criterion: 'Performance track', assessment: 'Results history', importance: 'High' },
    { criterion: 'Leadership potential', assessment: 'Capability evaluation', importance: 'Critical' },
    { criterion: 'Cultural fit', assessment: 'Values alignment', importance: 'High' },
    { criterion: 'Development readiness', assessment: 'Skill gaps', importance: 'Medium' },
  ];

  const risks = [
    'Key person dependency',
    'Unplanned departures',
    'Talent pipeline gaps',
    'Inadequate preparation',
    'Poor transition execution',
    'Cultural disruption',
    'Knowledge loss',
    'Stakeholder concerns',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Succession Planning Guide</h1>
      <p className="text-zinc-600">Levels, process, criteria, and risk mitigation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Succession Levels</h3>
        <div className="space-y-1 text-xs">
          {levels.map((l) => (
            <div key={l.level} className="bg-white rounded p-2">
              <strong>{l.level}</strong>
              <div className="text-zinc-500 mt-1">Focus: {l.focus}</div>
              <div className="text-green-600 mt-1">Approach: {l.approach}</div>
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
        <h3 className="font-medium mb-2">Selection Criteria</h3>
        <div className="space-y-1 text-xs">
          {criteria.map((c) => (
            <div key={c.criterion} className="bg-white rounded p-2">
              <strong>{c.criterion}</strong>
              <div className="text-zinc-500 mt-1">Assessment: {c.assessment}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Succession Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify critical positions accurately. 2. Define position requirements clearly. 3. Assess current talent pool thoroughly. 4. Identify potential successors proactively. 5. Evaluate successor readiness honestly. 6. Develop succession candidates effectively. 7. Create detailed development plans. 8. Monitor successor progress regularly. 9. Update succession plans annually. 10. Execute succession events smoothly. Succession planning = leadership continuity. Positions identified. Requirements defined. Pool assessed. Successors identified. Readiness evaluated. Candidates developed. Plans created. Progress monitored. Plans updated. Events executed.
        </div>
      </div>
    </main>
  );
}