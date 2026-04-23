'use client'

export default function DataComplianceGuide() {
  const regulations = [
    { reg: 'GDPR', desc: 'EU data protection', applies: 'EU data subjects' },
    { reg: 'CCPA', desc: 'California consumer privacy', applies: 'CA consumers' },
    { reg: 'HIPAA', desc: 'US healthcare data', applies: 'Healthcare orgs' },
    { reg: 'SOX', desc: 'Financial reporting', applies: 'Public companies' },
    { reg: 'PCI-DSS', desc: 'Payment card security', applies: 'Card processing' },
  ];

  const requirements = [
    'Data inventory and mapping',
    'Privacy policies',
    'Consent mechanisms',
    'Data access requests',
    'Data deletion capabilities',
    'Security controls',
    'Audit logging',
    'Breach notification',
  ];

  const gdpr = [
    { req: 'Right to Access', desc: 'Users can request their data' },
    { req: 'Right to Delete', desc: 'Users can request deletion' },
    { req: 'Right to Portability', desc: 'Users can export data' },
    { req: 'Consent', desc: 'Explicit consent required' },
    { req: 'Data Minimization', desc: 'Collect only necessary' },
    { req: 'Breach Notification', desc: 'Notify within 72 hours' },
  ];

  const tips = [
    'Map all data flows',
    'Document compliance status',
    'Implement consent tracking',
    'Regular audits',
    'Train employees',
    'Privacy by design',
    'Update policies regularly',
    'Legal counsel review',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Data Compliance Guide</h1>
      <p className="text-zinc-600">Regulations, requirements, GDPR specifics, and compliance tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Regulations</h3>
        <div className="space-y-1 text-xs">
          {regulations.map((r) => (
            <div key={r.reg} className="bg-white rounded p-2">
              <strong>{r.reg}</strong>
              <div className="text-zinc-500 mt-1">{r.desc}</div>
              <div className="text-green-600 mt-1">Applies: {r.applies}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">GDPR Requirements</h3>
        <div className="space-y-1 text-xs">
          {gdpr.map((g) => (
            <div key={g.req} className="bg-white rounded p-2">
              <strong>{g.req}</strong>
              <div className="text-zinc-500 mt-1">{g.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {requirements.map((r) => (
            <div key={r} className="bg-white rounded p-2">{r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Compliance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify applicable regulations. 2. Map all data collected. 3. Document data flows. 4. Implement consent mechanisms. 5. Create privacy policy. 6. Set up access request process. 7. Enable data deletion. 8. Implement security controls. 9. Set up audit logging. 10. Create breach response plan. 11. Train employees. 12. Regular compliance review. Compliance = ongoing process. Regulations change. Stay informed. Legal advice recommended.
        </div>
      </div>
    </main>
  );
}