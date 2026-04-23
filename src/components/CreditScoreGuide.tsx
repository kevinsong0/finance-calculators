'use client'

export default function CreditScoreGuide() {
  const factors = [
    { factor: 'Payment History', weight: '35%', desc: 'On-time payments most important' },
    { factor: 'Credit Utilization', weight: '30%', desc: 'Keep utilization below 30%' },
    { factor: 'Credit History Length', weight: '15%', desc: 'Older accounts help' },
    { factor: 'Credit Mix', weight: '10%', desc: 'Variety of credit types' },
    { factor: 'New Credit', weight: '10%', desc: 'Limit new applications' },
  ];

  const scoreRanges = [
    { range: '300-579', category: 'Poor', desc: 'Difficult approval, high rates' },
    { range: '580-669', category: 'Fair', desc: 'May qualify, not best rates' },
    { range: '670-739', category: 'Good', desc: 'Most lenders approve' },
    { range: '740-799', category: 'Very Good', desc: 'Better rates available' },
    { range: '800-850', category: 'Excellent', desc: 'Best rates, easy approval' },
  ];

  const tips = [
    { tip: 'Pay on time', action: 'Never miss payments, set autopay' },
    { tip: 'Lower utilization', action: 'Pay down balances, keep below 30%' },
    { tip: 'Keep old accounts', action: 'Don\'t close oldest credit cards' },
    { tip: 'Limit applications', action: 'Apply only when needed' },
    { tip: 'Check reports', action: 'Review for errors, dispute mistakes' },
    { tip: 'Monitor regularly', action: 'Use free credit monitoring' },
  ];

  const impacts = [
    { action: 'Late payment', impact: 'Drop 50-100+ points, stays 7 years' },
    { action: 'High utilization', impact: 'Temporary drop, recovers when paid' },
    { action: 'New credit card', impact: 'Small drop, recovers in months' },
    { action: 'Account closure', impact: 'May reduce history, utilization' },
    { action: 'Hard inquiry', impact: '5-10 points, multiple matter' },
    { action: 'Collection', impact: 'Major drop, stays 7 years' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Credit Score Guide</h1>
      <p className="text-zinc-600">Credit score factors, ranges, improvement tips, and impact of actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Score Factors</h3>
        <div className="space-y-1 text-xs">
          {factors.map((f) => (
            <div key={f.factor} className="bg-white rounded p-2">
              <strong>{f.factor}</strong> ({f.weight})
              <div className="text-zinc-500 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Score Ranges</h3>
        <div className="space-y-1 text-xs">
          {scoreRanges.map((s) => (
            <div key={s.range} className="bg-white rounded p-2">
              <strong>{s.range}</strong>: <span className="text-green-600">{s.category}</span>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Tips</h3>
        <div className="space-y-1 text-xs">
          {tips.map((t) => (
            <div key={t.tip} className="bg-green-50 rounded p-2">
              <strong className="text-green-600">{t.tip}</strong>
              <div className="text-zinc-600 mt-1">{t.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Action Impacts</h3>
        <div className="space-y-1 text-xs">
          {impacts.map((i) => (
            <div key={i.action} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{i.action}</strong>
              <div className="text-zinc-600 mt-1">{i.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Credit Score Tips</h3>
        <div className="text-xs text-zinc-600">
          Payment history most important (35%) - never miss payments. Utilization second (30%) - keep below 30%. Check reports annually (free at annualcreditreport.com). Dispute errors promptly. Build history over time. Don&apos;t close old cards. Apply strategically. Monitor regularly. Good credit = lower loan rates, better insurance, easier approvals. Build early, maintain consistently.
        </div>
      </div>
    </main>
  );
}