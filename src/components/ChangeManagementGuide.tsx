'use client'

export default function ChangeManagementGuide() {
  const stages = [
    { stage: 'Prepare', desc: 'Assess need, plan approach', output: 'Change plan' },
    { stage: 'Communicate', desc: 'Explain reasons, benefits', output: 'Awareness' },
    { stage: 'Implement', desc: 'Execute changes', output: 'New state' },
    { stage: 'Support', desc: 'Help people adapt', output: 'Adoption' },
    { stage: 'Monitor', desc: 'Track progress', output: 'Feedback' },
    { stage: 'Sustain', desc: 'Embed changes', output: 'Stability' },
  ];

  const resistance = [
    { cause: 'Fear of unknown', response: 'Clear communication, support' },
    { cause: 'Loss of control', response: 'Involve in decisions, input' },
    { cause: 'Habit disruption', response: 'Training, gradual change' },
    { cause: 'Workload increase', response: 'Support, resources, time' },
    { cause: 'Trust issues', response: 'Transparent, honest, consistent' },
    { cause: 'Success skepticism', response: 'Evidence, examples, pilots' },
  ];

  const principles = [
    'Clear vision and rationale',
    'Strong leadership support',
    'Employee involvement',
    'Communication throughout',
    'Training and support',
    'Address resistance',
    'Monitor progress',
    'Celebrate milestones',
  ];

  const roles = [
    { role: 'Change Leader', duties: 'Drive change, visible support' },
    { role: 'Change Manager', duties: 'Plan, coordinate, communicate' },
    { role: 'Change Champions', duties: 'Support peers, model change' },
    { role: 'Employees', duties: 'Participate, feedback, adapt' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Change Management Guide</h1>
      <p className="text-zinc-600">Change stages, resistance, principles, and roles.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Process Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Output: {s.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resistance Causes & Responses</h3>
        <div className="space-y-1 text-xs">
          {resistance.map((r) => (
            <div key={r.cause} className="bg-white rounded p-2">
              <strong className="text-red-600">{r.cause}</strong>
              <div className="text-green-600 mt-1">→ {r.response}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Roles</h3>
        <div className="space-y-1 text-xs">
          {roles.map((r) => (
            <div key={r.role} className="bg-white rounded p-2">
              <strong>{r.role}</strong>
              <div className="text-zinc-500 mt-1">{r.duties}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Change Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess change necessity. 2. Define clear vision. 3. Plan approach and timeline. 4. Identify stakeholders. 5. Communicate early and often. 6. Address resistance proactively. 7. Provide training and support. 8. Involve employees. 9. Monitor progress regularly. 10. Adjust as needed. 11. Celebrate milestones. 12. Sustain changes long-term. Change management = people-focused. Communication essential. Address resistance. Support throughout. Monitor and adjust. Embed changes."
        </div>
      </div>
    </main>
  );
}