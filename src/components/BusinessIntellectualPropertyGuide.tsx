'use client'

export default function BusinessIntellectualPropertyGuide() {
  const types = [
    { type: 'Patents', protection: 'Inventions', duration: '20 years', scope: 'Technical innovations' },
    { type: 'Trademarks', protection: 'Brand identity', duration: 'Renewable', scope: 'Names, logos, symbols' },
    { type: 'Copyrights', protection: 'Creative works', duration: 'Life + 70 years', scope: 'Art, writing, code' },
    { type: 'Trade secrets', protection: 'Confidential info', duration: 'Indefinite', scope: 'Processes, formulas' },
    { type: 'Design rights', protection: 'Visual design', duration: '15 years', scope: 'Product appearance' },
    { type: 'Domain names', protection: 'Web identity', duration: 'Registration', scope: 'Online presence' },
  ];

  const process = [
    'Identify IP assets',
    'Assess protection needs',
    'Choose protection type',
    'File applications',
    'Monitor for infringement',
    'Enforce rights',
    'Manage portfolio',
    'License strategically',
    'Update registrations',
    'Document ownership',
  ];

  const strategies = [
    { strategy: 'Registration', benefit: 'Legal protection', approach: 'File promptly' },
    { strategy: 'Documentation', benefit: 'Proof of ownership', approach: 'Record creation' },
    { strategy: 'Monitoring', benefit: 'Detect infringement', approach: 'Regular surveillance' },
    { strategy: 'Enforcement', benefit: 'Protect rights', approach: 'Legal action if needed' },
  ];

  const risks = [
    'Infringement by others',
    'Unauthorized use',
    'Expiration of protection',
    'Poor documentation',
    'Failure to register',
    'License disputes',
    'Trade secret leaks',
    'International complexity',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Intellectual Property Guide</h1>
      <p className="text-zinc-600">Types, process, strategies, and risks.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">IP Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Protection: {t.protection}</div>
              <div className="text-green-600 mt-1">Duration: {t.duration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Protection Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {s.benefit}</div>
              <div className="text-green-600 mt-1">Approach: {s.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Risks</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {risks.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">IP Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all IP assets. 2. Assess protection needs. 3. Choose appropriate protection type. 4. File registration applications. 5. Monitor for infringement. 6. Enforce IP rights. 7. Manage IP portfolio. 8. License strategically. 9. Update registrations timely. 10. Document ownership clearly. Intellectual property = competitive advantage. Assets identified. Needs assessed. Type chosen. Applications filed. Infringement monitored. Rights enforced. Portfolio managed. Licensing strategic. Registrations updated. Ownership documented.
        </div>
      </div>
    </main>
  );
}