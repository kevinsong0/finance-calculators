'use client'

export default function EmployeeEngagementGuide() {
  const drivers = [
    { driver: 'Meaningful Work', impact: 'Purpose and contribution', action: 'Connect to mission' },
    { driver: 'Recognition', impact: 'Appreciation felt', action: 'Regular acknowledgment' },
    { driver: 'Growth Opportunities', impact: 'Career development', action: 'Training, promotions' },
    { driver: 'Relationships', impact: 'Team connection', action: 'Team building, trust' },
    { driver: 'Autonomy', impact: 'Control over work', action: 'Delegate, empower' },
    { driver: 'Fairness', impact: 'Equitable treatment', action: 'Transparent decisions' },
  ];

  const measurement = [
    'Employee surveys',
    'Pulse surveys (frequent)',
    'One-on-one conversations',
    'Turnover rates',
    'Productivity metrics',
    'Absenteeism tracking',
    'Exit interviews',
    'Engagement index scores',
  ];

  const improvement = [
    'Act on survey feedback',
    'Improve communication',
    'Recognize contributions',
    'Provide growth paths',
    'Build team connections',
    'Increase autonomy',
    'Address fairness concerns',
    'Leadership development',
  ];

  const warningSigns = [
    'High turnover',
    'Low survey scores',
    'Increased absenteeism',
    'Decreased productivity',
    'Negative feedback',
    'Disengaged behavior',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Engagement Guide</h1>
      <p className="text-zinc-600">Engagement drivers, measurement, improvement, and warning signs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Engagement Drivers</h3>
        <div className="space-y-1 text-xs">
          {drivers.map((d) => (
            <div key={d.driver} className="bg-white rounded p-2">
              <strong>{d.driver}</strong>
              <div className="text-zinc-500 mt-1">Impact: {d.impact}</div>
              <div className="text-green-600 mt-1">Action: {d.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Measurement Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {measurement.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {improvement.map((i) => (
            <div key={i} className="bg-white rounded p-2">{i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Warning Signs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {warningSigns.map((w) => (
            <div key={w} className="bg-white rounded p-2 text-red-600">{w}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Engagement Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Measure engagement regularly. 2. Identify key drivers for your team. 3. Act on feedback received. 4. Communicate clearly and often. 5. Recognize contributions publicly. 6. Provide growth opportunities. 7. Build strong team relationships. 8. Give autonomy where appropriate. 9. Ensure fairness in decisions. 10. Develop engaging leaders. 11. Monitor warning signs. 12. Continuous improvement mindset. Engagement = emotional commitment. Drivers vary by person. Measure, act, improve. Leaders set the tone. Connection matters. Growth essential."
        </div>
      </div>
    </main>
  );
}