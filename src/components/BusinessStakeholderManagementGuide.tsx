'use client'

export default function BusinessStakeholderManagementGuide() {
  const stakeholders = [
    { stakeholder: 'Shareholders', priority: 'Primary', engagement: 'Investment returns' },
    { stakeholder: 'Customers', priority: 'Critical', engagement: 'Product satisfaction' },
    { stakeholder: 'Employees', priority: 'Essential', engagement: 'Work experience' },
    { stakeholder: 'Suppliers', priority: 'Important', engagement: 'Partnership value' },
  ];

  const strategies = [
    'Stakeholder identification',
    'Priority assessment',
    'Needs analysis',
    'Engagement planning',
    'Communication strategy',
    'Relationship building',
    'Feedback collection',
    'Issue resolution',
    'Value delivery',
    'Relationship monitoring',
  ];

  const approaches = [
    { approach: 'Direct engagement', method: 'Personal interaction', benefit: 'Trust building' },
    { approach: 'Regular communication', method: 'Updates and reports', benefit: 'Transparency' },
    { approach: 'Feedback mechanisms', method: 'Surveys and channels', benefit: 'Input collection' },
    { approach: 'Issue resolution', method: 'Problem solving', benefit: 'Relationship repair' },
  ];

  const metrics = [
    'Stakeholder satisfaction',
    'Engagement effectiveness',
    'Relationship strength',
    'Communication quality',
    'Issue resolution rate',
    'Value delivery score',
    'Trust index',
    'Stakeholder retention',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Stakeholder Management Guide</h1>
      <p className="text-zinc-600">Stakeholders, strategies, approaches, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Stakeholders</h3>
        <div className="space-y-1 text-xs">
          {stakeholders.map((s) => (
            <div key={s.stakeholder} className="bg-white rounded p-2">
              <strong>{s.stakeholder}</strong>
              <div className="text-zinc-500 mt-1">Priority: {s.priority}</div>
              <div className="text-green-600 mt-1">Engagement: {s.engagement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Engagement Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">Method: {a.method}</div>
              <div className="text-green-600 mt-1">Benefit: {a.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stakeholder Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all stakeholders. 2. Assess stakeholder priorities. 3. Analyze stakeholder needs. 4. Plan engagement activities. 5. Develop communication strategy. 6. Build relationships actively. 7. Collect feedback regularly. 8. Resolve issues promptly. 9. Deliver stakeholder value. 10. Monitor relationship health. Stakeholder management = business success. Stakeholders identified. Priorities assessed. Needs analyzed. Engagement planned. Communication developed. Relationships built. Feedback collected. Issues resolved. Value delivered. Health monitored.
        </div>
      </div>
    </main>
  );
}
