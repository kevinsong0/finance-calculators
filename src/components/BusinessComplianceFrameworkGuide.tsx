'use client'

export default function BusinessComplianceFrameworkGuide() {
  const areas = [
    { area: 'Regulatory compliance', focus: 'Government requirements', risk: 'Legal penalties' },
    { area: 'Industry compliance', focus: 'Sector standards', risk: 'Market exclusion' },
    { area: 'Internal compliance', focus: 'Company policies', risk: 'Operational issues' },
    { area: 'Data compliance', focus: 'Information rules', risk: 'Privacy breaches' },
    { area: 'Financial compliance', focus: 'Reporting standards', risk: 'Audit failures' },
    { area: 'Environmental compliance', focus: 'Sustainability rules', risk: 'Environmental liability' },
  ];

  const process = [
    'Identify compliance requirements',
    'Assess compliance status',
    'Develop compliance policies',
    'Create compliance procedures',
    'Implement compliance controls',
    'Train staff on compliance',
    'Monitor compliance activities',
    'Audit compliance adherence',
    'Report compliance status',
    'Remediate compliance gaps',
  ];

  const frameworks = [
    { framework: 'ISO standards', scope: 'Quality management', benefit: 'Certification' },
    { framework: 'SOC 2', scope: 'Security controls', benefit: 'Trust' },
    { framework: 'GDPR', scope: 'Data protection', benefit: 'Privacy compliance' },
    { framework: 'HIPAA', scope: 'Health information', benefit: 'Patient protection' },
  ];

  const elements = [
    'Compliance policy',
    'Control procedures',
    'Training programs',
    'Monitoring systems',
    'Audit schedules',
    'Reporting mechanisms',
    'Remediation process',
    'Documentation standards',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Compliance Framework Guide</h1>
      <p className="text-zinc-600">Areas, process, frameworks, and elements.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Focus: {a.focus}</div>
              <div className="text-green-600 mt-1">Risk: {a.risk}</div>
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
        <h3 className="font-medium mb-2">Compliance Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Scope: {f.scope}</div>
              <div className="text-green-600 mt-1">Benefit: {f.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Framework Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {elements.map((e, idx) => (
            <div key={e} className="bg-white rounded p-2">{idx + 1}. {e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Framework Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify compliance requirements thoroughly. 2. Assess compliance status honestly. 3. Develop compliance policies clearly. 4. Create compliance procedures carefully. 5. Implement compliance controls effectively. 6. Train staff on compliance properly. 7. Monitor compliance activities continuously. 8. Audit compliance adherence regularly. 9. Report compliance status transparently. 10. Remediate compliance gaps promptly. Compliance framework = regulatory adherence. Requirements identified. Status assessed. Policies developed. Procedures created. Controls implemented. Staff trained. Activities monitored. Adherence audited. Status reported. Gaps remediated.
        </div>
      </div>
    </main>
  );
}