'use client'

export default function BusinessOrganizationCultureGuide() {
  const elements = [
    { element: 'Values', definition: 'Core beliefs', manifestation: 'Behavioral norms' },
    { element: 'Mission', definition: 'Purpose statement', manifestation: 'Strategic direction' },
    { element: 'Vision', definition: 'Future aspiration', manifestation: 'Goal alignment' },
    { element: 'Norms', definition: 'Behavioral expectations', manifestation: 'Daily practices' },
    { element: 'Symbols', definition: 'Visual identity', manifestation: 'Physical environment' },
    { element: 'Rituals', definition: 'Recurring events', manifestation: 'Team cohesion' },
  ];

  const types = [
    'Hierarchical culture',
    'Collaborative culture',
    'Competitive culture',
    'Creative culture',
    'Customer-focused culture',
    'Result-oriented culture',
    'People-oriented culture',
    'Process-driven culture',
  ];

  const building = [
    'Define desired culture',
    'Assess current culture',
    'Identify culture gaps',
    'Develop culture strategy',
    'Communicate culture vision',
    'Align systems and policies',
    'Train culture behaviors',
    'Model culture leadership',
    'Reinforce culture norms',
    'Measure culture progress',
  ];

  const indicators = [
    { indicator: 'Employee engagement', measure: 'Survey scores', interpretation: 'Commitment level' },
    { indicator: 'Retention rates', measure: 'Turnover data', interpretation: 'Culture fit' },
    { indicator: 'Performance quality', measure: 'Work output', interpretation: 'Culture impact' },
    { indicator: 'Communication style', measure: 'Interaction patterns', interpretation: 'Culture expression' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Organization Culture Guide</h1>
      <p className="text-zinc-600">Elements, types, building strategies, and indicators.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Culture Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Definition: {e.definition}</div>
              <div className="text-green-600 mt-1">Manifestation: {e.manifestation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Culture Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {types.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Building Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {building.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Health Indicators</h3>
        <div className="space-y-1 text-xs">
          {indicators.map((i) => (
            <div key={i.indicator} className="bg-white rounded p-2">
              <strong>{i.indicator}</strong>
              <div className="text-zinc-500 mt-1">Measure: {i.measure}</div>
              <div className="text-green-600 mt-1">Interpretation: {i.interpretation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Organization Culture Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define desired culture clearly. 2. Assess current culture honestly. 3. Identify culture gaps accurately. 4. Develop comprehensive culture strategy. 5. Communicate culture vision effectively. 6. Align all systems and policies. 7. Train culture behaviors consistently. 8. Model culture leadership visibly. 9. Reinforce culture norms regularly. 10. Measure culture progress continuously. Organization culture = competitive advantage. Culture defined. Current assessed. Gaps identified. Strategy developed. Vision communicated. Systems aligned. Behaviors trained. Leadership modeled. Norms reinforced. Progress measured.
        </div>
      </div>
    </main>
  );
}