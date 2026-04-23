'use client'

export default function PerformanceFeedbackGuide() {
  const types = [
    { type: 'Positive Feedback', desc: 'Recognize achievements', frequency: 'Ongoing' },
    { type: 'Constructive Feedback', desc: 'Improve performance', frequency: 'As needed' },
    { type: 'Developmental Feedback', desc: 'Build skills', frequency: 'Regular' },
    { type: 'Corrective Feedback', desc: 'Address issues', frequency: 'When problems occur' },
  ];

  const structure = [
    { element: 'Context', desc: 'Describe situation', example: 'When you presented...' },
    { element: 'Observation', desc: 'Specific behavior', example: 'You explained clearly...' },
    { element: 'Impact', desc: 'Result of behavior', example: 'Team understood goals...' },
    { element: 'Next step', desc: 'Continue or change', example: 'Keep doing this...' },
  ];

  const delivery = [
    'Private setting',
    'Timely (soon after event)',
    'Specific not vague',
    'Focus on behavior',
    'Avoid personal attacks',
    'Listen to response',
    'Offer support',
    'Follow up later',
  ];

  const timing = [
    { timing: 'Immediate', use: 'Significant events', importance: 'High' },
    { timing: 'Regular meetings', use: 'Ongoing feedback', importance: 'Standard' },
    { timing: 'Performance reviews', use: 'Formal assessment', importance: 'Periodic' },
    { timing: 'Project milestones', use: 'Project-specific', importance: 'Event-based' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Performance Feedback Guide</h1>
      <p className="text-zinc-600">Feedback types, structure, delivery, and timing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Frequency: {t.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Structure (COIN)</h3>
        <div className="space-y-1 text-xs">
          {structure.map((s) => (
            <div key={s.element} className="bg-white rounded p-2">
              <strong>{s.element}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Example: {s.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Delivery Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {delivery.map((d) => (
            <div key={d} className="bg-white rounded p-2">{d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Timing</h3>
        <div className="space-y-1 text-xs">
          {timing.map((t) => (
            <div key={t.timing} className="bg-white rounded p-2">
              <strong>{t.timing}</strong>
              <div className="text-zinc-500 mt-1">Use: {t.use}</div>
              <div className="text-green-600 mt-1">Importance: {t.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate setting. 2. Be specific about behavior. 3. Explain impact clearly. 4. Offer actionable suggestions. 5. Listen to employee response. 6. Document feedback given. 7. Follow up on progress. 8. Balance positive and constructive. 9. Give feedback regularly. 10. Match timing to significance. 11. Support improvement efforts. 12. Recognize progress made. Feedback = development tool. Be specific. Explain impact. Offer solutions. Listen actively. Follow up. Balance positive and constructive. Regular feedback better than occasional."
        </div>
      </div>
    </main>
  );
}