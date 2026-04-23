'use client'

export default function BusinessExternalCommunicationGuide() {
  const types = [
    { type: 'Marketing communication', audience: 'Customers', purpose: 'Brand building' },
    { type: 'Public relations', audience: 'Media, public', purpose: 'Reputation' },
    { type: 'Investor relations', audience: 'Shareholders', purpose: 'Trust building' },
    { type: 'Customer service', audience: 'Clients', purpose: 'Support' },
    { type: 'Partner communication', audience: 'Business partners', purpose: 'Collaboration' },
    { type: 'Regulatory communication', audience: 'Authorities', purpose: 'Compliance' },
  ];

  const channels = [
    'Website',
    'Social media',
    'Email campaigns',
    'Press releases',
    'Annual reports',
    'Customer portals',
    'Media interviews',
    'Events and conferences',
    'Advertising',
    'Direct mail',
  ];

  const principles = [
    { principle: 'Consistency', application: 'Message alignment', benefit: 'Brand coherence' },
    { principle: 'Transparency', application: 'Open disclosure', benefit: 'Trust building' },
    { principle: 'Relevance', application: 'Targeted content', benefit: 'Engagement' },
    { principle: 'Timeliness', application: 'Prompt response', benefit: 'Responsiveness' },
  ];

  const metrics = [
    'Brand awareness',
    'Media coverage',
    'Customer engagement',
    'Response rate',
    'Message reach',
    'Audience sentiment',
    'Conversion rate',
    'Communication ROI',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business External Communication Guide</h1>
      <p className="text-zinc-600">Types, channels, principles, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Audience: {t.audience}</div>
              <div className="text-green-600 mt-1">Purpose: {t.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Channels</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {channels.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Guiding Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">Application: {p.application}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
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
        <h3 className="font-medium mb-2">External Communication Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define communication strategy clearly. 2. Select appropriate channels wisely. 3. Craft engaging messages effectively. 4. Target audiences precisely. 5. Maintain brand consistency. 6. Ensure transparency always. 7. Respond timely to inquiries. 8. Monitor audience sentiment regularly. 9. Measure communication impact accurately. 10. Adjust strategies based on results. External communication = brand reputation. Strategy defined. Channels selected. Messages crafted. Audiences targeted. Consistency maintained. Transparency ensured. Responses timely. Sentiment monitored. Impact measured. Strategies adjusted.
        </div>
      </div>
    </main>
  );
}