'use client'

export default function BusinessContractManagementGuide() {
  const types = [
    { type: 'Sales contracts', scope: 'Customer agreements', management: 'Revenue terms' },
    { type: 'Vendor contracts', scope: 'Supplier agreements', management: 'Procurement terms' },
    { type: 'Employment contracts', scope: 'Staff agreements', management: 'HR terms' },
    { type: 'Service contracts', scope: 'Provider agreements', management: 'Service levels' },
    { type: 'Lease contracts', scope: 'Property agreements', management: 'Facility terms' },
    { type: 'Partnership contracts', scope: 'Joint agreements', management: 'Collaboration terms' },
  ];

  const process = [
    'Draft contract terms',
    'Review for compliance',
    'Negotiate provisions',
    'Finalize language',
    'Obtain signatures',
    'Store documents',
    'Track obligations',
    'Monitor performance',
    'Manage amendments',
    'Archive completed',
  ];

  const compliance = [
    'Legal requirements',
    'Regulatory standards',
    'Industry regulations',
    'Company policies',
    'Risk management',
    'Disclosure obligations',
    'Liability limitations',
    'Termination provisions',
  ];

  const bestPractices = [
    { practice: 'Standard templates', benefit: 'Consistency, speed', implementation: 'Template library' },
    { practice: 'Legal review', benefit: 'Risk mitigation', implementation: 'Mandatory process' },
    { practice: 'Version control', benefit: 'Audit trail', implementation: 'Document system' },
    { practice: 'Renewal tracking', benefit: 'No missed deadlines', implementation: 'Calendar alerts' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Contract Management Guide</h1>
      <p className="text-zinc-600">Types, process, compliance, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Scope: {t.scope}</div>
              <div className="text-green-600 mt-1">Management: {t.management}</div>
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
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {compliance.map((c, idx) => (
            <div key={c} className="bg-white rounded p-2">{idx + 1}. {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-white rounded p-2">
              <strong>{b.practice}</strong>
              <div className="text-zinc-500 mt-1">Benefit: {b.benefit}</div>
              <div className="text-green-600 mt-1">Implementation: {b.implementation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Contract Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Use standard contract templates. 2. Review for legal compliance. 3. Negotiate key provisions. 4. Finalize clear language. 5. Obtain all required signatures. 6. Store documents securely. 7. Track obligations actively. 8. Monitor performance regularly. 9. Manage amendments properly. 10. Archive completed contracts. Contract management = legal protection. Templates used. Compliance reviewed. Provisions negotiated. Language finalized. Signatures obtained. Documents stored. Obligations tracked. Performance monitored. Amendments managed. Contracts archived.
        </div>
      </div>
    </main>
  );
}