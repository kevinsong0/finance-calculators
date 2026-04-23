'use client'

export default function BusinessMarketingPlanGuide() {
  const components = [
    { component: 'Market analysis', content: 'Industry, competition', outcome: 'Strategic insight' },
    { component: 'Target audience', content: 'Customer segments', outcome: 'Focus clarity' },
    { component: 'Marketing goals', content: 'Objectives, targets', outcome: 'Direction' },
    { component: 'Marketing strategy', content: 'Approach, positioning', outcome: 'Competitive edge' },
    { component: 'Marketing tactics', content: 'Channels, activities', outcome: 'Execution plan' },
    { component: 'Budget allocation', content: 'Resource distribution', outcome: 'Funding clarity' },
  ];

  const channels = [
    'Digital marketing',
    'Content marketing',
    'Social media',
    'Email marketing',
    'Search marketing',
    'Traditional advertising',
    'Events and tradeshows',
    'Public relations',
  ];

  const process = [
    'Set marketing objectives',
    'Analyze market situation',
    'Define target audience',
    'Develop positioning',
    'Choose marketing channels',
    'Create marketing content',
    'Allocate marketing budget',
    'Set implementation timeline',
    'Define success metrics',
    'Monitor and adjust',
  ];

  const metrics = [
    { metric: 'Customer acquisition', measurement: 'New customers', target: 'Growth rate' },
    { metric: 'Marketing ROI', measurement: 'Return on spend', target: 'Efficiency' },
    { metric: 'Conversion rate', measurement: 'Lead conversion', target: 'Effectiveness' },
    { metric: 'Customer retention', measurement: 'Repeat customers', target: 'Loyalty' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Marketing Plan Guide</h1>
      <p className="text-zinc-600">Components, channels, process, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Plan Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">Content: {c.content}</div>
              <div className="text-green-600 mt-1">Outcome: {c.outcome}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Marketing Channels</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {channels.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">Measurement: {m.measurement}</div>
              <div className="text-green-600 mt-1">Target: {m.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Marketing Plan Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set clear marketing objectives. 2. Analyze market situation thoroughly. 3. Define target audience precisely. 4. Develop strong positioning. 5. Choose appropriate marketing channels. 6. Create compelling marketing content. 7. Allocate marketing budget wisely. 8. Set implementation timeline clearly. 9. Define success metrics specifically. 10. Monitor and adjust continuously. Marketing plan = strategic execution. Objectives set. Market analyzed. Audience defined. Positioning developed. Channels chosen. Content created. Budget allocated. Timeline set. Metrics defined. Plan monitored.
        </div>
      </div>
    </main>
  );
}