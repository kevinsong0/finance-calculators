'use client'

export default function BusinessContractNegotiationGuide() {
  const phases = [
    { phase: 'Preparation', activities: 'Research, objectives, team', outcome: 'Ready position' },
    { phase: 'Opening', activities: 'Initial offer, terms review', outcome: 'Start position' },
    { phase: 'Negotiation', activities: 'Counter offers, concessions', outcome: 'Agreement draft' },
    { phase: 'Closing', activities: 'Final terms, signatures', outcome: 'Signed contract' },
  ];

  const tactics = [
    'Anchor high pricing',
    'Bundle multiple terms',
    'Use time pressure',
    'Offer alternatives',
    'Create walkaway options',
    'Highlight mutual benefits',
    'Address objections',
    'Propose creative solutions',
  ];

  const elements = [
    { element: 'Price terms', description: 'Payment amounts, schedule', importance: 'Critical' },
    { element: 'Scope definition', description: 'Deliverables, boundaries', importance: 'Critical' },
    { element: 'Timeline', description: 'Deadlines, milestones', importance: 'High' },
    { element: 'Risk allocation', description: 'Liabilities, warranties', importance: 'High' },
  ];

  const outcomes = [
    'Win-win agreement',
    'Cost savings achieved',
    'Risk mitigation secured',
    'Relationship strengthened',
    'Clear deliverables defined',
    'Compliance ensured',
    'Dispute resolution set',
    'Renewal terms agreed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Contract Negotiation Guide</h1>
      <p className="text-zinc-600">Phases, tactics, elements, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">Activities: {p.activities}</div>
              <div className="text-green-600 mt-1">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Tactics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tactics.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Description: {e.description}</div>
              <div className="text-green-600 mt-1">Importance: {e.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Desired Outcomes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outcomes.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Negotiation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Prepare thoroughly before negotiation. 2. Set clear objectives and boundaries. 3. Research counterpart position. 4. Build negotiation team. 5. Present initial offer strategically. 6. Review terms carefully. 7. Counter offer effectively. 8. Make concessions wisely. 9. Address objections professionally. 10. Close with clear terms. Contract negotiation = favorable terms. Preparation complete. Objectives set. Research done. Team built. Offer presented. Terms reviewed. Counter offered. Concessions made. Objections addressed. Contract closed.
        </div>
      </div>
    </main>
  );
}