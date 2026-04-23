'use client'

export default function VendorManagementGuide() {
  const process = [
    { step: 'Vendor Selection', desc: 'Evaluate and choose vendors', output: 'Vendor contract' },
    { step: 'Onboarding', desc: 'Set up vendor relationship', output: 'Operational vendor' },
    { step: 'Performance Monitoring', desc: 'Track vendor performance', output: 'Performance data' },
    { step: 'Review', desc: 'Evaluate vendor periodically', output: 'Assessment report' },
    { step: 'Issue Resolution', desc: 'Address vendor problems', output: 'Resolved issues' },
    { step: 'Renewal/Termination', desc: 'Decide on continuation', output: 'Contract decision' },
  ];

  const criteria = [
    'Quality of product/service',
    'Pricing competitiveness',
    'Delivery reliability',
    'Customer service',
    'Technical capability',
    'Financial stability',
    'Compliance adherence',
    'Reputation/references',
  ];

  const monitoring = [
    'Delivery performance metrics',
    'Quality metrics',
    'Response time tracking',
    'Issue resolution speed',
    'Cost tracking',
    'Contract compliance',
    'Communication quality',
    'Innovation contributions',
  ];

  const risks = [
    { risk: 'Single vendor dependency', mitigation: 'Backup vendors, contracts' },
    { risk: 'Quality decline', mitigation: 'Regular monitoring, audits' },
    { risk: 'Price increases', mitigation: 'Long-term contracts, alternatives' },
    { risk: 'Service disruption', mitigation: 'Contingency plans, backup' },
    { risk: 'Data security', mitigation: 'Security requirements, audits' },
    { risk: 'Compliance issues', mitigation: 'Regular compliance checks' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Vendor Management Guide</h1>
      <p className="text-zinc-600">Vendor process, criteria, monitoring, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
        <div className="space-y-1 text-xs">
          {process.map((p) => (
            <div key={p.step} className="bg-white rounded p-2">
              <strong>{p.step}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Output: {p.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Selection Criteria</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {criteria.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {monitoring.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Vendor Risks & Mitigation</h3>
        <div className="space-y-1 text-xs">
          {risks.map((r) => (
            <div key={r.risk} className="bg-white rounded p-2">
              <strong className="text-red-600">{r.risk}</strong>
              <div className="text-green-600 mt-1">→ {r.mitigation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Vendor Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define vendor requirements clearly. 2. Evaluate multiple candidates. 3. Negotiate favorable terms. 4. Document contracts properly. 5. Set performance metrics. 6. Monitor regularly. 7. Address issues promptly. 8. Conduct periodic reviews. 9. Maintain backup options. 10. Manage vendor relationships. 11. Track compliance. 12. Plan for renewal/termination. Vendor management = strategic relationships. Select carefully. Monitor performance. Address issues. Maintain backups. Review regularly. Document everything."
        </div>
      </div>
    </main>
  );
}