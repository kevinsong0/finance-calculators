'use client'

export default function AgileMethodologyGuide() {
  const methodologies = [
    { method: 'Scrum', desc: 'Sprints, roles, ceremonies, artifacts', use: 'Fixed-length iterations, defined roles' },
    { method: 'Kanban', desc: 'Visual board, WIP limits, flow', use: 'Continuous delivery, flexible priorities' },
    { method: 'XP (Extreme)', desc: 'Pair programming, TDD, CI', use: 'High-quality code, rapid feedback' },
    { method: 'Lean', desc: 'Eliminate waste, optimize flow', use: 'Efficiency, minimal processes' },
    { method: 'SAFe', desc: 'Scaled Agile for large orgs', use: 'Enterprise-level coordination' },
  ];

  const scrumRoles = [
    { role: 'Product Owner', desc: 'Defines product backlog, prioritizes' },
    { role: 'Scrum Master', desc: 'Facilitates, removes blockers' },
    { role: 'Dev Team', desc: 'Self-organizing, cross-functional' },
  ];

  const ceremonies = [
    { ceremony: 'Sprint Planning', freq: 'Every sprint start', desc: 'Select backlog items' },
    { ceremony: 'Daily Standup', freq: 'Daily (15 min)', desc: 'Yesterday, today, blockers' },
    { ceremony: 'Sprint Review', freq: 'Sprint end', desc: 'Demo completed work' },
    { ceremony: 'Retrospective', freq: 'Sprint end', desc: 'Improve process' },
  ];

  const tips = [
    'Start with one methodology',
    'Adapt to team needs',
    'Regular retrospectives',
    'Focus on collaboration',
    'Keep iterations short',
    'Prioritize ruthlessly',
    'Embrace continuous improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Agile Methodology Guide</h1>
      <p className="text-zinc-600">Agile frameworks, roles, ceremonies, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Agile Methodologies</h3>
        <div className="space-y-1 text-xs">
          {methodologies.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Use: {m.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Scrum Roles</h3>
        <div className="space-y-1 text-xs">
          {scrumRoles.map((r) => (
            <div key={r.role} className="bg-white rounded p-2">
              <strong>{r.role}</strong>
              <div className="text-zinc-500 mt-1">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Scrum Ceremonies</h3>
        <div className="space-y-1 text-xs">
          {ceremonies.map((c) => (
            <div key={c.ceremony} className="bg-white rounded p-2">
              <strong>{c.ceremony}</strong> ({c.freq})
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Agile Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Agile Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose methodology (Scrum/Kanban). 2. Define team roles. 3. Set iteration length. 4. Create backlog. 5. Establish ceremonies. 6. Track progress visually. 7. Hold retrospectives. 8. Iterate and improve. 9. Measure velocity. 10. Focus on value delivery. Agile = adaptability over rigid plans.
        </div>
      </div>
    </main>
  );
}