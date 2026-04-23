'use client'

export default function WorkplaceSafetyTrainingGuide() {
  const programs = [
    { program: 'General safety', topics: 'Hazards, protocols', audience: 'All employees' },
    { program: 'OSHA compliance', topics: 'Regulations, rights', audience: 'Required roles' },
    { program: 'Equipment safety', topics: 'Tools, machinery', audience: 'Operators' },
    { program: 'Emergency response', topics: 'Evacuation, first aid', audience: 'All employees' },
    { program: 'Hazard communication', topics: 'Chemicals, labeling', audience: 'Exposed roles' },
    { program: 'Personal protective equipment', topics: 'PPE selection, use', audience: 'PPE required' },
  ];

  const methods = [
    'Classroom training',
    'Online modules',
    'Hands-on practice',
    'Video demonstrations',
    'Safety drills',
    'On-the-job training',
    'Safety meetings',
    'Written materials',
  ];

  const evaluation = [
    'Knowledge tests',
    'Skills demonstration',
    'Behavior observation',
    'Incident tracking',
    'Safety audits',
    'Compliance checks',
    'Employee feedback',
    'Training completion rates',
  ];

  const compliance = [
    'OSHA requirements',
    'Industry standards',
    'Company policy',
    'Documentation standards',
    'Training frequency',
    'Record retention',
    'Certification renewal',
    'Audit readiness',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Safety Training Guide</h1>
      <p className="text-zinc-600">Training programs, methods, evaluation, and compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Training Programs</h3>
        <div className="space-y-1 text-xs">
          {programs.map((p) => (
            <div key={p.program} className="bg-white rounded p-2">
              <strong>{p.program}</strong>
              <div className="text-zinc-500 mt-1">Topics: {p.topics}</div>
              <div className="text-green-600 mt-1">Audience: {p.audience}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Training Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Evaluation Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {evaluation.map((e, idx) => (
            <div key={e} className="bg-white rounded p-2">{idx + 1}. {e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {compliance.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Training Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess training needs. 2. Identify required programs. 3. Choose appropriate methods. 4. Develop training content. 5. Schedule training sessions. 6. Train all required employees. 7. Evaluate effectiveness. 8. Document completion. 9. Maintain records. 10. Schedule refresher training. 11. Update content as needed. 12. Audit compliance. Safety training = protection. Required programs. Multiple methods. Effectiveness evaluation. Documentation maintained. Compliance verified. Regular refreshers. Continuous improvement.
        </div>
      </div>
    </main>
  );
}