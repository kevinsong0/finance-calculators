'use client'

export default function WeddingBudgetGuide() {
  const categories = [
    { category: 'Venue', pct: '30-40%', tip: 'Negotiate, consider off-season' },
    { category: 'Catering', pct: '20-25%', tip: 'Per-head cost, options matter' },
    { category: 'Photography', pct: '10-15%', tip: 'Research portfolios, packages' },
    { category: 'Attire', pct: '5-10%', tip: 'Bride + groom, consider rental' },
    { category: 'Music/Entertainment', pct: '5-10%', tip: 'Band vs DJ, ceremony + reception' },
    { category: 'Flowers/Decor', pct: '5-10%', tip: 'Prioritize key pieces, DIY options' },
    { category: 'Miscellaneous', pct: '10-15%', tip: 'Invitations, gifts, transportation' },
  ];

  const tips = [
    'Set total budget first',
    'Prioritize what matters most',
    'Negotiate with vendors',
    'Consider off-season date',
    'DIY where skills permit',
    'Limit guest count',
    'Track all expenses',
    'Build contingency buffer',
  ];

  const mistakes = [
    'No clear budget',
    'Guest count creep',
    'Last minute additions',
    'Vendor deposits lost',
    'Ignoring hidden costs',
    'Emotional overspending',
    'No contingency fund',
    'Comparing to others',
  ];

  const costs = [
    { item: 'Average US Wedding', range: '$20k-30k', note: 'Varies by region' },
    { item: 'Venue', range: '$5k-15k', note: 'Day + location dependent' },
    { item: 'Catering', range: '$50-150/head', note: 'Quality + service level' },
    { item: 'Photographer', range: '$2k-5k', note: 'Hours + package' },
    { item: 'Dress', range: '$500-5k', note: 'Designer vs off-the-rack' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Wedding Budget Guide</h1>
      <p className="text-zinc-600">Wedding budget categories, tips, costs, and common mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>: {c.pct}
              <div className="text-zinc-500 mt-1">Tip: {c.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Typical Costs</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.item} className="bg-white rounded p-2">
              <strong>{c.item}</strong>: {c.range}
              <div className="text-zinc-500 mt-1">{c.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Budget Tips</h3>
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
        <h3 className="font-medium mb-2">Wedding Budget Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set total budget (couple + family contributions). 2. Decide priorities (what matters most). 3. Allocate percentages to categories. 4. Research vendor costs. 5. Get multiple quotes. 6. Negotiate contracts. 7. Set guest count early. 8. Book key vendors first. 9. Track every expense. 10. Keep contingency (10%). 11. Review spending monthly. 12. Stick to decisions. Wedding budget = planning + discipline. Start early, prioritize, track everything.
        </div>
      </div>
    </main>
  );
}