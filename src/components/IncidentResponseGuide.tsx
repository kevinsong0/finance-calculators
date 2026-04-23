'use client'

export default function IncidentResponseGuide() {
  const phases = [
    { phase: 'Detection', desc: 'Identify incident, assess severity', action: 'Monitoring, alerts, user reports' },
    { phase: 'Triage', desc: 'Classify severity, assign team', action: 'Severity levels, role assignment' },
    { phase: 'Containment', desc: 'Stop spread, limit damage', action: 'Isolate, rollback, disable' },
    { phase: 'Resolution', desc: 'Fix root cause', action: 'Debug, patch, deploy fix' },
    { phase: 'Recovery', desc: 'Restore normal operations', action: 'Verify fix, restore services' },
    { phase: 'Post-mortem', desc: 'Learn from incident', action: 'Document, improve, share' },
  ];

  const severityLevels = [
    { level: 'SEV-1 (Critical)', desc: 'Complete service outage', response: 'All hands, immediate' },
    { level: 'SEV-2 (High)', desc: 'Major functionality broken', response: 'Core team, ASAP' },
    { level: 'SEV-3 (Medium)', desc: 'Partial impact, workaround exists', response: 'Assigned team, 24h' },
    { level: 'SEV-4 (Low)', desc: 'Minor issue, limited impact', response: 'Normal queue' },
  ];

  const bestPractices = [
    'Clear incident commander',
    'Communication channel dedicated',
    'Regular status updates',
    'Document timeline',
    'Don&apos;t panic, stay calm',
    'Customer communication plan',
    'Root cause focus',
    'Blameless post-mortem',
  ];

  const tools = [
    { tool: 'PagerDuty', use: 'Alerting, on-call management' },
    { tool: 'Slack', use: 'Incident channel, communication' },
    { tool: 'Jira', use: 'Issue tracking, post-mortem' },
    { tool: 'Datadog', use: 'Monitoring, dashboards' },
    { tool: 'Runbooks', use: 'Playbooks, procedures' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Incident Response Guide</h1>
      <p className="text-zinc-600">Incident phases, severity levels, best practices, and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Severity Levels</h3>
        <div className="space-y-1 text-xs">
          {severityLevels.map((s) => (
            <div key={s.level} className="bg-white rounded p-2">
              <strong>{s.level}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Response: {s.response}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Incident Tools</h3>
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
        <h3 className="font-medium mb-2">Incident Response Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Acknowledge alert. 2. Assess severity. 3. Assign incident commander. 4. Open communication channel. 5. Start incident log. 6. Communicate to stakeholders. 7. Contain issue. 8. Investigate root cause. 9. Implement fix. 10. Verify resolution. 11. Recovery actions. 12. Close incident. 13. Post-mortem. 14. Action items. Speed matters. Communicate often. Learn always.
        </div>
      </div>
    </main>
  );
}