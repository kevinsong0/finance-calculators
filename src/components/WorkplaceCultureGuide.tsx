'use client'

export default function WorkplaceCultureGuide() {
  const elements = [
    { element: 'Values', desc: 'Core beliefs', importance: 'Foundation' },
    { element: 'Behaviors', desc: 'How people act', importance: 'Daily practice' },
    { element: 'Communication', desc: 'How information shared', importance: 'Connection' },
    { element: 'Leadership Style', desc: 'How leaders behave', importance: 'Direction' },
    { element: 'Recognition', desc: 'How achievements valued', importance: 'Motivation' },
    { element: 'Environment', desc: 'Physical/virtual space', importance: 'Context' },
  ];

  const types = [
    { type: 'Collaborative', traits: 'Team-focused, sharing', pros: 'Innovation, engagement' },
    { type: 'Competitive', traits: 'Results-driven, individual', pros: 'Performance, drive' },
    { type: 'Creative', traits: 'Innovation-focused, risk-taking', pros: 'New ideas, growth' },
    { type: 'Structured', traits: 'Process-focused, organized', pros: 'Consistency, efficiency' },
  ];

  const building = [
    'Define core values',
    'Model desired behaviors',
    'Communicate consistently',
    'Recognize aligned behavior',
    'Address misaligned behavior',
    'Train leaders',
    'Measure culture health',
    'Adjust and improve',
  ];

  const warningSigns = [
    'High turnover',
    'Low engagement scores',
    'Poor communication',
    'Negative gossip',
    'Fear of speaking up',
    'Lack of collaboration',
    'Resistance to change',
    'Absenteeism increase',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Culture Guide</h1>
      <p className="text-zinc-600">Culture elements, types, building, and warning signs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Culture Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">{e.desc}</div>
              <div className="text-green-600 mt-1">Importance: {e.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Culture Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Traits: {t.traits}</div>
              <div className="text-green-600 mt-1">Pros: {t.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Building Culture</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {building.map((b, i) => (
            <div key={b} className="bg-white rounded p-2">{i + 1}. {b}</div>
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
        <h3 className="font-medium mb-2">Culture Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define and document core values. 2. Ensure leaders model values. 3. Communicate values regularly. 4. Recognize values-aligned behavior. 5. Address behavior that contradicts values. 6. Hire people who fit culture. 7. Train on culture expectations. 8. Measure culture health regularly. 9. Survey employee perceptions. 10. Address warning signs early. 11. Evolve culture as needed. 12. Make culture part of strategy. Culture = shared values and behaviors. Define clearly. Model consistently. Recognize alignment. Address misalignment. Measure health. Evolve intentionally. Leadership drives culture."
        </div>
      </div>
    </main>
  );
}