'use client'

export default function EmployeeDisciplineGuide() {
  const types = [
    { type: 'Verbal warning', desc: 'First formal step', severity: 'Minor' },
    { type: 'Written warning', desc: 'Documented notice', severity: 'Moderate' },
    { type: 'Performance improvement', desc: 'Formal plan', severity: 'Significant' },
    { type: 'Suspension', desc: 'Temporary removal', severity: 'Serious' },
    { type: 'Termination', desc: 'End employment', severity: 'Final' },
  ];

  const steps = [
    'Document the issue',
    'Investigate thoroughly',
    'Meet with employee',
    'Listen to response',
    'Apply appropriate action',
    'Document decision',
    'Communicate outcome',
    'Monitor improvement',
    'Follow up',
    'Maintain records',
  ];

  const principles = [
    'Consistency in application',
    'Clear policy communication',
    'Progressive approach',
    'Documentation of all steps',
    'Employee opportunity to respond',
    'HR involvement',
    'Legal compliance',
    'Fairness and objectivity',
  ];

  const challenges = [
    { challenge: 'Inconsistent application', solution: 'Clear policy, training' },
    { challenge: 'Documentation gaps', solution: 'Template forms, process' },
    { challenge: 'Legal risk', solution: 'HR review, compliance' },
    { challenge: 'Employee relations', solution: 'Fairness, communication' },
    { challenge: 'Manager discomfort', solution: 'Training, support' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Discipline Guide</h1>
      <p className="text-zinc-600">Types, process, principles, and challenges.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Discipline Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Severity: {t.severity}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Process Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Challenges & Solutions</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong className="text-red-600">{c.challenge}</strong>
              <div className="text-green-600 mt-1">→ {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Discipline Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Have clear policy documented. 2. Communicate policy to all employees. 3. Train managers on process. 4. Investigate issues thoroughly. 5. Document all evidence. 6. Meet with employee privately. 7. Allow employee to respond. 8. Apply progressive discipline. 9. Document decision and rationale. 10. Communicate outcome clearly. 11. Set improvement expectations. 12. Monitor and follow up. Discipline = fair, documented, progressive. Clear policy. Consistent application. Thorough investigation. Employee response. Proper documentation. Legal compliance. Follow-up monitoring.
        </div>
      </div>
    </main>
  );
}