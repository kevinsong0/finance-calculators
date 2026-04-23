'use client'

export default function StartupFundingGuide() {
  const stages = [
    { stage: 'Pre-Seed', amount: '$10K-100K', desc: 'Personal savings, friends/family', use: 'Validate idea, prototype' },
    { stage: 'Seed', amount: '$100K-1M', desc: 'Angel investors, early VCs', use: 'Product development, initial team' },
    { stage: 'Series A', amount: '$1M-10M', desc: 'VCs for proven model', use: 'Scale product, grow team' },
    { stage: 'Series B', amount: '$10M-50M', desc: 'Expansion funding', use: 'Market expansion, growth' },
    { stage: 'Series C+', amount: '$50M+', desc: 'Late-stage VCs, PE', use: 'Major expansion, IPO prep' },
  ];

  const sources = [
    { source: 'Bootstrapping', pros: 'Full control, no dilution', cons: 'Limited capital, slower growth' },
    { source: 'Angel Investors', pros: 'Mentorship, flexible', cons: 'Smaller amounts, personal relationship' },
    { source: 'Venture Capital', pros: 'Large amounts, network', cons: 'Dilution, pressure, milestones' },
    { source: 'Crowdfunding', pros: 'Public validation, marketing', cons: 'Public disclosure, execution pressure' },
    { source: 'Bank Loans', pros: 'No equity loss', cons: 'Personal risk, interest, requirements' },
  ];

  const preparation = [
    'Pitch deck (10-15 slides)',
    'Business plan/financials',
    'Market research',
    'Product demo/MVP',
    'Team backgrounds',
    'Use of funds clear',
    'Valuation rationale',
    'Traction metrics',
  ];

  const tips = [
    'Bootstrap as long as possible',
    'Understand valuation terms',
    'Research investor focus areas',
    'Network before needing funding',
    'Prepare thoroughly before pitching',
    'Negotiate terms carefully',
    'Build relationships long-term',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Startup Funding Guide</h1>
      <p className="text-zinc-600">Funding stages, sources, preparation, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Funding Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong> ({s.amount})
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Use: {s.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Funding Sources</h3>
        <div className="space-y-1 text-xs">
          {sources.map((s) => (
            <div key={s.source} className="bg-white rounded p-2">
              <strong>{s.source}</strong>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
              <div className="text-red-600">Cons: {s.cons}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Preparation Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {preparation.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Funding Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Funding Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Validate idea before seeking funding. 2. Bootstrap to build traction. 3. Research funding stages. 4. Identify right investors. 5. Prepare materials thoroughly. 6. Practice pitch multiple times. 7. Understand terms before signing. 8. Negotiate carefully. 9. Build long-term relationships. 10. Use funding for growth, not survival. Funding = accelerator, not foundation.
        </div>
      </div>
    </main>
  );
}