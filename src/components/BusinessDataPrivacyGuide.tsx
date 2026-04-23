'use client'

export default function BusinessDataPrivacyGuide() {
  const regulations = [
    { regulation: 'GDPR', scope: 'European data', requirement: 'Consent, rights' },
    { regulation: 'CCPA', scope: 'California consumers', requirement: 'Disclosure, opt-out' },
    { regulation: 'HIPAA', scope: 'Health information', requirement: 'Protection, access' },
    { regulation: 'SOX', scope: 'Financial data', requirement: 'Accuracy, controls' },
    { regulation: 'PCI DSS', scope: 'Payment cards', requirement: 'Security standards' },
    { regulation: 'FERPA', scope: 'Education records', requirement: 'Student privacy' },
  ];

  const principles = [
    'Data minimization',
    'Purpose limitation',
    'Storage limitation',
    'Accuracy maintenance',
    'Security measures',
    'Transparency requirement',
    'Consent basis',
    'Rights protection',
  ];

  const practices = [
    { practice: 'Privacy policies', benefit: 'Transparency', implementation: 'Clear disclosure' },
    { practice: 'Consent management', benefit: 'Legal basis', implementation: 'Opt-in systems' },
    { practice: 'Data mapping', benefit: 'Inventory control', implementation: 'Regular audit' },
    { practice: 'Access controls', benefit: 'Security', implementation: 'Role-based limits' },
  ];

  const risks = [
    { risk: 'Data breaches', consequence: 'Exposure, liability', prevention: 'Encryption, monitoring' },
    { risk: 'Non-compliance', consequence: 'Fines, sanctions', prevention: 'Regular audits' },
    { risk: 'Unauthorized access', consequence: 'Privacy violation', prevention: 'Access controls' },
    { risk: 'Poor documentation', consequence: 'Audit failures', prevention: 'Record keeping' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Data Privacy Guide</h1>
      <p className="text-zinc-600">Regulations, principles, practices, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Regulations</h3>
        <div className="space-y-1 text-xs">
          {regulations.map((r) => (
            <div key={r.regulation} className="bg-white rounded p-2">
              <strong>{r.regulation}</strong>
              <div className="text-zinc-500 mt-1">Scope: {r.scope}</div>
              <div className="text-green-600 mt-1">Requirement: {r.requirement}</div>
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
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {p.benefit}</div>
              <div className="text-green-600 mt-1">Implementation: {p.implementation}</div>
            </div>
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
              <div className="text-green-600 mt-1">Prevention: {r.prevention}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Data Privacy Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify applicable regulations. 2. Implement data minimization. 3. Establish purpose limitation. 4. Set storage limits. 5. Maintain data accuracy. 6. Apply security measures. 7. Ensure transparency. 8. Manage consent properly. 9. Protect individual rights. 10. Conduct regular audits. Data privacy = trust foundation. Regulations identified. Minimization applied. Purpose set. Storage limited. Accuracy maintained. Security implemented. Transparency ensured. Consent managed. Rights protected. Audits conducted.
        </div>
      </div>
    </main>
  );
}