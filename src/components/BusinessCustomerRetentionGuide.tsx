'use client'

export default function BusinessCustomerRetentionGuide() {
  const strategies = [
    { strategy: 'Customer experience', approach: 'Service excellence', outcome: 'Satisfaction' },
    { strategy: 'Value delivery', approach: 'Consistent value', outcome: 'Perceived benefit' },
    { strategy: 'Relationship building', approach: 'Personal connection', outcome: 'Loyalty' },
    { strategy: 'Problem resolution', approach: 'Quick fixes', outcome: 'Trust recovery' },
    { strategy: 'Engagement programs', approach: 'Regular touchpoints', outcome: 'Connection' },
    { strategy: 'Loyalty rewards', approach: 'Benefit programs', outcome: 'Incentive' },
  ];

  const programs = [
    'Loyalty point systems',
    'Tiered membership levels',
    'Exclusive member benefits',
    'Referral reward programs',
    'Subscription discounts',
    'Early access offers',
    'Personalized communications',
    'Customer appreciation events',
  ];

  const metrics = [
    { metric: 'Retention rate', formula: 'Customers retained / Total', insight: 'Retention success' },
    { metric: 'Churn rate', formula: 'Customers lost / Total', insight: 'Loss rate' },
    { metric: 'Customer lifetime', formula: 'Average duration', insight: 'Relationship length' },
    { metric: 'Repeat purchase', formula: 'Repeat customers / Total', insight: 'Loyalty behavior' },
  ];

  const actions = [
    'Monitor satisfaction signals',
    'Address issues promptly',
    'Personalize communications',
    'Provide ongoing value',
    'Create engagement opportunities',
    'Reward loyalty behavior',
    'Build community connections',
    'Anticipate customer needs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Customer Retention Guide</h1>
      <p className="text-zinc-600">Strategies, programs, metrics, and actions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Approach: {s.approach}</div>
              <div className="text-green-600 mt-1">Outcome: {s.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Loyalty Programs</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {programs.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Formula: {m.formula}</div>
              <div className="text-green-600 mt-1">Insight: {m.insight}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Retention Actions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {actions.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Customer Retention Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Monitor satisfaction signals. 2. Address issues promptly. 3. Personalize communications. 4. Provide ongoing value. 5. Create engagement opportunities. 6. Reward loyalty behavior. 7. Build community connections. 8. Anticipate customer needs. 9. Measure retention metrics. 10. Adjust strategies as needed. Customer retention = profit engine. Signals monitored. Issues addressed. Communications personalized. Value provided. Engagement created. Loyalty rewarded. Community built. Needs anticipated. Metrics measured. Strategies adjusted.
        </div>
      </div>
    </main>
  );
}