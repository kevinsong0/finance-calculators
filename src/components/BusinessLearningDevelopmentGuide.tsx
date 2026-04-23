'use client'

export default function BusinessLearningDevelopmentGuide() {
  const types = [
    { type: 'Formal training', method: 'Structured courses', outcome: 'Certification' },
    { type: 'On-the-job learning', method: 'Work experience', outcome: 'Practical skills' },
    { type: 'Mentoring', method: 'Expert guidance', outcome: 'Knowledge transfer' },
    { type: 'Coaching', method: 'Personal development', outcome: 'Performance improvement' },
    { type: 'E-learning', method: 'Digital platforms', outcome: 'Flexible access' },
    { type: 'Workshops', method: 'Interactive sessions', outcome: 'Team skills' },
  ];

  const process = [
    'Identify learning needs',
    'Define learning objectives',
    'Design learning programs',
    'Select learning methods',
    'Develop learning content',
    'Deliver learning experiences',
    'Support learning transfer',
    'Assess learning outcomes',
    'Evaluate program effectiveness',
    'Improve learning initiatives',
  ];

  const approaches = [
    { approach: 'Blended learning', combination: 'Online + offline', benefit: 'Flexibility' },
    { approach: 'Microlearning', combination: 'Short modules', benefit: 'Retention' },
    { approach: 'Social learning', combination: 'Peer interaction', benefit: 'Collaboration' },
    { approach: 'Experiential learning', combination: 'Real projects', benefit: 'Application' },
  ];

  const metrics = [
    'Training completion rate',
    'Learning assessment scores',
    'Skill application rate',
    'Performance improvement',
    'Knowledge retention',
    'Employee engagement',
    'Training ROI',
    'Time to proficiency',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Learning & Development Guide</h1>
      <p className="text-zinc-600">Types, process, approaches, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Learning Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Method: {t.method}</div>
              <div className="text-green-600 mt-1">Outcome: {t.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Development Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Learning Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">Combination: {a.combination}</div>
              <div className="text-green-600 mt-1">Benefit: {a.benefit}</div>
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
        <h3 className="font-medium mb-2">Learning Development Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify learning needs systematically. 2. Define clear learning objectives. 3. Design comprehensive learning programs. 4. Select appropriate learning methods. 5. Develop engaging learning content. 6. Deliver quality learning experiences. 7. Support effective learning transfer. 8. Assess learning outcomes thoroughly. 9. Evaluate program effectiveness honestly. 10. Improve learning initiatives continuously. Learning development = organizational growth. Needs identified. Objectives defined. Programs designed. Methods selected. Content developed. Experiences delivered. Transfer supported. Outcomes assessed. Effectiveness evaluated. Initiatives improved.
        </div>
      </div>
    </main>
  );
}