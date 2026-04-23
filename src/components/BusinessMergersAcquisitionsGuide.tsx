'use client'

export default function BusinessMergersAcquisitionsGuide() {
  const types = [
    { type: 'Horizontal merger', definition: 'Same industry competitors', purpose: 'Market share' },
    { type: 'Vertical merger', definition: 'Supply chain integration', purpose: 'Control efficiency' },
    { type: 'Conglomerate merger', definition: 'Different industries', purpose: 'Diversification' },
    { type: 'Acquisition', definition: 'One company buys another', purpose: 'Growth acceleration' },
  ];

  const phases = [
    'Strategy development',
    'Target identification',
    'Due diligence',
    'Valuation analysis',
    'Negotiation process',
    'Deal structuring',
    'Financing arrangement',
    'Legal documentation',
    'Integration planning',
    'Post-merger integration',
  ];

  const considerations = [
    { consideration: 'Strategic fit', analysis: 'Business alignment', importance: 'Critical' },
    { consideration: 'Financial impact', analysis: 'Value creation', importance: 'Critical' },
    { consideration: 'Cultural compatibility', analysis: 'Organization fit', importance: 'High' },
    { consideration: 'Regulatory compliance', analysis: 'Legal requirements', importance: 'High' },
  ];

  const risks = [
    'Overpayment risk',
    'Integration failure',
    'Cultural clash',
    'Synergy shortfall',
    'Regulatory rejection',
    'Financing difficulty',
    'Key talent loss',
    'Customer attrition',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Mergers and Acquisitions Guide</h1>
      <p className="text-zinc-600">Types, phases, considerations, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">M&A Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Definition: {t.definition}</div>
              <div className="text-green-600 mt-1">Purpose: {t.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">M&A Phases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {phases.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.consideration} className="bg-white rounded p-2">
              <strong>{c.consideration}</strong>
              <div className="text-zinc-500 mt-1">Analysis: {c.analysis}</div>
              <div className="text-green-600 mt-1">Importance: {c.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">M&A Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Develop M&A strategy clearly. 2. Identify targets systematically. 3. Conduct due diligence thoroughly. 4. Perform valuation analysis accurately. 5. Negotiate terms effectively. 6. Structure deal optimally. 7. Arrange financing appropriately. 8. Complete legal documentation properly. 9. Plan integration carefully. 10. Execute post-merger integration smoothly. M&A = strategic growth. Strategy developed. Targets identified. Diligence conducted. Valuation performed. Terms negotiated. Deal structured. Financing arranged. Documentation completed. Integration planned. Execution completed.
        </div>
      </div>
    </main>
  );
}
