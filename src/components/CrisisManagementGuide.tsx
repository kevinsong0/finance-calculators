'use client'

export default function CrisisManagementGuide() {
  const types = [
    { type: 'Operational', desc: 'System failures, supply disruption', priority: 'Restore operations' },
    { type: 'Financial', desc: 'Cash crisis, major loss', priority: 'Secure funding' },
    { type: 'Reputational', desc: 'Public scandal, negative press', priority: 'Communicate, rebuild' },
    { type: 'Natural Disaster', desc: 'Weather, earthquake, fire', priority: 'Safety, recovery' },
    { type: 'Cyber', desc: 'Data breach, hack', priority: 'Contain, protect' },
    { type: 'Personnel', desc: 'Key loss, scandal', priority: 'Replace, manage' },
  ];

  const phases = [
    { phase: 'Pre-crisis', action: 'Prepare, plan, train' },
    { phase: 'Response', action: 'Act immediately, communicate' },
    { phase: 'Containment', action: 'Limit damage, stabilize' },
    { phase: 'Recovery', action: 'Restore, rebuild, learn' },
  ];

  const planElements = [
    'Crisis identification criteria',
    'Response team assignments',
    'Communication protocols',
    'Resource allocation',
    'Decision authority',
    'Contact lists',
    'Backup procedures',
    'Recovery steps',
  ];

  const communication = [
    'Act quickly',
    'Be transparent',
    'Show empathy',
    'Provide facts',
    'Update regularly',
    'Address stakeholders',
    'Use consistent messaging',
    'Apologize if needed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Crisis Management Guide</h1>
      <p className="text-zinc-600">Crisis types, phases, planning, and communication.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crisis Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-red-600 mt-1">Priority: {t.priority}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Plan Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {planElements.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {communication.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crisis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Develop crisis plan beforehand. 2. Identify crisis types. 3. Assign response team. 4. Establish communication protocols. 5. Train team regularly. 6. Act immediately when crisis hits. 7. Communicate transparently. 8. Contain damage quickly. 9. Document all actions. 10. Monitor situation continuously. 11. Begin recovery planning. 12. Learn and improve plan. Crisis management = preparation essential. Plan before crisis. Act quickly. Communicate honestly. Contain, recover, learn. Regular training critical."
        </div>
      </div>
    </main>
  );
}