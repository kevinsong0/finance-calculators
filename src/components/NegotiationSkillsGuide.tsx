'use client'

export default function NegotiationSkillsGuide() {
  const phases = [
    { phase: 'Preparation', desc: 'Research, define goals, understand other party', tips: 'Know your BATNA' },
    { phase: 'Opening', desc: 'Set tone, establish rapport', tips: 'Listen actively, ask questions' },
    { phase: 'Exploration', desc: 'Understand interests, not positions', tips: 'Find common ground' },
    { phase: 'Bargaining', desc: 'Exchange offers, make concessions', tips: 'Give to get, stay principled' },
    { phase: 'Closing', desc: 'Agree terms, confirm commitment', tips: 'Document everything' },
  ];

  const tactics = [
    { tactic: 'Anchor First', desc: 'Set initial offer to frame range' },
    { tactic: 'BATNA', desc: 'Best Alternative if negotiation fails' },
    { tactic: 'Silence', desc: 'Pause to let other party respond' },
    { tactic: 'Good Cop/Bad Cop', desc: 'Use carefully, can backfire' },
    { tactic: 'Time Pressure', desc: 'Deadlines create urgency' },
    { tactic: 'Incremental Concessions', desc: 'Small moves show flexibility' },
  ];

  const mistakes = [
    { mistake: 'No preparation', fix: 'Research thoroughly before meeting' },
    { mistake: 'Accepting first offer', fix: 'Counter, even if offer is reasonable' },
    { mistake: 'Emotional reactions', fix: 'Stay calm, focus on objective' },
    { mistake: 'Revealing BATNA', fix: 'Keep alternatives private' },
    { mistake: 'Win-lose mindset', fix: 'Seek win-win solutions' },
    { mistake: 'Talking too much', fix: 'Listen more, ask questions' },
  ];

  const salaryTips = [
    'Research market rate beforehand',
    'Wait for offer before negotiating',
    'Anchor with specific number (not range)',
    'Negotiate total package (not just salary)',
    'Get offer in writing',
    'Practice salary conversation',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Negotiation Skills Guide</h1>
      <p className="text-zinc-600">Negotiation phases, tactics, mistakes, and salary negotiation tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Phases</h3>
        <div className="space-y-1 text-xs">
          {phases.map((p) => (
            <div key={p.phase} className="bg-white rounded p-2">
              <strong>{p.phase}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Tips: {p.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Tactics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tactics.map((t) => (
            <div key={t.tactic} className="bg-white rounded p-2">
              <strong>{t.tactic}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="space-y-1 text-xs">
          {mistakes.map((m) => (
            <div key={m.mistake} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{m.mistake}</strong>
              <div className="text-green-600 mt-1">Fix: {m.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Salary Negotiation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {salaryTips.map((s) => (
            <div key={s} className="bg-green-50 rounded p-2 text-green-600">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research thoroughly (market rates, other party). 2. Define goals (what you want, what you&apos;ll accept). 3. Know BATNA (your alternative). 4. Practice key points. 5. Listen actively (understand interests). 6. Stay calm (emotions hurt outcomes). 7. Seek win-win (value for both). 8. Document agreement. 9. Follow up. 10. Review for improvement. Negotiation = preparation + patience + principle.
        </div>
      </div>
    </main>
  );
}