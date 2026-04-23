'use client'

export default function BusinessBenefitsDesignGuide() {
  const types = [
    { type: 'Health benefits', coverage: 'Medical, dental, vision', value: 'Health protection' },
    { type: 'Retirement benefits', coverage: '401k, pension', value: 'Future security' },
    { type: 'Time-off benefits', coverage: 'Vacation, sick, holidays', value: 'Work-life balance' },
    { type: 'Insurance benefits', coverage: 'Life, disability', value: 'Risk protection' },
    { type: 'Wellness benefits', coverage: 'Fitness, mental health', value: 'Employee wellbeing' },
    { type: 'Flexible benefits', coverage: 'Remote work, flex hours', value: 'Flexibility' },
  ];

  const process = [
    'Assess employee needs',
    'Benchmark market practices',
    'Define benefits philosophy',
    'Design benefits package',
    'Select benefit providers',
    'Set benefit costs',
    'Implement benefits programs',
    'Communicate benefits options',
    'Administer benefits plans',
    'Evaluate benefits effectiveness',
  ];

  const considerations = [
    { consideration: 'Cost management', factors: 'Budget, ROI', approach: 'Cost analysis' },
    { consideration: 'Employee preferences', factors: 'Demographics, needs', approach: 'Surveys' },
    { consideration: 'Legal requirements', factors: 'Mandates, compliance', approach: 'Legal review' },
    { consideration: 'Competitive positioning', factors: 'Market rates', approach: 'Benchmarking' },
  ];

  const trends = [
    'Flexible work arrangements',
    'Mental health support',
    'Student loan assistance',
    'Parental leave expansion',
    'Wellness programs',
    'Professional development',
    'Financial wellness',
    'Personalized benefits',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Benefits Design Guide</h1>
      <p className="text-zinc-600">Types, process, considerations, and trends.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Coverage: {t.coverage}</div>
              <div className="text-green-600 mt-1">Value: {t.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Factors: {c.factors}</div>
              <div className="text-green-600 mt-1">Approach: {c.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Trends</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {trends.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Design Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess employee needs thoroughly. 2. Benchmark market practices carefully. 3. Define benefits philosophy clearly. 4. Design comprehensive benefits package. 5. Select reliable benefit providers. 6. Set appropriate benefit costs. 7. Implement benefits programs effectively. 8. Communicate benefits options clearly. 9. Administer benefits plans properly. 10. Evaluate benefits effectiveness regularly. Benefits design = employee value proposition. Needs assessed. Practices benchmarked. Philosophy defined. Package designed. Providers selected. Costs set. Programs implemented. Options communicated. Plans administered. Effectiveness evaluated.
        </div>
      </div>
    </main>
  );
}