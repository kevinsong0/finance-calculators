'use client'

export default function BusinessEmployeeRelationsGuide() {
  const areas = [
    { area: 'Communication', focus: 'Open dialogue', approach: 'Regular updates' },
    { area: 'Conflict resolution', focus: 'Fair handling', approach: 'Mediation process' },
    { area: 'Policy enforcement', focus: 'Consistent application', approach: 'Clear guidelines' },
    { area: 'Recognition programs', focus: 'Acknowledgment', approach: 'Formal and informal' },
    { area: 'Feedback channels', focus: 'Voice opportunities', approach: 'Multiple methods' },
    { area: 'Work environment', focus: 'Conditions', approach: 'Continuous improvement' },
  ];

  const practices = [
    'Maintain open communication',
    'Address concerns promptly',
    'Apply policies consistently',
    'Recognize contributions regularly',
    'Provide feedback opportunities',
    'Support employee development',
    'Resolve conflicts fairly',
    'Build trust relationships',
    'Monitor employee satisfaction',
    'Continuously improve processes',
  ];

  const challenges = [
    { challenge: 'Communication gaps', impact: 'Misunderstanding', solution: 'Regular updates' },
    { challenge: 'Policy inconsistency', impact: 'Fairness concerns', solution: 'Training managers' },
    { challenge: 'Conflict escalation', impact: 'Team disruption', solution: 'Early intervention' },
    { challenge: 'Recognition neglect', impact: 'Engagement drop', solution: 'Program implementation' },
  ];

  const metrics = [
    'Employee satisfaction score',
    'Grievance resolution time',
    'Policy violation incidents',
    'Recognition participation',
    'Feedback submission rate',
    'Conflict resolution success',
    'Trust survey results',
    'Turnover intention rate',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Employee Relations Guide</h1>
      <p className="text-zinc-600">Areas, practices, challenges, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relations Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Approach: {a.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Challenges</h3>
        <div className="space-y-1 text-xs">
          {challenges.map((c) => (
            <div key={c.challenge} className="bg-white rounded p-2">
              <strong>{c.challenge}</strong>
              <div className="text-zinc-500 mt-1">Impact: {c.impact}</div>
              <div className="text-green-600 mt-1">Solution: {c.solution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Employee Relations Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Maintain open communication consistently. 2. Address concerns promptly and fairly. 3. Apply policies consistently throughout. 4. Recognize contributions regularly and visibly. 5. Provide meaningful feedback opportunities. 6. Support employee development actively. 7. Resolve conflicts fairly and quickly. 8. Build trust relationships continuously. 9. Monitor employee satisfaction regularly. 10. Continuously improve processes effectively. Employee relations = workplace harmony. Communication maintained. Concerns addressed. Policies applied. Contributions recognized. Opportunities provided. Development supported. Conflicts resolved. Trust built. Satisfaction monitored. Processes improved.
        </div>
      </div>
    </main>
  );
}