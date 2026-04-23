'use client'

export default function BusinessProjectManagementGuide() {
  const methodologies = [
    { methodology: 'Waterfall', approach: 'Sequential phases', bestFor: 'Defined scope projects' },
    { methodology: 'Agile', approach: 'Iterative delivery', bestFor: 'Adaptive projects' },
    { methodology: 'Hybrid', approach: 'Mixed approach', bestFor: 'Balanced needs' },
    { methodology: 'PMI/PMBOK', approach: 'Standard framework', bestFor: 'Structured projects' },
  ];

  const phases = [
    'Initiation',
    'Planning',
    'Execution',
    'Monitoring',
    'Controlling',
    'Closing',
    'Post-project review',
    'Lessons learned',
  ];

  const elements = [
    'Scope management',
    'Time management',
    'Cost management',
    'Quality management',
    'Resource management',
    'Risk management',
    'Communication management',
    'Stakeholder management',
  ];

  const metrics = [
    'Project completion rate',
    'On-time delivery',
    'Budget adherence',
    'Scope delivery',
    'Quality score',
    'Stakeholder satisfaction',
    'Risk mitigation success',
    'Team performance',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Project Management Guide</h1>
      <p className="text-zinc-600">Methodologies, phases, elements, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Methodologies</h3>
        <div className="space-y-1 text-xs">
          {methodologies.map((m) => (
            <div key={m.methodology} className="bg-white rounded p-2">
              <strong>{m.methodology}</strong>
              <div className="text-zinc-500 mt-1">Approach: {m.approach}</div>
              <div className="text-green-600 mt-1">Best for: {m.bestFor}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Phases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {phases.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {elements.map((e, idx) => (
            <div key={e} className="bg-white rounded p-2">{idx + 1}. {e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Select project methodology. 2. Define project phases. 3. Plan management elements. 4. Set project metrics. 5. Create project charter. 6. Develop project plan. 7. Execute project activities. 8. Monitor project progress. 9. Control project changes. 10. Close project properly. Project management = successful delivery. Methodology selected. Phases defined. Elements planned. Metrics set. Charter created. Plan developed. Activities executed. Progress monitored. Changes controlled. Project closed.
        </div>
      </div>
    </main>
  );
}
