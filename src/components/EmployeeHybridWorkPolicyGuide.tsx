'use client'

export default function EmployeeHybridWorkPolicyGuide() {
  const models = [
    { model: 'Fixed schedule', structure: 'Set onsite days', balance: 'Predictable routine' },
    { model: 'Flexible choice', structure: 'Employee discretion', balance: 'Personal control' },
    { model: 'Team-based', structure: 'Team coordination', balance: 'Collaboration needs' },
    { model: 'Role-specific', structure: 'Job requirements', balance: 'Function driven' },
    { model: 'Manager-approved', structure: 'Case-by-case', balance: 'Supervised flexibility' },
    { model: 'Project-driven', structure: 'Work demands', balance: 'Task requirements' },
  ];

  const components = [
    'Onsite schedule definition',
    'Remote work expectations',
    'Communication protocols',
    'Technology requirements',
    'Meeting coordination',
    'Performance measurement',
    'Equipment allocation',
    'Space management',
  ];

  const challenges = [
    { challenge: 'Scheduling complexity', issue: 'Coordination effort', solution: 'Clear calendar system' },
    { challenge: 'Communication gaps', issue: 'Hybrid disconnect', solution: 'Unified platforms' },
    { challenge: 'Equity concerns', issue: 'Treatment fairness', solution: 'Consistent policy' },
    { challenge: 'Space constraints', issue: 'Office capacity', solution: 'Booking system' },
  ];

  const bestPractices = [
    'Clear policy documentation',
    'Technology investment',
    'Team coordination protocols',
    'Flexible scheduling options',
    'Outcome-based evaluation',
    'Regular check-ins',
    'Space booking systems',
    'Continuous policy review',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Hybrid Work Policy Guide</h1>
      <p className="text-zinc-600">Models, components, challenges, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Hybrid Models</h3>
        <div className="space-y-1 text-xs">
          {models.map((m) => (
            <div key={m.model} className="bg-white rounded p-2">
              <strong>{m.model}</strong>
              <div className="text-zinc-500 mt-1">Structure: {m.structure}</div>
              <div className="text-green-600 mt-1">Balance: {m.balance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Policy Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">Issue: {c.issue}</div>
              <div className="text-green-600 mt-1">Solution: {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Hybrid Work Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate hybrid model. 2. Define onsite schedule clearly. 3. Set remote work expectations. 4. Establish communication protocols. 5. Invest in technology support. 6. Coordinate meeting schedules. 7. Implement performance measurement. 8. Allocate equipment fairly. 9. Manage space effectively. 10. Review policy continuously. Hybrid work = balanced flexibility. Model chosen. Schedule defined. Expectations set. Communication established. Technology invested. Meetings coordinated. Performance measured. Equipment allocated. Space managed. Policy reviewed.
        </div>
      </div>
    </main>
  );
}