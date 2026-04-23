'use client'

export default function BusinessRiskGovernanceGuide() {
  const elements = [
    { element: 'Risk identification', scope: 'Risk discovery', process: 'Risk assessment' },
    { element: 'Risk evaluation', scope: 'Impact analysis', process: 'Prioritization' },
    { element: 'Risk treatment', scope: 'Response actions', process: 'Mitigation planning' },
    { element: 'Risk monitoring', scope: 'Ongoing tracking', process: 'Performance review' },
    { element: 'Risk reporting', scope: 'Communication', process: 'Status updates' },
    { element: 'Risk governance', scope: 'Decision oversight', process: 'Board review' },
  ];

  const framework = [
    'Establish risk appetite',
    'Define risk tolerance',
    'Implement risk policies',
    'Create risk procedures',
    'Assign risk ownership',
    'Build risk capabilities',
    'Deploy risk tools',
    'Monitor risk metrics',
    'Report risk status',
    'Review risk governance',
  ];

  const roles = [
    { role: 'Board', responsibility: 'Risk oversight', action: 'Policy approval' },
    { role: 'Risk committee', responsibility: 'Risk review', action: 'Assessment direction' },
    { role: 'Executive team', responsibility: 'Risk management', action: 'Implementation' },
    { role: 'Risk officers', responsibility: 'Risk coordination', action: 'Monitoring execution' },
  ];

  const metrics = [
    'Risk exposure levels',
    'Risk mitigation progress',
    'Risk incident count',
    'Risk response time',
    'Policy compliance rate',
    'Risk review completion',
    'Governance effectiveness',
    'Risk maturity score',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Risk Governance Guide</h1>
      <p className="text-zinc-600">Elements, framework, roles, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Elements</h3>
        <div className="space-y-1 text-xs">
          {elements.map((e) => (
            <div key={e.element} className="bg-white rounded p-2">
              <strong>{e.element}</strong>
              <div className="text-zinc-500 mt-1">Scope: {e.scope}</div>
              <div className="text-green-600 mt-1">Process: {e.process}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Framework</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {framework.map((f, idx) => (
            <div key={f} className="bg-white rounded p-2">{idx + 1}. {f}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Governance Roles</h3>
        <div className="space-y-1 text-xs">
          {roles.map((r) => (
            <div key={r.role} className="bg-white rounded p-2">
              <strong>{r.role}</strong>
              <div className="text-zinc-500 mt-1">Responsibility: {r.responsibility}</div>
              <div className="text-green-600 mt-1">Action: {r.action}</div>
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
        <h3 className="font-medium mb-2">Risk Governance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Establish risk appetite clearly. 2. Define risk tolerance appropriately. 3. Implement risk policies effectively. 4. Create risk procedures comprehensively. 5. Assign risk ownership explicitly. 6. Build risk capabilities adequately. 7. Deploy risk tools properly. 8. Monitor risk metrics continuously. 9. Report risk status regularly. 10. Review risk governance periodically. Risk governance = organizational protection. Appetite established. Tolerance defined. Policies implemented. Procedures created. Ownership assigned. Capabilities built. Tools deployed. Metrics monitored. Status reported. Governance reviewed.
        </div>
      </div>
    </main>
  );
}