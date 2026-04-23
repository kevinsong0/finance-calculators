'use client'

export default function BenefitsGuide() {
  const types = [
    { type: 'Health Insurance', desc: 'Medical, dental, vision', mandatory: 'Often required' },
    { type: 'Retirement', desc: '401k, pension plans', mandatory: 'Common offering' },
    { type: 'Paid Time Off', desc: 'Vacation, sick, holidays', mandatory: 'Standard' },
    { type: 'Life Insurance', desc: 'Death benefit coverage', mandatory: 'Optional' },
    { type: 'Disability', desc: 'Income if unable to work', mandatory: 'Some required' },
    { type: 'Flexible Spending', desc: 'Pre-tax accounts', mandatory: 'Optional' },
  ];

  const considerations = [
    { factor: 'Cost', impact: 'Company budget, employee contributions' },
    { factor: 'Coverage', impact: 'What included, limits, exclusions' },
    { factor: 'Choice', impact: 'Options available, flexibility' },
    { factor: 'Administration', impact: 'Complexity to manage' },
  ];

  const administration = [
    'Plan selection',
    'Vendor management',
    'Enrollment process',
    'Employee communication',
    'Compliance tracking',
    'Cost monitoring',
    'Renewal negotiation',
    'Issue resolution',
  ];

  const trends = [
    'Remote work benefits',
    'Mental health coverage',
    'Student loan assistance',
    'Flexible schedules',
    'Wellness programs',
    'Career development',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Benefits Management Guide</h1>
      <p className="text-zinc-600">Benefit types, considerations, administration, and trends.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefit Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">{t.mandatory}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Considerations</h3>
        <div className="space-y-1 text-xs">
          {considerations.map((c) => (
            <div key={c.factor} className="bg-white rounded p-2">
              <strong>{c.factor}</strong>
              <div className="text-zinc-500 mt-1">Impact: {c.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Administration Tasks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {administration.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Current Trends</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {trends.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define benefits philosophy. 2. Research market offerings. 3. Budget for total cost. 4. Select appropriate plans. 5. Communicate to employees. 6. Manage enrollment efficiently. 7. Track compliance requirements. 8. Monitor vendor performance. 9. Review annually. 10. Negotiate renewals. 11. Address employee questions. 12. Track utilization metrics. Benefits = competitive advantage. Balance cost and value. Clear communication. Regular review. Employee needs matter. Compliance essential."
        </div>
      </div>
    </main>
  );
}