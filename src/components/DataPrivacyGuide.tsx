'use client'

export default function DataPrivacyGuide() {
  const regulations = [
    { regulation: 'GDPR', region: 'Europe', keyRequirements: 'Consent, data rights, breach notification' },
    { regulation: 'CCPA', region: 'California', keyRequirements: 'Disclosure, opt-out, deletion rights' },
    { regulation: 'HIPAA', region: 'US Healthcare', keyRequirements: 'PHI protection, access controls' },
    { regulation: 'SOX', region: 'US Finance', keyRequirements: 'Data integrity, audit trails' },
  ];

  const principles = [
    'Data minimization',
    'Purpose limitation',
    'Storage limitation',
    'Accuracy',
    'Integrity',
    'Confidentiality',
    'Transparency',
    'Accountability',
  ];

  const controls = [
    'Access management',
    'Encryption',
    'Anonymization',
    'Data masking',
    'Audit logging',
    'Retention policies',
    'Backup security',
    'Incident response',
  ];

  const processes = [
    'Privacy assessment',
    'Policy development',
    'Training program',
    'Consent management',
    'Data mapping',
    'Risk assessment',
    'Compliance audit',
    'Incident handling',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Data Privacy Guide</h1>
      <p className="text-zinc-600">Regulations, principles, controls, and processes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Privacy Regulations</h3>
        <div className="space-y-1 text-xs">
          {regulations.map((r) => (
            <div key={r.regulation} className="bg-white rounded p-2">
              <strong>{r.regulation}</strong>
              <div className="text-zinc-500 mt-1">Region: {r.region}</div>
              <div className="text-green-600 mt-1">Key requirements: {r.keyRequirements}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Privacy Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Privacy Controls</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {controls.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Privacy Processes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {processes.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Privacy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify applicable regulations. 2. Assess current practices. 3. Develop privacy policies. 4. Implement privacy controls. 5. Train employees. 6. Establish consent mechanisms. 7. Map data flows. 8. Conduct risk assessments. 9. Perform compliance audits. 10. Handle incidents properly. Data privacy = trust foundation. Regulations identified. Practices assessed. Policies developed. Controls implemented. Employees trained. Consent established. Data mapped. Risks assessed. Audits performed. Incidents handled.
        </div>
      </div>
    </main>
  );
}
