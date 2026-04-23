'use client'

export default function EmployeeWorkLifeBalanceGuide() {
  const elements = [
    { element: 'Time management', importance: 'Foundation', tips: 'Prioritize, schedule' },
    { element: 'Boundary setting', importance: 'Essential', tips: 'Clear limits defined' },
    { element: 'Flexibility', importance: 'Important', tips: 'Adapt to needs' },
    { element: 'Self-care', importance: 'Vital', tips: 'Physical, mental health' },
    { element: 'Support systems', importance: 'Helpful', tips: 'Family, friends, resources' },
    { element: 'Organization support', importance: 'Needed', tips: 'Policy, culture' },
  ];

  const signs = [
    'Constant overtime',
    'Neglecting personal life',
    'Chronic stress symptoms',
    'Health neglect',
    'Relationship strain',
    'No leisure time',
    'Sleep problems',
    'Burnout indicators',
  ];

  const strategies = [
    { strategy: 'Set boundaries', application: 'Work hours defined', outcome: 'Protected time' },
    { strategy: 'Prioritize tasks', application: 'Focus on essentials', outcome: 'Efficiency' },
    { strategy: 'Take breaks', application: 'Regular pauses', outcome: 'Energy maintained' },
    { strategy: 'Use flexibility', application: 'Adjust schedule', outcome: 'Balance achieved' },
    { strategy: 'Disconnect', application: 'Time away from work', outcome: 'Rest recovery' },
    { strategy: 'Practice self-care', application: 'Health focus', outcome: 'Well-being' },
  ];

  const organization = [
    'Flexible work policies',
    'Reasonable workload',
    'Clear expectations',
    'Supportive culture',
    'Resources available',
    'Manager understanding',
    'PTO encouragement',
    'Wellness programs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Work-Life Balance Guide</h1>
      <p className="text-zinc-600">Elements, warning signs, strategies, and organization support.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Balance Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Importance: {e.importance}</div>
              <div className="text-green-600 mt-1">Tips: {e.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Warning Signs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {signs.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2 text-red-600">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Balance Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Application: {s.application}</div>
              <div className="text-green-600 mt-1">Outcome: {s.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Organization Support</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {organization.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Work-Life Balance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear work boundaries. 2. Prioritize tasks effectively. 3. Take regular breaks. 4. Use flexible arrangements. 5. Disconnect after work. 6. Practice self-care. 7. Maintain personal relationships. 8. Pursue hobbies and interests. 9. Get adequate sleep. 10. Watch for warning signs. 11. Ask for help when needed. 12. Review balance regularly. Work-life balance = intentional effort. Clear boundaries. Effective prioritization. Regular breaks. Flexibility used. Self-care practiced. Relationships maintained. Warning signs watched. Support sought.
        </div>
      </div>
    </main>
  );
}