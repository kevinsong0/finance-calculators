'use client'

export default function ContractGuide() {
  const types = [
    { type: 'Sales Contracts', desc: 'Product/service agreements', key: 'Payment terms, delivery' },
    { type: 'Purchase Contracts', desc: 'Buying agreements', key: 'Quality, pricing, delivery' },
    { type: 'Employment Contracts', desc: 'Staff agreements', key: 'Role, compensation, terms' },
    { type: 'Service Contracts', desc: 'Professional services', key: 'Scope, deliverables, fees' },
    { type: 'Partnership Contracts', desc: 'Business partnerships', key: 'Roles, profit sharing' },
    { type: 'Lease Contracts', desc: 'Property/equipment rental', key: 'Duration, payments, use' },
  ];

  const elements = [
    'Parties identification',
    'Clear scope/terms',
    'Payment details',
    'Timeline/duration',
    'Performance standards',
    'Termination conditions',
    'Dispute resolution',
    'Signatures/dates',
  ];

  const management = [
    'Central repository',
    'Version tracking',
    'Amendment documentation',
    'Renewal monitoring',
    'Compliance checking',
    'Performance tracking',
    'Risk assessment',
    'Expiry alerts',
  ];

  const pitfalls = [
    { pitfall: 'Ambiguous terms', fix: 'Clear language, definitions' },
    { pitfall: 'Missing exit clauses', fix: 'Termination conditions' },
    { pitfall: 'Unrealistic deadlines', fix: 'Achievable commitments' },
    { pitfall: 'Weak enforcement', fix: 'Penalties, remedies' },
    { pitfall: 'No dispute clause', fix: 'Resolution mechanism' },
    { pitfall: 'Ignoring reviews', fix: 'Legal review mandatory' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Contract Management Guide</h1>
      <p className="text-zinc-600">Contract types, elements, management, and pitfalls.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Key: {t.key}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Essential Elements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {elements.map((e) => (
            <div key={e} className="bg-white rounded p-2">{e}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {management.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Pitfalls & Fixes</h3>
        <div className="space-y-1 text-xs">
          {pitfalls.map((p) => (
            <div key={p.pitfall} className="bg-white rounded p-2">
              <strong className="text-red-600">{p.pitfall}</strong>
              <div className="text-green-600 mt-1">→ {p.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify parties clearly. 2. Define scope and obligations. 3. Specify payment terms. 4. Set realistic timelines. 5. Include performance standards. 6. Add termination conditions. 7. Establish dispute resolution. 8. Document properly. 9. Legal review required. 10. Track all amendments. 11. Monitor performance. 12. Plan renewals early. Contract = enforceable agreement. Clear terms essential. Legal review mandatory. Manage actively, not passively. Document everything."
        </div>
      </div>
    </main>
  );
}