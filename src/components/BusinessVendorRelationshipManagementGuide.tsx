'use client'

export default function BusinessVendorRelationshipManagementGuide() {
  const types = [
    { type: 'Strategic vendors', importance: 'Critical', management: 'Close partnership' },
    { type: 'Tactical vendors', importance: 'Important', management: 'Regular oversight' },
    { type: 'Commodity vendors', importance: 'Standard', management: 'Periodic review' },
    { type: 'Preferred vendors', importance: 'Preferred', management: 'Streamlined process' },
  ];

  const stages = [
    'Identify vendor needs',
    'Research vendor options',
    'Evaluate vendor capabilities',
    'Negotiate vendor terms',
    'Select vendor partner',
    'Contract vendor agreement',
    'Onboard vendor relationship',
    'Manage vendor performance',
    'Review vendor results',
    'Renew or replace vendor',
  ];

  const activities = [
    { activity: 'Vendor selection', frequency: 'Per need', outcome: 'Right partner' },
    { activity: 'Contract management', frequency: 'Ongoing', outcome: 'Clear terms' },
    { activity: 'Performance review', frequency: 'Quarterly', outcome: 'Quality assurance' },
    { activity: 'Relationship building', frequency: 'Regular', outcome: 'Trust' },
  ];

  const metrics = [
    'Vendor satisfaction',
    'Contract compliance',
    'Performance rating',
    'Cost effectiveness',
    'Quality delivery',
    'Response time',
    'Relationship strength',
    'Risk level',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Vendor Relationship Management Guide</h1>
      <p className="text-zinc-600">Types, stages, activities, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Vendor Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Importance: {t.importance}</div>
              <div className="text-green-600 mt-1">Management: {t.management}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relationship Stages</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {stages.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Activities</h3>
        <div className="space-y-1 text-xs">
          {activities.map((a) => (
            <div key={a.activity} className="bg-white rounded p-2">
              <strong>{a.activity}</strong>
              <div className="text-zinc-500 mt-1">Frequency: {a.frequency}</div>
              <div className="text-green-600 mt-1">Outcome: {a.outcome}</div>
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
        <h3 className="font-medium mb-2">Vendor Relationship Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify vendor needs accurately. 2. Research vendor options thoroughly. 3. Evaluate vendor capabilities comprehensively. 4. Negotiate vendor terms effectively. 5. Select vendor partner carefully. 6. Contract vendor agreement clearly. 7. Onboard vendor relationship smoothly. 8. Manage vendor performance actively. 9. Review vendor results honestly. 10. Renew or replace vendor strategically. Vendor relationship = supply chain strength. Needs identified. Options researched. Capabilities evaluated. Terms negotiated. Partner selected. Agreement contracted. Relationship onboarded. Performance managed. Results reviewed. Vendor optimized.
        </div>
      </div>
    </main>
  );
}