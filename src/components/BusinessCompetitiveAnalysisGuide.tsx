'use client'

export default function BusinessCompetitiveAnalysisGuide() {
  const aspects = [
    { aspect: 'Market share', data: 'Competitor size', insight: 'Market position' },
    { aspect: 'Product features', data: 'Offering comparison', insight: 'Differentiation' },
    { aspect: 'Pricing strategy', data: 'Price positioning', insight: 'Value perception' },
    { aspect: 'Distribution channels', data: 'Channel coverage', insight: 'Market reach' },
    { aspect: 'Marketing approach', data: 'Promotion methods', insight: 'Brand strategy' },
    { aspect: 'Financial strength', data: 'Resources available', insight: 'Competitive power' },
  ];

  const methods = [
    'Direct observation',
    'Industry reports',
    'Customer feedback',
    'Financial analysis',
    'Product testing',
    'Website analysis',
    'Social media monitoring',
    'Employee interviews',
  ];

  const framework = [
    { element: 'Strengths', type: 'Internal positive', action: 'Leverage advantages' },
    { element: 'Weaknesses', type: 'Internal negative', action: 'Address gaps' },
    { element: 'Opportunities', type: 'External positive', action: 'Capture potential' },
    { element: 'Threats', type: 'External negative', action: 'Mitigate risks' },
  ];

  const strategies = [
    'Direct competition',
    'Differentiation focus',
    'Niche specialization',
    'Cost leadership',
    'Quality emphasis',
    'Service excellence',
    'Innovation leadership',
    'Brand building',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Competitive Analysis Guide</h1>
      <p className="text-zinc-600">Aspects, methods, framework, and strategies.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Aspects</h3>
        <div className="space-y-1 text-xs">
          {aspects.map((a) => (
            <div key={a.aspect} className="bg-white rounded p-2">
              <strong>{a.aspect}</strong>
              <div className="text-zinc-500 mt-1">Data: {a.data}</div>
              <div className="text-green-600 mt-1">Insight: {a.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Research Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SWOT Framework</h3>
        <div className="space-y-1 text-xs">
          {framework.map((f) => (
            <div key={f.element} className="bg-white rounded p-2">
              <strong>{f.element}</strong>
              <div className="text-zinc-500 mt-1">Type: {f.type}</div>
              <div className="text-green-600 mt-1">Action: {f.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Competitive Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Competitive Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify key competitors. 2. Analyze market share data. 3. Compare product features. 4. Evaluate pricing strategies. 5. Review distribution channels. 6. Assess marketing approaches. 7. Analyze financial strength. 8. Conduct SWOT analysis. 9. Identify competitive advantages. 10. Formulate competitive strategy. Competitive analysis = strategic positioning. Competitors identified. Share analyzed. Features compared. Pricing evaluated. Channels reviewed. Marketing assessed. Strength analyzed. SWOT completed. Advantages identified. Strategy formulated.
        </div>
      </div>
    </main>
  );
}