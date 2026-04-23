'use client'

export default function ContractNegotiationGuide() {
  const phases = [
    { phase: 'Preparation', desc: 'Research, set goals', action: 'Know objectives, alternatives' },
    { phase: 'Opening', desc: 'First offer, positions', action: 'Anchor favorably, listen' },
    { phase: 'Exploration', desc: 'Discuss needs, concerns', action: 'Understand their priorities' },
    { phase: 'Bargaining', desc: 'Trade-offs, compromises', action: 'Give/get, creative solutions' },
    { phase: 'Closing', desc: 'Agreement, documentation', action: 'Confirm terms, sign' },
  ];

  const tactics = [
    { tactic: 'Anchor', desc: 'Set first offer high/low', use: 'Shapes negotiation range' },
    { tactic: 'BATNA', desc: 'Best alternative to agreement', use: 'Know your backup plan' },
    { tactic: 'Silence', desc: 'Use pauses strategically', use: 'Encourage them to talk' },
    { tactic: 'Framing', desc: 'Present in favorable context', use: 'Influence perception' },
    { tactic: 'Package Deals', desc: 'Bundle multiple items', use: 'Create win-win trades' },
  ];

  const principles = [
    'Prepare thoroughly',
    'Know your BATNA',
    'Listen actively',
    'Focus on interests not positions',
    'Separate people from problem',
    'Create mutual gains',
    'Document agreements',
    'Build relationship',
  ];

  const mistakes = [
    'No preparation',
    'Revealing BATNA early',
    'Emotional reactions',
    'Win-lose mindset',
    'Accepting first offer',
    'Not documenting',
    'Ignoring relationship',
    'Poor communication',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contract Negotiation Guide</h1>
      <p className="text-zinc-600">Negotiation phases, tactics, principles, and common mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Action: {p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Tactics</h3>
        <div className="space-y-1 text-xs">
          {tactics.map((t) => (
            <div key={t.tactic} className="bg-white rounded p-2">
              <strong>{t.tactic}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Use: {t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research counterparty and context. 2. Define your objectives and limits. 3. Know your BATNA. 4. Plan opening offer. 5. Identify trade-offs available. 6. Prepare questions to ask. 7. Set negotiation team roles. 8. Document everything agreed. 9. Review contract carefully. 10. Build relationship for future. Negotiation = preparation + strategy + relationship. Win-win better than win-lose. Document all agreements."
        </div>
      </div>
    </main>
  );
}