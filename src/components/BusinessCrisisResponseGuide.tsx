'use client'

export default function BusinessCrisisResponseGuide() {
  const phases = [
    { phase: 'Pre-crisis', activities: 'Preparation, prevention', outcome: 'Risk mitigation' },
    { phase: 'Crisis response', activities: 'Detection, containment', outcome: 'Damage control' },
    { phase: 'Post-crisis', activities: 'Recovery, learning', outcome: 'Resilience' },
  ];

  const steps = [
    'Establish crisis team',
    'Identify crisis scenarios',
    'Develop crisis protocols',
    'Create communication plans',
    'Train crisis responders',
    'Detect crisis signals',
    'Activate crisis response',
    'Execute containment actions',
    'Communicate with stakeholders',
    'Conduct post-crisis review',
  ];

  const types = [
    { type: 'Operational crisis', trigger: 'System failures', response: 'Recovery protocols' },
    { type: 'Financial crisis', trigger: 'Cash issues', response: 'Financial controls' },
    { type: 'Reputational crisis', trigger: 'Public incidents', response: 'Communication strategy' },
    { type: 'Natural disaster', trigger: 'Environmental events', response: 'Safety protocols' },
  ];

  const checklist = [
    'Crisis team established',
    'Protocols documented',
    'Communication channels ready',
    'Resources allocated',
    'Training completed',
    'Monitoring active',
    'Escalation paths defined',
    'Backup systems tested',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Crisis Response Guide</h1>
      <p className="text-zinc-600">Phases, steps, crisis types, and readiness checklist.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Phases</h3>
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
        <h3 className="font-medium mb-2">Response Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crisis Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Trigger: {t.trigger}</div>
              <div className="text-green-600 mt-1">Response: {t.response}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Readiness Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crisis Response Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish crisis team proactively. 2. Identify crisis scenarios comprehensively. 3. Develop crisis protocols thoroughly. 4. Create communication plans carefully. 5. Train crisis responders effectively. 6. Detect crisis signals early. 7. Activate crisis response swiftly. 8. Execute containment actions decisively. 9. Communicate with stakeholders transparently. 10. Conduct post-crisis review honestly. Crisis response = organizational resilience. Team established. Scenarios identified. Protocols developed. Plans created. Responders trained. Signals detected. Response activated. Actions executed. Stakeholders informed. Review conducted.
        </div>
      </div>
    </main>
  );
}