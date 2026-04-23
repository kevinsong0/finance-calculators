'use client'

export default function WorkplaceStressManagementGuide() {
  const sources = [
    { source: 'Workload', impact: 'High', management: 'Prioritization, delegation' },
    { source: 'Deadlines', impact: 'Medium', management: 'Time management' },
    { source: 'Relationships', impact: 'Variable', management: 'Communication, conflict resolution' },
    { source: 'Change', impact: 'High', management: 'Adaptation strategies' },
    { source: 'Role clarity', impact: 'Medium', management: 'Clarification, feedback' },
    { source: 'Career concerns', impact: 'Variable', management: 'Development, support' },
  ];

  const symptoms = [
    'Physical fatigue',
    'Emotional exhaustion',
    'Cognitive difficulty',
    'Behavioral changes',
    'Sleep disruption',
    'Appetite changes',
    'Irritability',
    'Withdrawal',
  ];

  const techniques = [
    { technique: 'Time management', benefit: 'Control feeling', application: 'Prioritize, plan' },
    { technique: 'Breaks', benefit: 'Energy restoration', application: 'Regular pauses' },
    { technique: 'Exercise', benefit: 'Stress release', application: 'Regular physical activity' },
    { technique: 'Mindfulness', benefit: 'Present focus', application: 'Meditation, breathing' },
    { technique: 'Boundaries', benefit: 'Protection', application: 'Work limits' },
    { technique: 'Support seeking', benefit: 'Help accessed', application: 'Talk to others' },
  ];

  const organization = [
    'Reasonable workload',
    'Clear expectations',
    'Support resources',
    'Stress awareness training',
    'Open communication',
    'Manager support',
    'Flexible arrangements',
    'Wellness programs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Stress Management Guide</h1>
      <p className="text-zinc-600">Sources, symptoms, techniques, and organization support.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stress Sources</h3>
        <div className="space-y-1 text-xs">
          {sources.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong>{s.source}</strong>
              <div className="text-zinc-500 mt-1">Impact: {s.impact}</div>
              <div className="text-green-600 mt-1">Management: {s.management}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stress Symptoms</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {symptoms.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2 text-red-600">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Techniques</h3>
        <div className="space-y-1 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {t.benefit}</div>
              <div className="text-green-600 mt-1">Application: {t.application}</div>
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
        <h3 className="font-medium mb-2">Stress Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify stress sources. 2. Recognize symptoms early. 3. Use management techniques. 4. Practice time management. 5. Take regular breaks. 6. Exercise regularly. 7. Practice mindfulness. 8. Set work boundaries. 9. Seek support when needed. 10. Use organization resources. 11. Communicate concerns. 12. Monitor stress levels. Stress management = proactive approach. Sources identified. Symptoms watched. Techniques applied. Support accessed. Resources used. Levels monitored. Help sought. Balance maintained.
        </div>
      </div>
    </main>
  );
}