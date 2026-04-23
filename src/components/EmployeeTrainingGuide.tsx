'use client'

export default function EmployeeTrainingGuide() {
  const types = [
    { type: 'Onboarding', audience: 'New hires', duration: 'First weeks' },
    { type: 'Technical', audience: 'Role-specific', duration: 'Ongoing' },
    { type: 'Leadership', audience: 'Managers', duration: 'Periodic' },
    { type: 'Compliance', audience: 'All employees', duration: 'Annual' },
    { type: 'Soft skills', audience: 'All employees', duration: 'Periodic' },
    { type: 'Safety', audience: 'Required roles', duration: 'Initial + refresh' },
  ];

  const methods = [
    'Classroom training',
    'Online courses',
    'On-the-job training',
    'Mentorship programs',
    'Workshops',
    'Conferences',
    'Self-study',
    'Job shadowing',
    'Cross-training',
    'Simulation exercises',
  ];

  const planning = [
    'Identify needs',
    'Set objectives',
    'Choose methods',
    'Allocate resources',
    'Schedule training',
    'Prepare materials',
    'Communicate plan',
    'Execute training',
    'Evaluate results',
    'Follow-up support',
  ];

  const evaluation = [
    'Participant feedback',
    'Knowledge assessment',
    'Skills demonstration',
    'Behavior observation',
    'Performance impact',
    'Business outcomes',
    'Cost-effectiveness',
    'Return on investment',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Training Guide</h1>
      <p className="text-zinc-600">Types, methods, planning, and evaluation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Training Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Audience: {t.audience}</div>
              <div className="text-green-600 mt-1">Duration: {t.duration}</div>
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
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {planning.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Evaluation Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {evaluation.map((e, idx) => (
            <div key={e} className="bg-white rounded p-2">{idx + 1}. {e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Training Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess training needs. 2. Set learning objectives. 3. Select appropriate methods. 4. Allocate budget and resources. 5. Prepare training materials. 6. Schedule training sessions. 7. Communicate to participants. 8. Deliver training effectively. 9. Evaluate participant learning. 10. Measure performance impact. 11. Calculate ROI. 12. Adjust future training. Training = investment in growth. Needs assessment. Clear objectives. Multiple methods. Resource allocation. Effective delivery. Thorough evaluation. ROI measurement. Continuous improvement.
        </div>
      </div>
    </main>
  );
}