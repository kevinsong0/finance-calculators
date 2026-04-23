'use client'

export default function StakeholderGuide() {
  const types = [
    { type: 'Internal', examples: 'Employees, managers, owners', approach: 'Regular communication' },
    { type: 'External', examples: 'Customers, suppliers, partners', approach: 'Relationship building' },
    { type: 'Investors', examples: 'Shareholders, lenders', approach: 'Performance reports' },
    { type: 'Regulators', examples: 'Government, agencies', approach: 'Compliance, transparency' },
    { type: 'Community', examples: 'Local area, media', approach: 'Engagement, CSR' },
  ];

  const analysis = [
    { step: 'Identify', desc: 'List all stakeholders' },
    { step: 'Prioritize', desc: 'Rank by influence/interest' },
    { step: 'Understand', desc: 'Know needs and concerns' },
    { step: 'Plan', desc: 'Develop engagement approach' },
    { step: 'Execute', desc: 'Communicate and engage' },
    { step: 'Monitor', desc: 'Track relationships' },
  ];

  const engagement = [
    'Regular communication',
    'Listen to concerns',
    'Involve in decisions',
    'Provide updates',
    'Seek feedback',
    'Build relationships',
    'Address issues promptly',
    'Show appreciation',
  ];

  const conflicts = [
    { conflict: 'Competing priorities', resolution: 'Find common ground, prioritize' },
    { conflict: 'Communication gaps', resolution: 'Increase frequency, transparency' },
    { conflict: 'Trust issues', resolution: 'Consistent actions, honest dialogue' },
    { conflict: 'Resource allocation', resolution: 'Fair process, clear criteria' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Stakeholder Management Guide</h1>
      <p className="text-zinc-600">Stakeholder types, analysis, engagement, and conflicts.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stakeholder Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.examples}</div>
              <div className="text-green-600 mt-1">Approach: {t.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Steps</h3>
        <div className="space-y-1 text-xs">
          {analysis.map((a) => (
            <div key={a.step} className="bg-white rounded p-2">
              <strong>{a.step}</strong>
              <div className="text-zinc-500 mt-1">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Engagement Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {engagement.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Conflicts & Resolution</h3>
        <div className="space-y-1 text-xs">
          {conflicts.map((c) => (
            <div key={c.conflict} className="bg-white rounded p-2">
              <strong className="text-red-600">{c.conflict}</strong>
              <div className="text-green-600 mt-1">→ {c.resolution}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stakeholder Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all stakeholders. 2. Map influence and interest. 3. Understand each stakeholder&apos;s needs. 4. Develop engagement plan. 5. Communicate regularly. 6. Listen to concerns. 7. Address issues promptly. 8. Build trust through consistency. 9. Involve in decisions where appropriate. 10. Seek feedback regularly. 11. Monitor relationships. 12. Adjust approach as needed. Stakeholder management = relationships matter. Identify systematically. Prioritize engagement. Communicate regularly. Address concerns. Build trust. Monitor continuously."
        </div>
      </div>
    </main>
  );
}