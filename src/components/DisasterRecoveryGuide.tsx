'use client'

export default function DisasterRecoveryGuide() {
  const components = [
    { component: 'Recovery Plan', desc: 'Documented procedures', owner: 'IT/Operations' },
    { component: 'Backup Systems', desc: 'Data backup and restore', owner: 'IT' },
    { component: 'Alternate Site', desc: 'Backup location', owner: 'Facilities' },
    { component: 'Communication Plan', desc: 'Notification procedures', owner: 'Management' },
    { component: 'Recovery Team', desc: 'Assigned responders', owner: 'Leadership' },
    { component: 'Testing Schedule', desc: 'Regular DR tests', owner: 'IT/Operations' },
  ];

  const metrics = [
    { metric: 'RTO', desc: 'Recovery Time Objective', target: 'Define acceptable downtime' },
    { metric: 'RPO', desc: 'Recovery Point Objective', target: 'Define acceptable data loss' },
    { metric: 'MTTR', desc: 'Mean Time to Recovery', target: 'Minimize with practice' },
  ];

  const phases = [
    { phase: 'Detection', action: 'Identify disaster occurrence' },
    { phase: 'Response', action: 'Activate recovery team' },
    { phase: 'Recovery', action: 'Restore critical systems' },
    { phase: 'Resumption', action: 'Return to normal operations' },
  ];

  const testing = [
    'Tabletop exercises',
    'Component testing',
    'Full DR simulation',
    'Documented results',
    'Gap identification',
    'Plan updates',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Disaster Recovery Guide</h1>
      <p className="text-zinc-600">DR components, metrics, phases, and testing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DR Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Owner: {c.owner}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Target: {m.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Recovery Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {testing.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DR Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Document comprehensive recovery plan. 2. Define RTO and RPO for all systems. 3. Identify critical systems priority. 4. Set up backup infrastructure. 5. Establish alternate site/cloud. 6. Assign recovery team roles. 7. Create communication plan. 8. Schedule regular testing. 9. Document test results. 10. Update plan based on tests. 11. Train all team members. 12. Review plan annually. Disaster recovery = business continuity. Define recovery objectives. Document procedures. Test regularly. Update based on tests. Assign clear responsibilities."
        </div>
      </div>
    </main>
  );
}