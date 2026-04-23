'use client'

export default function BusinessChangeManagementGuide() {
  const phases = [
    { phase: 'Preparation', activities: 'Assessment, planning', outcome: 'Readiness' },
    { phase: 'Implementation', activities: 'Execution, support', outcome: 'Adoption' },
    { phase: 'Sustainment', activities: 'Monitoring, reinforcement', outcome: 'Stabilization' },
  ];

  const steps = [
    'Identify change need',
    'Assess organizational readiness',
    'Define change objectives',
    'Develop change strategy',
    'Plan change activities',
    'Communicate change vision',
    'Engage stakeholders',
    'Implement change actions',
    'Monitor change progress',
    'Reinforce change outcomes',
  ];

  const resistance = [
    { source: 'Fear of uncertainty', cause: 'Unknown outcomes', solution: 'Clear communication' },
    { source: 'Loss of control', cause: 'Disrupted routines', solution: 'Participation opportunities' },
    { source: 'Skill concerns', cause: 'Capability gaps', solution: 'Training support' },
    { source: 'Cultural clash', cause: 'Value conflicts', solution: 'Cultural alignment' },
  ];

  const roles = [
    'Change sponsor',
    'Change manager',
    'Change agents',
    'Stakeholders',
    'Change recipients',
    'Communication lead',
    'Training lead',
    'Resistance manager',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Change Management Guide</h1>
      <p className="text-zinc-600">Phases, steps, resistance handling, and roles.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">Activities: {p.activities}</div>
              <div className="text-green-600 mt-1">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resistance Handling</h3>
        <div className="space-y-1 text-xs">
          {resistance.map((r) => (
            <div key={r.source} className="bg-white rounded p-2">
              <strong>{r.source}</strong>
              <div className="text-zinc-500 mt-1">Cause: {r.cause}</div>
              <div className="text-green-600 mt-1">Solution: {r.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Roles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {roles.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify change need clearly. 2. Assess organizational readiness thoroughly. 3. Define change objectives precisely. 4. Develop comprehensive change strategy. 5. Plan change activities carefully. 6. Communicate change vision effectively. 7. Engage stakeholders actively. 8. Implement change actions decisively. 9. Monitor change progress regularly. 10. Reinforce change outcomes consistently. Change management = successful transformation. Need identified. Readiness assessed. Objectives defined. Strategy developed. Activities planned. Vision communicated. Stakeholders engaged. Actions implemented. Progress monitored. Outcomes reinforced.
        </div>
      </div>
    </main>
  );
}