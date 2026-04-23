'use client'

export default function HomeBuyingGuide() {
  const steps = [
    { step: 'Prepare', desc: 'Assess finances, credit score', action: 'Budget, improve credit' },
    { step: 'Research', desc: 'Market, neighborhoods', action: 'Visit areas, compare prices' },
    { step: 'Get Pre-approved', desc: 'Mortgage approval letter', action: 'Contact lenders, documents' },
    { step: 'Find Agent', desc: 'Real estate agent', action: 'Interview agents, check references' },
    { step: 'Search', desc: 'View homes, compare', action: 'Attend open houses, take notes' },
    { step: 'Make Offer', desc: 'Negotiate price, terms', action: 'Agent helps, include contingencies' },
    { step: 'Inspect', desc: 'Home inspection', action: 'Hire inspector, negotiate fixes' },
    { step: 'Close', desc: 'Final steps, signing', action: 'Documents, keys, move in' },
  ];

  const costs = [
    { cost: 'Down Payment', range: '3-20% of price', tip: 'Higher = lower mortgage' },
    { cost: 'Closing Costs', range: '2-5% of price', tip: 'Negotiate with seller' },
    { cost: 'Inspection', range: '$300-500', tip: 'Always inspect' },
    { cost: 'Moving', range: 'Variable', tip: 'Budget for moving' },
    { cost: 'First Payments', range: 'Mortgage + taxes', tip: 'Have reserves' },
  ];

  const tips = [
    'Start saving early',
    'Improve credit score',
    'Don&apos;t skip inspection',
    'Research neighborhood',
    'Compare mortgage rates',
    'Understand all costs',
    'Don&apos;t overextend budget',
    'Negotiate everything',
  ];

  const mistakes = [
    'Skipping pre-approval',
    'No inspection',
    'Overpaying',
    'Ignoring location',
    'No budget for repairs',
    'Emotional decisions',
    'Not comparing lenders',
    'Buying too big',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Home Buying Guide</h1>
      <p className="text-zinc-600">Steps, costs, tips, and common mistakes for home buying.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Buying Steps</h3>
        <div className="space-y-1 text-xs">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded p-2">
              <strong>{s.step}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Action: {s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Upfront Costs</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.cost} className="bg-white rounded p-2">
              <strong>{c.cost}</strong>: {c.range}
              <div className="text-zinc-500 mt-1">Tip: {c.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Buying Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
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
        <h3 className="font-medium mb-2">Home Buying Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess financial readiness. 2. Check credit score (620+ needed). 3. Calculate budget (price range). 4. Save for down payment + closing. 5. Research neighborhoods. 6. Get mortgage pre-approval. 7. Find experienced agent. 8. Start house search. 9. Make competitive offer. 10. Schedule inspection. 11. Negotiate repairs/price. 12. Final walk-through. 13. Close and move. Home buying = biggest purchase. Prepare thoroughly. Don&apos;t rush.
        </div>
      </div>
    </main>
  );
}