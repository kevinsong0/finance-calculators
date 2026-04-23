'use client'

export default function BusinessFeedbackSystemsGuide() {
  const types = [
    { type: 'Upward feedback', source: 'Employees to managers', benefit: 'Leadership improvement' },
    { type: 'Downward feedback', source: 'Managers to employees', benefit: 'Performance guidance' },
    { type: 'Peer feedback', source: 'Colleagues', benefit: 'Team collaboration' },
    { type: 'Customer feedback', source: 'Clients and users', benefit: 'Service quality' },
    { type: 'Self-feedback', source: 'Personal reflection', benefit: 'Self-awareness' },
    { type: '360-degree feedback', source: 'Multiple sources', benefit: 'Comprehensive view' },
  ];

  const components = [
    'Feedback mechanisms',
    'Feedback channels',
    'Feedback frequency',
    'Feedback training',
    'Feedback culture',
    'Feedback follow-up',
    'Feedback documentation',
    'Feedback integration',
    'Feedback metrics',
    'Feedback improvement',
  ];

  const practices = [
    { practice: 'Timely delivery', principle: 'Close to event', outcome: 'Relevance' },
    { practice: 'Specific content', principle: 'Concrete examples', outcome: 'Actionability' },
    { practice: 'Balanced approach', principle: 'Positive and constructive', outcome: 'Acceptance' },
    { practice: 'Private setting', principle: 'Confidential delivery', outcome: 'Trust' },
  ];

  const barriers = [
    'Fear of confrontation',
    'Lack of training',
    'Cultural resistance',
    'Time constraints',
    'Inadequate systems',
    'Poor follow-up',
    'Negative experiences',
    'Unclear expectations',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Feedback Systems Guide</h1>
      <p className="text-zinc-600">Types, components, practices, and barriers.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Source: {t.source}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">System Components</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {components.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">Principle: {p.principle}</div>
              <div className="text-green-600 mt-1">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Barriers</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {barriers.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Feedback Systems Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish multiple feedback mechanisms. 2. Create appropriate feedback channels. 3. Define feedback frequency guidelines. 4. Provide comprehensive feedback training. 5. Build strong feedback culture. 6. Ensure consistent feedback follow-up. 7. Maintain proper feedback documentation. 8. Integrate feedback with systems. 9. Track feedback metrics regularly. 10. Continuously improve feedback process. Feedback systems = organizational learning. Mechanisms established. Channels created. Frequency defined. Training provided. Culture built. Follow-up ensured. Documentation maintained. Integration complete. Metrics tracked. Process improved.
        </div>
      </div>
    </main>
  );
}