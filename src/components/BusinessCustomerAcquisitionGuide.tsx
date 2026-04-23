'use client'

export default function BusinessCustomerAcquisitionGuide() {
  const channels = [
    { channel: 'Content marketing', cost: 'Medium', speed: 'Slow', quality: 'High' },
    { channel: 'Paid advertising', cost: 'High', speed: 'Fast', quality: 'Medium' },
    { channel: 'Social media', cost: 'Low', speed: 'Medium', quality: 'Variable' },
    { channel: 'SEO', cost: 'Low', speed: 'Slow', quality: 'High' },
    { channel: 'Referral programs', cost: 'Medium', speed: 'Medium', quality: 'High' },
    { channel: 'Direct sales', cost: 'High', speed: 'Fast', quality: 'High' },
  ];

  const process = [
    'Define target customer',
    'Identify acquisition channels',
    'Create acquisition content',
    'Build landing pages',
    'Implement tracking',
    'Launch campaigns',
    'Monitor performance',
    'Optimize conversion',
    'Scale successful channels',
    'Calculate acquisition cost',
  ];

  const metrics = [
    { metric: 'CAC', formula: 'Acquisition cost / Customer', insight: 'Cost efficiency' },
    { metric: 'Conversion rate', formula: 'Customers / Leads', insight: 'Channel effectiveness' },
    { metric: 'Lead volume', formula: 'Total leads generated', insight: 'Channel reach' },
    { metric: 'CAC:LTV ratio', formula: 'CAC / Customer lifetime value', insight: 'Profitability' },
  ];

  const optimization = [
    'Improve landing pages',
    'Refine targeting',
    'Enhance messaging',
    'Test different offers',
    'Optimize channel mix',
    'Reduce acquisition cost',
    'Increase conversion rate',
    'Speed up conversion time',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Customer Acquisition Guide</h1>
      <p className="text-zinc-600">Channels, process, metrics, and optimization.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Acquisition Channels</h3>
        <div className="space-y-1 text-xs">
          {channels.map((c) => (
            <div key={c.channel} className="bg-white rounded p-2">
              <strong>{c.channel}</strong>
              <div className="text-zinc-500 mt-1">Cost: {c.cost}, Speed: {c.speed}</div>
              <div className="text-green-600 mt-1">Quality: {c.quality}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Acquisition Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
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
        <h3 className="font-medium mb-2">Optimization Tactics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {optimization.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Customer Acquisition Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define target customer clearly. 2. Identify best acquisition channels. 3. Create compelling acquisition content. 4. Build effective landing pages. 5. Implement proper tracking. 6. Launch acquisition campaigns. 7. Monitor performance actively. 8. Optimize conversion continuously. 9. Scale successful channels. 10. Calculate acquisition cost accurately. Customer acquisition = growth engine. Customer defined. Channels identified. Content created. Pages built. Tracking implemented. Campaigns launched. Performance monitored. Conversion optimized. Channels scaled. Cost calculated.
        </div>
      </div>
    </main>
  );
}