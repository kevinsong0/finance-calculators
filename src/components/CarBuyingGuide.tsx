'use client'

export default function CarBuyingGuide() {
  const steps = [
    { step: 'Budget', desc: 'Set total budget', action: 'Include insurance, maintenance' },
    { step: 'Research', desc: 'Models, prices, reviews', action: 'Compare options, reliability' },
    { step: 'New vs Used', desc: 'Decide which', action: 'Consider depreciation, warranty' },
    { step: 'Test Drive', desc: 'Drive candidates', action: 'Feel car, check features' },
    { step: 'Inspect', desc: 'Professional check (used)', action: 'Mechanic inspection' },
    { step: 'Negotiate', desc: 'Price, terms', action: 'Research fair price, negotiate' },
    { step: 'Finance', desc: 'Loan or cash', action: 'Compare rates, total cost' },
    { step: 'Close', desc: 'Documents, payment', action: 'Review all papers, understand terms' },
  ];

  const costs = [
    { cost: 'Purchase Price', tip: 'Negotiate down from MSRP' },
    { cost: 'Sales Tax', tip: 'State-specific, budget for it' },
    { cost: 'Registration/Title', tip: 'State fees, one-time' },
    { cost: 'Insurance', tip: 'Get quotes before buying' },
    { cost: 'Maintenance', tip: 'Budget ongoing (1-2% value/year)' },
    { cost: 'Depreciation', tip: 'New cars lose 20% first year' },
  ];

  const newVsUsed = [
    { choice: 'New', pros: 'Warranty, latest tech, no history', cons: 'Depreciation, higher price' },
    { choice: 'Used', pros: 'Lower price, less depreciation', cons: 'No/limited warranty, history unknown' },
    { choice: 'Certified Used', pros: 'Warranty, inspected', cons: 'Higher than regular used' },
  ];

  const tips = [
    'Don&apos;t rush decision',
    'Research fair price',
    'Check reliability ratings',
    'Test drive multiple',
    'Get mechanic inspection (used)',
    'Negotiate everything',
    'Compare loan rates',
    'Consider total cost of ownership',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Car Buying Guide</h1>
      <p className="text-zinc-600">Steps, costs, new vs used, and tips for car buying.</p>

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
        <h3 className="font-medium mb-2">Ownership Costs</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.cost} className="bg-white rounded p-2">
              <strong>{c.cost}</strong>
              <div className="text-zinc-500 mt-1">Tip: {c.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">New vs Used</h3>
        <div className="space-y-1 text-xs">
          {newVsUsed.map((n) => (
            <div key={n.choice} className="bg-white rounded p-2">
              <strong>{n.choice}</strong>
              <div className="text-green-600 mt-1">Pros: {n.pros}</div>
              <div className="text-red-600">Cons: {n.cons}</div>
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
        <h3 className="font-medium mb-2">Car Buying Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set total budget. 2. Research models. 3. Check reliability ratings. 4. Compare new vs used. 5. Get insurance quotes. 6. Research fair price (Edmunds/KBB). 7. Test drive candidates. 8. Mechanic inspection (used). 9. Negotiate price. 10. Compare financing options. 11. Review all documents. 12. Understand warranty. 13. Plan maintenance. Car = major purchase. Research, negotiate, understand costs.
        </div>
      </div>
    </main>
  );
}