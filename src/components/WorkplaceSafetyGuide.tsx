'use client'

export default function WorkplaceSafetyGuide() {
  const hazards = [
    { hazard: 'Physical Hazards', examples: 'Falls, equipment, noise', prevention: 'Safety equipment, training' },
    { hazard: 'Chemical Hazards', examples: 'Toxic substances, fumes', prevention: 'Handling procedures, PPE' },
    { hazard: 'Biological Hazards', examples: 'Viruses, bacteria', prevention: 'Hygiene, vaccination' },
    { hazard: 'Ergonomic Hazards', examples: 'Poor posture, repetitive', prevention: 'Workstation design' },
    { hazard: 'Psychological Hazards', examples: 'Stress, harassment', prevention: 'Support programs' },
  ];

  const prevention = [
    'Safety training',
    'Personal protective equipment',
    'Regular inspections',
    'Hazard identification',
    'Incident reporting',
    'Emergency procedures',
    'First aid availability',
    'Safety committees',
  ];

  const responsibilities = [
    { role: 'Employer', duties: 'Provide safe environment, training, equipment' },
    { role: 'Employee', duties: 'Follow procedures, report hazards, use PPE' },
    { role: 'Safety Officer', duties: 'Inspect, train, investigate, document' },
    { role: 'Management', duties: 'Policy, resources, enforcement, culture' },
  ];

  const incidentSteps = [
    'Ensure immediate safety',
    'Provide medical attention',
    'Report incident',
    'Document details',
    'Investigate cause',
    'Implement corrective action',
    'Follow up prevention',
    'Report to authorities',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Safety Guide</h1>
      <p className="text-zinc-600">Hazards, prevention, responsibilities, and incident response.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Types of Hazards</h3>
        <div className="space-y-1 text-xs">
          {hazards.map((h) => (
            <div key={h.hazard} className="bg-white rounded p-2">
              <strong>{h.hazard}</strong>
              <div className="text-zinc-500 mt-1">Examples: {h.examples}</div>
              <div className="text-green-600 mt-1">Prevention: {h.prevention}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Prevention Measures</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {prevention.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Responsibilities</h3>
        <div className="space-y-1 text-xs">
          {responsibilities.map((r) => (
            <div key={r.role} className="bg-white rounded p-2">
              <strong>{r.role}</strong>
              <div className="text-zinc-500 mt-1">{r.duties}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Incident Response</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {incidentSteps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all workplace hazards. 2. Assess risk for each hazard. 3. Implement prevention measures. 4. Provide safety training. 5. Ensure proper equipment available. 6. Conduct regular inspections. 7. Maintain incident reporting system. 8. Investigate all incidents. 9. Document and track safety data. 10. Review and improve procedures. 11. Communicate safety expectations. 12. Build safety culture. Safety = ongoing commitment. Identify risks, prevent accidents. Training essential. Everyone responsible. Document everything. Continuous improvement."
        </div>
      </div>
    </main>
  );
}