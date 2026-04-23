'use client'

export default function EstatePlanningGuide() {
  const components = [
    { component: 'Will', desc: 'Document for asset distribution', purpose: 'Direct inheritance' },
    { component: 'Trust', desc: 'Legal entity holding assets', purpose: 'Control, tax benefits, privacy' },
    { component: 'Power of Attorney', desc: 'Financial decision authority', purpose: 'Handle affairs if incapacitated' },
    { component: 'Healthcare Directive', desc: 'Medical decisions instructions', purpose: 'End-of-life wishes' },
    { component: 'Beneficiary Designations', desc: 'Account inheritance', purpose: 'Override will for accounts' },
  ];

  const documents = [
    'Last Will and Testament',
    'Revocable Living Trust',
    'Financial Power of Attorney',
    'Medical Power of Attorney',
    'Living Will/Healthcare Directive',
    'HIPAA Authorization',
    'Beneficiary Forms (retirement, insurance)',
  ];

  const considerations = [
    'Asset inventory',
    'Beneficiary choices',
    'Guardians for children',
    'Tax implications',
    'Business succession',
    'Family dynamics',
    'Update regularly',
    'Professional guidance',
  ];

  const tips = [
    'Start early (not just elderly)',
    'Update after major events',
    'Coordinate beneficiary designations',
    'Consider trust for control',
    'Name backup beneficiaries',
    'Store documents safely',
    'Tell family where documents are',
    'Review every 3-5 years',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Estate Planning Guide</h1>
      <p className="text-zinc-600">Estate components, documents, considerations, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Purpose: {c.purpose}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Essential Documents</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {documents.map((d) => (
            <div key={d} className="bg-white rounded p-2">{d}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Planning Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Estate Planning Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Inventory all assets and debts. 2. Identify beneficiaries. 3. Create/update will. 4. Consider trust needs. 5. Establish powers of attorney. 6. Create healthcare directives. 7. Update beneficiary designations. 8. Plan for minor children (guardians). 9. Consider tax implications. 10. Store documents safely. 11. Communicate with family. 12. Review every 3-5 years. Estate planning = not just for wealthy. Everyone needs basics. Start now, update regularly.
        </div>
      </div>
    </main>
  );
}