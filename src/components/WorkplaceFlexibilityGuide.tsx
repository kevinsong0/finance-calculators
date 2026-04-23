'use client'

export default function WorkplaceFlexibilityGuide() {
  const arrangements = [
    { arrangement: 'Remote work', flexibility: 'Location', implementation: 'Policy framework' },
    { arrangement: 'Hybrid work', flexibility: 'Mix location', implementation: 'Schedule system' },
    { arrangement: 'Flexible hours', flexibility: 'Time', implementation: 'Core hours' },
    { arrangement: 'Compressed weeks', flexibility: 'Schedule', implementation: '4-day option' },
    { arrangement: 'Part-time', flexibility: 'Hours', implementation: 'Reduced schedule' },
    { arrangement: 'Job sharing', flexibility: 'Role split', implementation: 'Two-person role' },
  ];

  const benefits = [
    { benefit: 'Employee satisfaction', group: 'Employee', outcome: 'Higher morale' },
    { benefit: 'Work-life balance', group: 'Employee', outcome: 'Better balance' },
    { benefit: 'Talent attraction', group: 'Organization', outcome: 'Better candidates' },
    { benefit: 'Retention', group: 'Organization', outcome: 'Lower turnover' },
    { benefit: 'Cost savings', group: 'Organization', outcome: 'Space reduction' },
    { benefit: 'Productivity', group: 'Both', outcome: 'Focus improvement' },
  ];

  const challenges = [
    { challenge: 'Communication gaps', solution: 'Regular check-ins, tools' },
    { challenge: 'Collaboration issues', solution: 'Scheduled collaboration' },
    { challenge: 'Management difficulty', solution: 'Training, output focus' },
    { challenge: 'Technology needs', solution: 'Equipment, support' },
    { challenge: 'Culture concerns', solution: 'Connection activities' },
    { challenge: 'Equity perception', solution: 'Fair access policy' },
  ];

  const implementation = [
    'Define policy clearly',
    'Set eligibility criteria',
    'Establish expectations',
    'Provide technology',
    'Train managers',
    'Monitor effectiveness',
    'Adjust as needed',
    'Communicate changes',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Flexibility Guide</h1>
      <p className="text-zinc-600">Arrangements, benefits, challenges, and implementation.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Flexibility Arrangements</h3>
        <div className="space-y-1 text-xs">
          {arrangements.map((a) => (
            <div key={a.arrangement} className="bg-white rounded p-2">
              <strong>{a.arrangement}</strong>
              <div className="text-zinc-500 mt-1">Flexibility: {a.flexibility}</div>
              <div className="text-green-600 mt-1">Implementation: {a.implementation}</div>
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
              <div className="text-green-600 mt-1">Outcome: {b.outcome}</div>
            </div>
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
        <h3 className="font-medium mb-2">Implementation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {implementation.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Flexibility Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define flexibility options clearly. 2. Set eligibility criteria. 3. Establish expectations for each arrangement. 4. Provide necessary technology and equipment. 5. Train managers on flexibility management. 6. Set communication norms. 7. Monitor effectiveness regularly. 8. Address challenges promptly. 9. Ensure equitable access. 10. Adjust policies as needed. 11. Gather employee feedback. 12. Measure outcomes. Flexibility = competitive advantage. Multiple arrangements. Clear benefits. Challenges addressed. Manager training. Regular monitoring. Equitable access. Continuous improvement.
        </div>
      </div>
    </main>
  );
}