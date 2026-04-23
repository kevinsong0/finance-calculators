'use client'

export default function ProjectManagementGuide() {
  const phases = [
    { phase: 'Initiation', desc: 'Define scope, objectives, stakeholders', deliverable: 'Project charter, stakeholder register' },
    { phase: 'Planning', desc: 'Detailed plan, schedule, budget', deliverable: 'Project plan, WBS, schedule' },
    { phase: 'Execution', desc: 'Perform work, manage team', deliverable: 'Deliverables, progress reports' },
    { phase: 'Monitoring', desc: 'Track progress, control changes', deliverable: 'Status reports, change logs' },
    { phase: 'Closure', desc: 'Final delivery, lessons learned', deliverable: 'Final report, archive' },
  ];

  const methodologies = [
    { method: 'Waterfall', desc: 'Sequential phases, fixed scope', best: 'Clear requirements, stable scope' },
    { method: 'Agile', desc: 'Iterative, flexible scope', best: 'Changing requirements, innovation' },
    { method: 'Hybrid', desc: 'Waterfall planning + Agile delivery', best: 'Large projects with some flexibility' },
  ];

  const tools = [
    { tool: 'Jira', use: 'Agile tracking, backlog management' },
    { tool: 'Asana', use: 'Task management, team coordination' },
    { tool: 'MS Project', use: 'Traditional PM, Gantt charts' },
    { tool: 'Trello', use: 'Visual boards, simple tracking' },
    { tool: 'Notion', use: 'Docs, tasks, collaboration' },
  ];

  const tips = [
    'Define clear scope',
    'Set measurable goals',
    'Communicate regularly',
    'Manage risks proactively',
    'Track progress visually',
    'Document decisions',
    'Celebrate milestones',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Project Management Guide</h1>
      <p className="text-zinc-600">PM phases, methodologies, tools, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Deliverable: {p.deliverable}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">PM Methodologies</h3>
        <div className="space-y-1 text-xs">
          {methodologies.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Best: {m.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">PM Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">{t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">PM Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Project Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define project charter. 2. Identify stakeholders. 3. Create WBS. 4. Estimate effort. 5. Build schedule. 6. Allocate resources. 7. Assess risks. 8. Set communication plan. 9. Track progress. 10. Manage changes. 11. Report status. 12. Close and archive. Good PM = clear goals + good communication + proactive risk management.
        </div>
      </div>
    </main>
  );
}