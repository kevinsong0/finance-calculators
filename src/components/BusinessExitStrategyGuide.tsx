'use client'

export default function BusinessExitStrategyGuide() {
  const options = [
    { option: 'Sale to third party', process: 'Find buyer, negotiate', benefit: 'Cash liquidity' },
    { option: 'Management buyout', process: 'Internal transfer', benefit: 'Legacy preservation' },
    { option: 'IPO', process: 'Public offering', benefit: 'Maximum value' },
    { option: 'Liquidation', process: 'Asset sale', benefit: 'Clean closure' },
  ];

  const phases = [
    'Assess exit readiness',
    'Determine exit objectives',
    'Evaluate exit options',
    'Prepare business for exit',
    'Engage advisors',
    'Structure exit transaction',
    'Negotiate terms',
    'Complete documentation',
    'Execute transaction',
    'Post-exit transition',
  ];

  const preparations = [
    { preparation: 'Financial cleanup', focus: 'Clean records', value: 'Credibility' },
    { preparation: 'Operational optimization', focus: 'Efficiency', value: 'Value enhancement' },
    { preparation: 'Legal compliance', focus: 'Risk mitigation', value: 'Deal readiness' },
    { preparation: 'Management continuity', focus: 'Succession planning', value: 'Stability' },
  ];

  const factors = [
    'Business value',
    'Market conditions',
    'Buyer availability',
    'Timing constraints',
    'Tax implications',
    'Legal requirements',
    'Management preferences',
    'Family considerations',
    'Employee impact',
    'Customer continuity',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Exit Strategy Guide</h1>
      <p className="text-zinc-600">Options, phases, preparations, and factors.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exit Options</h3>
        <div className="space-y-1 text-xs">
          {options.map((o) => (
            <div key={o.option} className="bg-white rounded p-2">
              <strong>{o.option}</strong>
              <div className="text-zinc-500 mt-1">Process: {o.process}</div>
              <div className="text-green-600 mt-1">Benefit: {o.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exit Phases</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {phases.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exit Preparations</h3>
        <div className="space-y-1 text-xs">
          {preparations.map((p) => (
            <div key={p.preparation} className="bg-white rounded p-2">
              <strong>{p.preparation}</strong>
              <div className="text-zinc-500 mt-1">Focus: {p.focus}</div>
              <div className="text-green-600 mt-1">Value: {p.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exit Strategy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess exit readiness honestly. 2. Determine exit objectives clearly. 3. Evaluate exit options thoroughly. 4. Prepare business properly. 5. Engage experienced advisors. 6. Structure transaction optimally. 7. Negotiate terms effectively. 8. Complete documentation accurately. 9. Execute transaction smoothly. 10. Manage post-exit transition carefully. Exit strategy = planned transition. Readiness assessed. Objectives determined. Options evaluated. Business prepared. Advisors engaged. Transaction structured. Terms negotiated. Documentation completed. Transaction executed. Transition managed.
        </div>
      </div>
    </main>
  );
}
