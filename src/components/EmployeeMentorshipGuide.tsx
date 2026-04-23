'use client'

export default function EmployeeMentorshipGuide() {
  const types = [
    { type: 'Traditional mentorship', duration: 'Long-term', focus: 'Career development' },
    { type: 'Peer mentorship', duration: 'Short-term', focus: 'Knowledge sharing' },
    { type: 'Reverse mentorship', duration: 'Variable', focus: 'New perspective' },
    { type: 'Group mentorship', duration: 'Program-based', focus: 'Multiple mentors' },
    { type: 'Situational mentorship', duration: 'As needed', focus: 'Specific challenge' },
    { type: 'Formal programs', duration: 'Structured', focus: 'Organization-led' },
  ];

  const benefits = [
    { benefit: 'Skill development', group: 'Mentee', value: 'Accelerated growth' },
    { benefit: 'Career guidance', group: 'Mentee', value: 'Direction clarity' },
    { benefit: 'Network expansion', group: 'Both', value: 'Relationships' },
    { benefit: 'Leadership development', group: 'Mentor', value: 'Skill building' },
    { benefit: 'Knowledge transfer', group: 'Organization', value: 'Preservation' },
    { benefit: 'Retention', group: 'Organization', value: 'Lower turnover' },
  ];

  const process = [
    'Define program goals',
    'Match mentor-mentee',
    'Establish expectations',
    'Create meeting schedule',
    'Set development goals',
    'Provide support',
    'Track progress',
    'Evaluate outcomes',
  ];

  const bestPractices = [
    'Clear expectations',
    'Regular meetings',
    'Active listening',
    'Constructive feedback',
    'Goal focus',
    'Mutual respect',
    'Open communication',
    'Commitment needed',
    'Appropriate matching',
    'Program support',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Mentorship Guide</h1>
      <p className="text-zinc-600">Types, benefits, process, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Mentorship Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Duration: {t.duration}</div>
              <div className="text-green-600 mt-1">Focus: {t.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">Group: {b.group}</div>
              <div className="text-green-600 mt-1">Value: {b.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Program Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
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
        <h3 className="font-medium mb-2">Mentorship Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define program goals clearly. 2. Identify suitable mentors. 3. Match based on needs and fit. 4. Set clear expectations. 5. Establish meeting schedule. 6. Define development goals. 7. Provide program support. 8. Train participants. 9. Monitor progress regularly. 10. Encourage open communication. 11. Evaluate program effectiveness. 12. Adjust based on feedback. Mentorship = development investment. Multiple types. Clear benefits. Structured process. Active participation. Regular meetings. Progress tracking. Program evaluation.
        </div>
      </div>
    </main>
  );
}