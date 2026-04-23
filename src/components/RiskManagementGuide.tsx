'use client'

export default function RiskManagementGuide() {
  const riskTypes = [
    { type: 'Technical Risk', desc: 'Implementation uncertainty', mitigation: 'Prototypes, research' },
    { type: 'Schedule Risk', desc: 'Timeline delays', mitigation: 'Buffer time, milestones' },
    { type: 'Resource Risk', desc: 'People/tools unavailable', mitigation: 'Alternatives, contracts' },
    { type: 'Budget Risk', desc: 'Cost overruns', mitigation: 'Contingency buffer' },
    { type: 'Scope Risk', desc: 'Requirements changes', mitigation: 'Change control' },
    { type: 'External Risk', desc: 'Dependencies outside', mitigation: 'Backup plans' },
  ];

  const strategies = [
    { strategy: 'Avoid', desc: 'Eliminate risk source', when: 'High impact, avoidable' },
    { strategy: 'Transfer', desc: 'Move to another party', when: 'Contract, insurance' },
    { strategy: 'Reduce', desc: 'Lower probability/impact', when: 'Manageable risk' },
    { strategy: 'Accept', desc: 'Acknowledge and monitor', when: 'Low impact, unavoidable' },
  ];

  const steps = [
    'Identify risks',
    'Assess probability',
    'Assess impact',
    'Prioritize risks',
    'Plan mitigation',
    'Assign owners',
    'Monitor regularly',
    'Update plan',
  ];

  const monitoring = [
    'Risk register review',
    'Status updates',
    'Trigger indicators',
    'Mitigation progress',
    'New risk identification',
    'Closed risk tracking',
    'Reassessment schedule',
    'Communication to team',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Risk Management Guide</h1>
      <p className="text-zinc-600">Risk types, strategies, process steps, and monitoring.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Types</h3>
        <div className="space-y-1 text-xs">
          {riskTypes.map((r) => (
            <div key={r.type} className="bg-white rounded p-2">
              <strong>{r.type}</strong>
              <div className="text-zinc-500 mt-1">{r.desc}</div>
              <div className="text-green-600 mt-1">Mitigation: {r.mitigation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Response Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">When: {s.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Activities</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {monitoring.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all potential risks early. 2. Document risks in register. 3. Assess probability (high/medium/low). 4. Assess impact (high/medium/low). 5. Calculate risk score (probability x impact). 6. Prioritize by risk score. 7. Assign mitigation strategy per risk. 8. Identify risk owner for each. 9. Define triggers and indicators. 10. Create contingency plans. 11. Review risks regularly (weekly/biweekly). 12. Update register as changes occur. Risk management = proactive planning. Identify before they happen. Plan mitigation, assign owners, monitor continuously. Top risks get most attention."
        </div>
      </div>
    </main>
  );
}