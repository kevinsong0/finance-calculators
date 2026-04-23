'use client'

export default function SalaryNegotiationGuide() {
  const timingTips = [
    { timing: 'New job offer', advantage: 'Highest leverage point', approach: 'Counteroffer with market data' },
    { timing: 'Performance review', advantage: 'Results documented', approach: 'Link achievements to value' },
    { timing: 'Promotion opportunity', advantage: 'Role change justification', approach: 'New level market rate' },
    { timing: 'Annual increase time', advantage: 'Budget allocated', approach: 'Propose specific percentage' },
    { timing: 'After major success', advantage: 'Value demonstrated', approach: 'Specific win negotiation' },
    { timing: 'Company doing well', advantage: 'Budget available', approach: 'Timing aligned with results' },
  ];

  const preparation = [
    'Research market salary',
    'Document achievements',
    'Know your value',
    'Prepare specific numbers',
    'Practice your pitch',
    'Anticipate objections',
    'Plan alternatives',
    'Consider total package',
  ];

  const negotiationTips = [
    'Start with market data',
    'Focus on value delivered',
    'Be specific on numbers',
    'Consider total compensation',
    'Don&apos;t accept first offer',
    'Ask for time to consider',
    'Keep professional tone',
    'Have backup plan ready',
  ];

  const totalPackage = [
    'Base salary',
    'Bonus potential',
    'Stock/equity',
    'Benefits value',
    '401(k) match',
    'Healthcare costs',
    'Flexible hours',
    'Remote options',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Salary Negotiation Guide</h1>
      <p className="text-zinc-600">Timing strategies, preparation steps, and negotiation tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Timing</h3>
        <div className="space-y-1 text-xs">
          {timingTips.map((t) => (
            <div key={t.timing} className="bg-white rounded p-2">
              <strong>{t.timing}</strong>
              <div className="text-green-600 mt-1">{t.advantage}</div>
              <div className="text-zinc-500 mt-1">Approach: {t.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Preparation Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {preparation.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {negotiationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Total Package Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {totalPackage.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Research market salary range (Glassdoor, PayScale). 2. Document your achievements and value. 3. Prepare specific target number. 4. Choose right timing moment. 5. Practice your negotiation pitch. 6. Lead with data not emotion. 7. Consider total compensation package. 8. Ask for time after offer. 9. Counteroffer with confidence. 10. Keep professional and positive. 11. Know when to stop pushing. 12. Get final offer in writing. Negotiation = earned value. Don&apos;t ask, negotiate. Market data + achievements + specific request + professional approach."
        </div>
      </div>
    </main>
  );
}