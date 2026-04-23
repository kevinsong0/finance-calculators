'use client'

export default function BusinessMarketAnalysisGuide() {
  const methods = [
    { method: 'Market sizing', purpose: 'Determine market potential', output: 'Revenue opportunity' },
    { method: 'Competitive analysis', purpose: 'Assess competition', output: 'Positioning insights' },
    { method: 'Customer analysis', purpose: 'Understand customers', output: 'Target segments' },
    { method: 'Trend analysis', purpose: 'Identify trends', output: 'Strategic direction' },
  ];

  const elements = [
    'Market definition',
    'Market size estimation',
    'Market segmentation',
    'Competitive landscape',
    'Customer demographics',
    'Customer behavior',
    'Market trends',
    'Market growth',
  ];

  const sources = [
    'Industry reports',
    'Government data',
    'Company filings',
    'Trade publications',
    'Customer surveys',
    'Social media',
    'Competitor websites',
    'Market databases',
  ];

  const outputs = [
    'Market overview',
    'Size and growth',
    'Segment profiles',
    'Competitive map',
    'Customer insights',
    'Trend analysis',
    'Opportunity assessment',
    'Risk analysis',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Market Analysis Guide</h1>
      <p className="text-zinc-600">Methods, elements, sources, and outputs.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="space-y-1 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {m.purpose}</div>
              <div className="text-green-600 mt-1">Output: {m.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {elements.map((e, idx) => (
            <div key={e} className="bg-white rounded p-2">{idx + 1}. {e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Sources</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {sources.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Outputs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outputs.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Market Analysis Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define market scope. 2. Estimate market size. 3. Segment market. 4. Analyze competition. 5. Profile customers. 6. Identify trends. 7. Assess opportunities. 8. Analyze risks. 9. Develop strategy. 10. Monitor changes. Market analysis = strategic foundation. Scope defined. Size estimated. Market segmented. Competition analyzed. Customers profiled. Trends identified. Opportunities assessed. Risks analyzed. Strategy developed. Changes monitored.
        </div>
      </div>
    </main>
  );
}
