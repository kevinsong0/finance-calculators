'use client'

export default function CreditCardManagementGuide() {
  const cardTypes = [
    { type: 'Rewards Card', benefit: 'Points/cash back', best: 'Regular spenders, paid off monthly' },
    { type: 'Low Interest', benefit: 'Lower APR', best: 'May carry balance occasionally' },
    { type: 'Balance Transfer', benefit: '0% intro APR', best: 'Debt payoff strategy' },
    { type: 'Secured Card', benefit: 'Build credit', best: 'No/bad credit history' },
    { type: 'Travel Card', benefit: 'Miles, travel perks', best: 'Frequent travelers' },
    { type: 'Student Card', benefit: 'Easy approval', best: 'Students building credit' },
  ];

  const bestPractices = [
    'Pay full balance monthly',
    'Never miss payment',
    'Keep utilization under 30%',
    'Track all purchases',
    'Set up autopay',
    'Review statements',
    'Avoid annual fee cards if unused',
    'Don&apos;t chase rewards with debt',
  ];

  const mistakes = [
    'Carrying high balance',
    'Only paying minimum',
    'Missing payments',
    'Maxing out cards',
    'Too many cards',
    'Ignoring statements',
    'Spending for rewards',
    'Late payments',
  ];

  const utilizationTips = [
    'Under 30% ideal',
    'Under 10% excellent',
    'Report date matters',
    'Pay before report',
    'Request limit increase',
    'Multiple cards spread use',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Credit Card Management Guide</h1>
      <p className="text-zinc-600">Card types, best practices, and avoiding debt traps.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Card Types</h3>
        <div className="space-y-1 text-xs">
          {cardTypes.map((c) => (
            <div key={c.type} className="bg-white rounded p-2">
              <strong>{c.type}</strong>
              <div className="text-green-600 mt-1">{c.benefit}</div>
              <div className="text-zinc-500 mt-1">Best for: {c.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
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
        <h3 className="font-medium mb-2">Utilization Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {utilizationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Card Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose right card type for your use. 2. Pay full balance every month. 3. Never miss payment deadline. 4. Keep utilization under 30%. 5. Track all purchases. 6. Set up autopay minimum. 7. Review monthly statements. 8. Know your report date. 9. Don&apos;t open too many cards. 10. Avoid spending just for rewards. 11. Know your APR. 12. Have payoff strategy. Credit card = tool not income. Pay full balance = no interest. Utilization affects credit. Responsible use builds credit, irresponsible builds debt."
        </div>
      </div>
    </main>
  );
}