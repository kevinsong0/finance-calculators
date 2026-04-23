'use client'

export default function TravelBudgetGuide() {
  const costs = [
    { category: 'Transportation', desc: 'Flights, trains, rental cars', tip: 'Book early, compare prices' },
    { category: 'Accommodation', desc: 'Hotels, Airbnb, hostels', tip: 'Mix options, loyalty points' },
    { category: 'Food', desc: 'Restaurants, groceries', tip: 'Mix dining out + cooking' },
    { category: 'Activities', desc: 'Tours, attractions, events', tip: 'Free activities + paid highlights' },
    { category: 'Insurance', desc: 'Travel insurance', tip: 'Essential for international' },
    { category: 'Miscellaneous', desc: 'Shopping, emergencies, tips', tip: 'Buffer for unexpected' },
  ];

  const strategies = [
    { strategy: 'Off-season Travel', desc: 'Lower prices, fewer crowds', savings: '20-40% on costs' },
    { strategy: 'Early Booking', desc: 'Lock in lower prices', savings: 'Flights, accommodation' },
    { strategy: 'Flexible Dates', desc: 'Adjust for cheaper days', savings: 'Weekday vs weekend' },
    { strategy: 'Local Experience', desc: 'Eat like locals, free activities', savings: 'Food, activities' },
    { strategy: 'Points/Miles', desc: 'Credit card rewards', savings: 'Free flights, hotels' },
  ];

  const tips = [
    'Research destination costs',
    'Set daily budget limit',
    'Track spending daily',
    'Use local currency wisely',
    'Have emergency fund',
    'Compare booking options',
    'Consider travel insurance',
    'Book refundable when possible',
  ];

  const mistakes = [
    'No budget planning',
    'Overspending on luxury',
    'Hidden fees surprise',
    'Currency exchange losses',
    'No emergency buffer',
    'Booking last minute',
    'Ignoring insurance',
    'Not tracking expenses',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Travel Budget Guide</h1>
      <p className="text-zinc-600">Travel costs, saving strategies, budget tips, and common mistakes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cost Categories</h3>
        <div className="space-y-1 text-xs">
          {costs.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Tip: {c.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Saving Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Savings: {s.savings}</div>
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
        <h3 className="font-medium mb-2">Travel Budget Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research destination costs. 2. Set total budget. 3. Allocate by category. 4. Plan major expenses. 5. Book key items early. 6. Set daily spending limit. 7. Track expenses daily. 8. Use apps for tracking. 9. Have emergency buffer (20%). 10. Consider travel insurance. 11. Plan for currency exchange. 12. Review spending post-trip. Travel budget = enjoy without financial stress. Plan, track, adapt.
        </div>
      </div>
    </main>
  );
}