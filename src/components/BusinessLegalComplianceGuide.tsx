'use client'

export default function BusinessLegalComplianceGuide() {
  const areas = [
    { area: 'Corporate law', scope: 'Company structure', requirement: 'Formation compliance' },
    { area: 'Employment law', scope: 'Worker rights', requirement: 'HR regulations' },
    { area: 'Contract law', scope: 'Agreements', requirement: 'Enforceable terms' },
    { area: 'Intellectual property', scope: 'IP protection', requirement: 'Rights registration' },
    { area: 'Tax law', scope: 'Taxation', requirement: 'Filing obligations' },
    { area: 'Data privacy', scope: 'Information', requirement: 'Protection standards' },
  ];

  const process = [
    'Identify applicable laws',
    'Assess current compliance',
    'Identify gaps',
    'Develop compliance plan',
    'Implement controls',
    'Train personnel',
    'Monitor adherence',
    'Document compliance',
    'Review regularly',
    'Update for changes',
  ];

  const risks = [
    { risk: 'Regulatory penalties', consequence: 'Fines, sanctions', mitigation: 'Proactive compliance' },
    { risk: 'Legal liability', consequence: 'Lawsuits, damages', mitigation: 'Risk management' },
    { risk: 'Reputation damage', consequence: 'Trust loss', mitigation: 'Ethical practices' },
    { risk: 'Operational disruption', consequence: 'Business impact', mitigation: 'Backup plans' },
  ];

  const responsibilities = [
    'Legal counsel engagement',
    'Compliance officer role',
    'Management oversight',
    'Employee training',
    'Policy documentation',
    'Regular audits',
    'Incident response',
    'Continuous improvement',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Legal Compliance Guide</h1>
      <p className="text-zinc-600">Areas, process, risks, and responsibilities.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Scope: {a.scope}</div>
              <div className="text-green-600 mt-1">Requirement: {a.requirement}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Factors</h3>
        <div className="space-y-1 text-xs">
          {risks.map((r) => (
            <div key={r.risk} className="bg-white rounded p-2">
              <strong>{r.risk}</strong>
              <div className="text-zinc-500 mt-1">Consequence: {r.consequence}</div>
              <div className="text-green-600 mt-1">Mitigation: {r.mitigation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Responsibilities</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {responsibilities.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Legal Compliance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all applicable laws. 2. Assess current compliance status. 3. Identify compliance gaps. 4. Develop comprehensive plan. 5. Implement control measures. 6. Train all personnel. 7. Monitor adherence continuously. 8. Document all compliance. 9. Review compliance regularly. 10. Update for legal changes. Legal compliance = business protection. Laws identified. Status assessed. Gaps identified. Plan developed. Controls implemented. Personnel trained. Adherence monitored. Compliance documented. Review conducted. Updates applied.
        </div>
      </div>
    </main>
  );
}