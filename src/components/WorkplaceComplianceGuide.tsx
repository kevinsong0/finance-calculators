'use client'

export default function WorkplaceComplianceGuide() {
  const areas = [
    { area: 'Labor laws', scope: 'Employment standards', importance: 'Required' },
    { area: 'Safety regulations', scope: 'OSHA compliance', importance: 'Mandatory' },
    { area: 'Anti-discrimination', scope: 'Equal opportunity', importance: 'Essential' },
    { area: 'Data privacy', scope: 'Employee data', importance: 'Growing' },
    { area: 'Benefits compliance', scope: 'ACA, ERISA', importance: 'Required' },
    { area: 'Wage and hour', scope: 'Pay regulations', importance: 'Critical' },
  ];

  const requirements = [
    'Policy documentation',
    'Training programs',
    'Record keeping',
    'Reporting obligations',
    'Audit readiness',
    'Update monitoring',
    'Legal review',
    'Compliance officer',
  ];

  const risks = [
    { risk: 'Fines and penalties', severity: 'Financial', prevention: 'Proactive compliance' },
    { risk: 'Lawsuits', severity: 'Legal', prevention: 'Policy clarity' },
    { risk: 'Reputation damage', severity: 'Business', prevention: 'Culture focus' },
    { risk: 'Employee claims', severity: 'HR', prevention: 'Fair treatment' },
    { risk: 'Regulatory action', severity: 'Legal', prevention: 'Documentation' },
  ];

  const bestPractices = [
    'Regular compliance audits',
    'Policy review schedule',
    'Training updates',
    'Documentation standards',
    'Legal counsel access',
    'Change monitoring',
    'Employee communication',
    'Incident response',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Compliance Guide</h1>
      <p className="text-zinc-600">Areas, requirements, risks, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Scope: {a.scope}</div>
              <div className="text-green-600 mt-1">Importance: {a.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {requirements.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Risks</h3>
        <div className="space-y-1 text-xs">
          {risks.map((r) => (
            <div key={r.risk} className="bg-white rounded p-2">
              <strong className="text-red-600">{r.risk}</strong>
              <div className="text-zinc-500 mt-1">Severity: {r.severity}</div>
              <div className="text-green-600 mt-1">Prevention: {r.prevention}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify applicable regulations. 2. Document policies and procedures. 3. Train employees on requirements. 4. Maintain required records. 5. Complete reporting obligations. 6. Conduct regular audits. 7. Monitor regulation changes. 8. Update policies as needed. 9. Address gaps promptly. 10. Consult legal counsel. 11. Designate compliance officer. 12. Review annually. Compliance = proactive approach. Multiple areas. Clear requirements. Risk prevention. Regular audits. Change monitoring. Documentation maintained. Legal support.
        </div>
      </div>
    </main>
  );
}